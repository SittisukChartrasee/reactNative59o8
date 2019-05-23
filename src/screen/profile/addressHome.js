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
  }


  handleInput = (props) => {
    const { updateUser, user } = this.props

    // ตรวจสอบความเสี่ยงของประเทศ

    // if (props.field === 'country') {
    //   updateUser('addressHome', { ...user.addressHome, [props.field]: props.value, countryCode: props.code, countryRisk: props.risk })
    // } else {
    //   updateUser('addressHome', { ...user.addressHome, [props.field]: props.value })
    // }

    if (props.field === 'country') {
      updateUser('addressHome', { ...user.addressHome, [props.field]: props.value, countryCode: props.code })
    } else {
      updateUser('addressHome', { ...user.addressHome, [props.field]: props.value })
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
    this.props.updateUser('addressHome', { ...user.addressHome, ...mapData })
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

  onNext = async () => {
    const { navigateAction, user, updateRoot } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      countryCode,
      addressNoTH,
      moo,
      addressVillageTH,
      floorNo,
      trokSoiYaek,
      thanon,
      districtNameTH,
      districtCode,
      subDistrict,
      subDistrictCode,
      provinceNameTH,
      provinceCode,
      zipCode
    } = user.addressHome


    const data = {
      countryCode,
      addressNoTH,
      moo,
      addressVillageTH,
      floorNo,
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

    this.props.savePermanentAddress({ variables: { input: data } })
      .then(res => {
        console.log(res)

        // ตรวจสอบความเสี่ยงของประเทศ

        // if (user.addressHome.countryRisk) {

        // } else if (res.data.savePermanentAddress.success) {

        if (res.data.savePermanentAddress.success) {
          navigateAction({ ...this.props, page: 'chooseWork' })
        } else if (!res.data.savePermanentAddress.success) {
          switch (res.data.savePermanentAddress.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.data.savePermanentAddress.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.data.savePermanentAddress.details })
            default:
              const modal = {
                dis: res.data.savePermanentAddress.message,
                visible: true,
                onPress: () => updateRoot('modal', { visible: false })
              }
              return updateRoot('modal', modal)
          }
        }
      })
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ตามทะเบียนบ้าน"
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
        >
          {
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              onHandleDistrict: this.onHandleDistrict,
              value: user.addressHome[d.field],
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}