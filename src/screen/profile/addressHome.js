import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import { checkWorkplaceAddress } from '../../containers/query'
import lockout from '../../containers/hoc/lockout'
import { RequiredFields } from '../../utility/validation'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@withApollo
@lockout
export default class extends React.Component {
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
    layout: [],
    doneFlat: 'thanon',
    fields: [
      // {
      //   label: 'ประเทศ',
      //   type: 'search',
      //   field: 'country', // countryCode
      //   required: true,
      // },
      {
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
        type: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode ? 'textInput' : 'search',
        field: 'subDistrict', // subDistrictCode
        required: true,
      }, {
        label: 'เขต/อำเภอ',
        type: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode ? 'textInput' : null,
        field: 'districtNameTH', // districtCode
        required: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode,
      }, {
        label: 'จังหวัด',
        type: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode ? 'textInput' : null,
        field: 'provinceNameTH', // provinceCode
        required: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode,
      }, {
        label: 'รหัสไปรษณีย์',
        type: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode ? 'textInput' : null,
        field: 'zipCode',
        required: this.props.user.addressHome.countryCode !== 'TH' && this.props.user.addressHome.countryCode,
      }
    ]
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.user.addressHome) {
      if (nextProps.user.addressHome.countryCode !== 'TH' && nextProps.user.addressHome.countryCode) {
        const result = this.state.fields.map(d => {
          if (d.field === 'subDistrict') return { ...d, type: 'textInput' }
          else if (d.field === 'districtNameTH') return { ...d, type: 'textInput', required: true }
          else if (d.field === 'provinceNameTH') return { ...d, type: 'textInput', required: true }
          else if (d.field === 'zipCode') return { ...d, type: 'textInput', required: true }
          else return d
        })
        this.setState({ fields: result, doneFlat: 'zipCode' })
      } else {
        const result = this.state.fields.map(d => {
          if (d.field === 'subDistrict') return { ...d, type: 'search' }
          else if (d.field === 'districtNameTH') return { ...d, type: '', required: false }
          else if (d.field === 'provinceNameTH') return { ...d, type: '', required: false }
          else if (d.field === 'zipCode') return { ...d, type: '', required: false }
          else return d
        })
        this.setState({ fields: result, doneFlat: 'thanon' })
      }
    }
  }

  handleInput = (props) => {
    const { user } = this.props
    if (props.field === 'country') {
      if ((props.code !== 'TH' && user.addressHome.countryCode === 'TH') ||
        (user.addressHome.countryCode !== 'TH' && user.addressHome.countryCode))
        this.props.updateUser('addressHome', {
          ...user.addressHome,
          [props.field]: props.value,
          countryCode: props.code,
          subDistrictCode: '',
          subDistrict: '',
          zipCode: '',
          districtNameTH: '',
          districtCode: '',
          provinceCode: '',
          provinceNameTH: '',
        })
      else
        this.props.updateUser('addressHome', {
          ...user.addressHome,
          [props.field]: props.value,
          countryCode: props.code,
        })
    } else {
      this.props.updateUser('addressHome', {
        ...user.addressHome,
        [props.field]: props.value
      })
    }
    this.handleValidation({ field: props.field, value: props.value })
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
    this.handleValidation({ field: data.__typename, value: data.code })
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'countryCode' && field === 'country') return o
      if (o.field === 'subDistrictCode' && field === 'subDistrict') return o
      if (o.field === 'districtCode' && field === 'districtNameTH') return o
      if (o.field === 'provinceCode' && field === 'provinceNameTH') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'countryCode' && field === 'country') return o
      if (o.field === 'subDistrictCode' && field === 'subDistrict') return o
      if (o.field === 'districtCode' && field === 'districtNameTH') return o
      if (o.field === 'provinceCode' && field === 'provinceNameTH') return o
      return o.field === field
    })
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'addressVillageTH' && this.props.user.addressHome.addressVillageTH.length > 50) {
      return 'กรุณาระบุไม่เกิน 50 ตัวอักษร'
    }

    if (Required && RequiredFields(value)) {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => {
          if (this.props.user.addressHome.countryCode === 'TH') {
            if (!(o.field === 'countryCode' && field === 'country') &&
              !((o.field === 'subDistrictCode' || o.field === 'districtCode' || o.field === 'provinceCode') && field === 'subDistrict') &&
              o.field !== field)
              return o
          } else {
            if (!(o.field === 'countryCode' && field === 'country') &&
              !(o.field === 'subDistrictCode' && field === 'subDistrict') &&
              !(o.field === 'districtCode' && field === 'districtNameTH') &&
              !(o.field === 'provinceCode' && field === 'provinceNameTH') &&
              o.field !== field)
              return o
          }
        })
      })
    }
  }

  onValidation = (field) => {
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'addressVillageTH' && this.props.user.addressHome.addressVillageTH.length > 50) {
      return 'กรุณาระบุไม่เกิน 50 ตัวอักษร'
    }

    if (Required)
      return Required.description
    else if (Invalid)
      return Invalid.description
    return null
  }

  onNext = async () => {
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [] })
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
      addressNoTH,
      moo,
      addressVillageTH,
      floorNo,
      trokSoiYaek,
      thanon,
      district: districtNameTH,
      districtCode: (!countryCode || countryCode === 'TH') || !districtNameTH ? districtCode : '-',
      subDistrict,
      subDistrictCode: (!countryCode || countryCode === 'TH') || !subDistrict ? subDistrictCode : '-',
      province: provinceNameTH,
      provinceCode: (!countryCode || countryCode === 'TH') || !provinceNameTH ? provinceCode : '-',
      zipCode
    }

    try {
      const res = await this.props.savePermanentAddress({ variables: { input: data } })
      const success = get(res, 'data.savePermanentAddress.success', false)
      const details = get(res, 'data.savePermanentAddress.details', [])
      const code = get(res, 'data.savePermanentAddress.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.savePermanentAddress.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        this.handleCheckOcupation()
      } else {
        switch (code) {
          case '2101':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ PreconditionRequired: details || [] })
          case '2201':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ InvalidArgument: details || [] })
          default:
            return this.props.toggleModal({
              ...typeModal[code],
              dis: message
            })
        }
      }

    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  handleCheckOcupation = async () => {
    try {
      const res = await this.props.client.query({ query: checkWorkplaceAddress, fetchPolicy: "no-cache" })
      const checkWorkplace = get(res, 'data.checkWorkplaceAddress', false)
      if (checkWorkplace) {
        return this.props.navigateAction({ ...this.props, page: 'addressWork' })
      } else {
        return this.props.navigateAction({ ...this.props, page: 'chooseWork' })
      }
    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  onHandleScrollToErrorField = (field) => {
    const errField = field.map(d => d.field)
    const layoutY = this.state.fields
      .map((d, index) => (errField.indexOf(d.field) > -1 ||
        (d.field === 'country' && errField.indexOf('countryCode') > -1) ||
        (d.field === 'subDistrict' && errField.indexOf('subDistrictCode') > -1) ||
        (d.field === 'districtNameTH' && errField.indexOf('districtCode') > -1) ||
        (d.field === 'provinceNameTH' && errField.indexOf('provinceCode') > -1)) && index)
      .filter(d => d !== false)
    this.refScrollView.scrollToPosition(0, this.state.layout[layoutY[0]], true)
  }

  onSetLayout = (layoutY, index) => {
    const { layout } = this.state
    const newArray = layout
    newArray[index] = layoutY
    this.setState({ layout: [...newArray] })
  }

  onSubmitFirstName = (field) => {
    const arr = [
      'addressNoTH',
      'moo',
      'addressVillageTH',
      'floorNo',
      'trokSoiYaek',
      'thanon',
      'subDistrict',
      'districtNameTH',
      'provinceNameTH',
      'zipCode',
    ]
    if (this[arr[arr.indexOf(field) + 1]]) this[arr[arr.indexOf(field) + 1]].focus()
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
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ref={ref => { this.refScrollView = ref }}
        >
          {
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              onHandleDistrict: this.onHandleDistrict,
              value: user.addressHome[d.field],
              onSetLayout: val => this.onSetLayout(val.layout.y, key),
              handleInput: (props) => this.handleInput(props),
              onSubmitEditing: () => this.onSubmitFirstName(d.field),
              refFunc: ref => { this[d.field] = ref },
              returnKeyType: d.field === this.state.doneFlat ? 'done' : 'next',
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}