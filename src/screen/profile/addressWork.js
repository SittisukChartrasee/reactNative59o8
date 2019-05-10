import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'
import { updateUser } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'

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
    label: 'หมู่ที่',
    type: 'textInput',
    field: 'moo',
    required: false,
  }, {
    label: 'ตรอก/ซอย/แยก',
    type: 'textInput',
    field: 'trokSoiYaek',
    required: false,
  }, {
    label: 'ถนน',
    type: 'textInput',
    field: 'thanon',
    required: false,
  }, {
    label: 'แขวง/ตำบล',
    type: 'search',
    field: 'subDistrict', // subDistrictCode
    required: false,
  }, {
    label: 'เขต/อำเภอ',
    field: 'districtNameTH', // districtCode
    required: true,
  }, {
    label: 'จังหวัด',
    field: 'provinceNameTH', // provinceCode
    required: true,
  }, {
    label: 'รหัสไปรษณีย์',
    field: 'zipCode',
    required: false,
  }
]

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {
  state = {
    modal: false,
    PreconditionRequired: [],
    InvalidArgument: [],
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    if (props.field === 'country') {
      updateUser('addressWork', { ...user.addressWork, [props.field]: props.value, countryCode: props.code, countryRisk: props.risk })
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

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'countryCode' && field === 'country') {
        return o
      }
      if (o.field === 'districtCode' && field === 'subDistrict') {
        return o
      }
      if (o.field === 'provinceCode' && field === 'provinceNameTH') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'countryCode' && field === 'country') {
        return o
      }
      if (o.field === 'districtCode' && field === 'districtNameTH') {
        return o
      }
      if (o.field === 'provinceCode' && field === 'provinceNameTH') {
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
    const { navigateAction, user } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
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

    this.props.saveWorkplaceAddress({ variables: { input: data } })
      .then(res => {
        console.log(res)
        if (user.addressWork.countryRisk) {
          return this.setState({ modal: true })
        } else if (res.data.saveWorkplaceAddress.success) {
          navigateAction({ ...this.props, page: 'chooseCurr' })
        } else if (!res.data.saveWorkplaceAddress.success) {
          switch (res.data.saveWorkplaceAddress.message) {
            case 'PreconditionRequired':
              this.setState({ PreconditionRequired: res.data.saveWorkplaceAddress.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.data.saveWorkplaceAddress.details })
            default: return null
          }
        }
      })
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ที่ทำงาน"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView
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
              value: this.props.user.addressWork[d.field],
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field)
            }, key))
          }
        </ScrollView>

        {
          modal({
            visible: this.state.modal,
            dis: `ประเทศของท่าน\nมีความเสี่ยงไม่สามารถสมัครต่อได้`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}