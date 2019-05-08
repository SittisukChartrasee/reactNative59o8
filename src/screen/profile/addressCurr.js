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
import { navigateAction, } from '../../redux/actions'
import { updateUser } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'

const fields = [
  {
    label: 'ประเทศ',
    type: 'search',
    field: 'country', // countryCode
  }, {
    label: 'เลขที่',
    type: 'textInput',
    field: 'addressNoTH',
  }, {
    label: 'หมู่ที่',
    type: 'textInput',
    field: 'moo',
  }, {
    label: 'อาคาร/หมู่บ้าน',
    type: 'textInput',
    field: 'addressVillageTH',
  }, {
    label: 'ชั้น',
    type: 'textInput',
    field: 'floorNo',
  }, {
    label: 'ตรอก/ซอย/แยก',
    type: 'textInput',
    field: 'trokSoiYaek',
  }, {
    label: 'ถนน',
    type: 'textInput',
    field: 'thanon',
  }, {
    label: 'แขวง/ตำบล',
    type: 'search',
    field: 'districtNameTH', // districtCode
  }, {
    label: 'เขต/อำเภอ',
    field: 'subDistrict', //subDistrictCode
  }, {
    label: 'จังหวัด',
    field: 'provinceNameTH', // provinceCode
  }, {
    label: 'รหัสไปรษณีย์',
    field: 'zipCode',
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
    ReconditionRequired: [],
    InvalidArgument: [
      { field: 'floorNo', description: 'รูปแบบไม่ถูกต้อง' },
      { field: 'thanon', description: 'รูปแบบไม่ถูกต้อง' }
    ],
  }
  handleInput = (props) => {
    const { updateUser, user } = this.props
    if (props.field === 'country') {
      updateUser('addressCurr', { ...user.addressCurr, [props.field]: props.value, countryCode: props.code, countryRisk: props.risk })
    } else {
      updateUser('addressCurr', { ...user.addressCurr, [props.field]: props.value })
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
    this.props.updateUser('addressCurr', { ...user.addressCurr, ...mapData })
  }

  onValidation = (field) => {
    const { ReconditionRequired, InvalidArgument } = this.state
    const Required = find(ReconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
  }

  onNext = async () => {
    const { navigateAction, user } = this.props
    const {
      countryCode,
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
    } = user.addressDoc


    const data = {
      countryCode,
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
      zipCode,
    }

    this.props.saveCurrentAddress({ variables: { input: data } })
      .then(res => {
        if (user.addressCurr.countryRisk) {
          return this.setState({ modal: true })
        } else if (res.data.saveCurrentAddress.success) {
          navigateAction({ ...this.props, page: 'chooseDoc' })
        } else if (!res.data.saveCurrentAddress.success) {
          switch (res.data.saveCurrentAddress.message) {
            case 'ReconditionRequired':
              this.setState({ ReconditionRequired: res.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.details })
            default: return null
          }
        }
      })
  }

  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ปัจจุบัน"
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
              init: d.init,
              onHandleDistrict: this.onHandleDistrict,
              value: this.props.user.addressCurr[d.field],
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