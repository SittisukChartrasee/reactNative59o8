import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'

const fields = [
  {
    label: 'ประเทศ',
    type: 'search',
    field: 'country', // countryCode
    required: true,
  }, {
    label: 'ชื่อสถานที่ทำงาน',
    type: 'textInput',
    field: 'companyName',
    required: true,
  }, {
    label: 'เลขที่',
    type: 'textInput',
    field: 'addressNoTH',
    required: true,
  }, {
    label: 'หมู่ที่',
    type: 'textInput',
    field: 'moo',
    required: false,
  }, {
    label: 'อาคาร/หมู่บ้าน',
    type: 'textInput',
    field: 'addressVillageTH',
    required: false,
  }, {
    label: 'ชั้น',
    type: 'textInput',
    field: 'floorNo',
    required: false,
  }, {
    label: 'ตรอก/ซอย/แยก',
    type: 'textInput',
    field: 'trokSoiYaek',
    required: true,
  }, {
    label: 'ถนน',
    type: 'textInput',
    field: 'thanon',
    required: true,
  }, {
    label: 'แขวง/ตำบล',
    type: 'search',
    field: 'subDistrict', // subDistrictCode
    required: true,
  }, {
    label: 'เขต/อำเภอ',
    field: 'districtNameTH', // districtCode
    required: false,
  }, {
    label: 'จังหวัด',
    field: 'provinceNameTH', // provinceCode
    required: false,
  }, {
    label: 'รหัสไปรษณีย์',
    field: 'zipCode',
    required: false,
  }
]

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
    layout: [],
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props

    // ตรวจสอบความเสี่ยงของประเทศ

    // if (props.field === 'country') {
    //   updateUser('addressWork', { ...user.addressWork, [props.field]: props.value, countryCode: props.code, countryRisk: props.risk })
    // } else {
    //   updateUser('addressWork', { ...user.addressWork, [props.field]: props.value })
    // }

    if (props.field === 'country') {
      updateUser('addressWork', { ...user.addressWork, [props.field]: props.value, countryCode: props.code })
    } else {
      updateUser('addressWork', { ...user.addressWork, [props.field]: props.value })
    }
  }

  onHandleDistrict = ({ data, val }) => {
    const { user } = this.props
    const mapData = {
      subDistrictCode: data.code,
      subDistrict: data.nameTH,
      zipCode: data.postcode,
      districtNameTH: val.data.getAddressCode.districtNameTH,
      districtCode: val.data.getAddressCode.districtCode,
      provinceCode: val.data.getAddressCode.provinceCode,
      provinceNameTH: val.data.getAddressCode.provinceNameTH
    }
    this.props.updateUser('addressWork', { ...user.addressWork, ...mapData })
  }

  handleValidation = data => {
    if (data.addressVillageTH.length > 50) {
      const Required = find(this.state.PreconditionRequired, (o) => o.field === 'addressVillageTH')
      if (Required) {
        this.setState({
          InvalidArgument: this.state.InvalidArgument.map(d => {
            if (d.field === 'addressVillageTH') return { ...d, description: 'ท่านสามารถระบุได้ไม่เกิน 50 ตัวอักษร' }
            else return { ...d }
          })
        })
      } else {
        this.setState({
          InvalidArgument: [...this.state.InvalidArgument, { description: 'ท่านสามารถระบุได้ไม่เกิน 50 ตัวอักษร', field: 'addressVillageTH' }]
        })
      }
      return false
    }
    return true
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'countryCode' && field === 'country') {
        return o
      }
      if ((o.field === 'subDistrictCode' ||
        o.field === 'districtCode' ||
        o.field === 'provinceCode' ||
        o.field === 'zipCode') && field === 'subDistrict') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'countryCode' && field === 'country') {
        return o
      }
      if ((o.field === 'subDistrictCode' ||
        o.field === 'districtCode' ||
        o.field === 'provinceCode' ||
        o.field === 'zipCode') && field === 'subDistrict') {
        return o
      }
      return o.field === field
    })
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
  }

  onNext = () => {
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      countryCode,
      companyName,
      addressNoTH,
      addressVillageTH,
      floorNo,
      moo,
      trokSoiYaek,
      thanon,
      districtNameTH,
      districtCode,
      subDistrict,
      subDistrictCode,
      provinceNameTH,
      provinceCode,
      zipCode
    } = user.addressWork


    const data = {
      countryCode,
      companyName,
      addressNoTH,
      addressVillageTH,
      floorNo,
      moo,
      trokSoiYaek,
      thanon,
      district: districtNameTH,
      districtCode,
      subDistrict,
      subDistrictCode,
      province: provinceNameTH,
      provinceCode,
      zipCode
    }

    const checkValadation = this.handleValidation(data)

    this.props.saveWorkplaceAddress({ variables: { input: data } })
      .then(res => {
        console.log(res)

        // ตรวจสอบความเสี่ยงของประเทศ

        // if (user.addressWork.countryRisk) {

        // } else if (res.data.saveWorkplaceAddress.success) {

        if (res.data.saveWorkplaceAddress.success && checkValadation) {
          this.props.navigateAction({ ...this.props, page: 'chooseCurr' })
        } else if (!res.data.saveWorkplaceAddress.success) {
          this.onHandleScrollToErrorField(res.data.saveWorkplaceAddress.details)
          switch (res.data.saveWorkplaceAddress.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.data.saveWorkplaceAddress.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.data.saveWorkplaceAddress.details })
            default:
              const modal = {
                dis: res.data.saveWorkplaceAddress.message,
                visible: true,
                onPress: () => this.props.updateRoot('modal', { visible: false }),
                onPressClose: () => this.props.updateRoot('modal', { visible: false })
              }
              return this.props.updateRoot('modal', modal)
          }
        }
      })
  }

  onHandleScrollToErrorField = (field) => {
    const errField = field.map(d => d.field)
    fields.map((d, index) => {
      if (errField.indexOf(d.field) > -1) {
        this.refScrollView.scrollToPosition(0, this.state.layout[index], true)
      } else if (errField.indexOf('countryCode') > -1) {
        this.refScrollView.scrollToPosition(0, this.state.layout[0], true)
      }
    })
  }

  onSetLayout = (layoutY, index) => {
    const { layout } = this.state
    const newArray = layout
    newArray[index] = layoutY
    this.setState({ layout: [...newArray] })
  }

  onSubmitFirstName = (field) => {
    const arr = [
      'companyName',
      'addressNoTH',
      'moo',
      'addressVillageTH',
      'floorNo',
      'trokSoiYaek',
      'thanon',
    ]
    if (this[arr[arr.indexOf(field) + 1]]) this[arr[arr.indexOf(field) + 1]].focus()
  }


  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ที่ทำงาน"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <KeyboardAwareScrollView
          extraScrollHeight={50}
          enableOnAndroid
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ref={ref => { this.refScrollView = ref }}
        >
          {
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              onHandleDistrict: this.onHandleDistrict,
              value: user.addressWork[d.field],
              onSetLayout: val => this.onSetLayout(val.layout.y, key),
              handleInput: (props) => this.handleInput(props),
              onSubmitEditing: () => this.onSubmitFirstName(d.field),
              refFunc: ref => { this[d.field] = ref }, 
              returnKeyType: d.field === 'thanon' ? 'done' : 'next',
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}