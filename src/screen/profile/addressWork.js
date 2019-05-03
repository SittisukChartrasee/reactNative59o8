import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'
import { updateUser } from '../../redux/actions/commonAction'

const fields = [
  {
    label: 'ประเทศ',
    type: 'search',
    field: 'country', // countryCode
  }, {
    label: 'ชื่อสถานที่ทำงาน',
    type: 'textInput',
    field: 'companyName',
  }, {
    label: 'เลขที่',
    type: 'textInput',
    field: 'addressNoTH',
  }, {
    label: 'อาคาร/หมู่บ้าน',
    type: 'textInput',
    field: 'addressVillageTH',
  }, {
    label: 'ชั้น',
    type: 'textInput',
    field: 'floorNo',
  }, {
    label: 'หมู่ที่',
    type: 'textInput',
    field: 'moo',
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
    field: 'subDistrict', // subDistrictCode
  }, {
    label: 'เขต/อำเภอ',
    field: 'districtNameTH', // districtCode
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
export default class extends React.Component {
  handleInput = (props) => {
    console.log(props)
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

  render() {
    const { navigateAction } = this.props
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
              init: d.init,
              onHandleDistrict: this.onHandleDistrict,
              value: this.props.user.addressWork[d.field],
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}