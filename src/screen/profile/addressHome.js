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
@setMutation
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
    this.props.updateUser('addressHome', { ...user.addressHome, ...mapData })
  }

  onNext = async () => {
    const { navigateAction, user } = this.props
    const {
      countryCode,
  	  addressNoTH,
  	  moo,
      addressVillageTH,
      floorNo,
  	  trokSoiYaek,
  	  thanon,
  	  district,
  	  districtCode,
  	  subDistrict,
  	  subDistrictCode,
  	  province,
  	  provinceCode,
  	  zipCode
    } = user.addressHome
    

    const data = {
      countryCode: "TH",
  	  addressNoTH: "31/54",
  	  moo: "2",
      addressVillageTH: "ลัดลาแลน",
      floorNo: "5",
  	  trokSoiYaek: "22",
  	  thanon: "รัชดา",
  	  district: "2345",
  	  districtCode: "1234",
  	  subDistrict: "1234",
  	  subDistrictCode: "1234",
  	  province: "1234",
  	  provinceCode: "1234",
  	  zipCode: "84000"
    }

    const res = await this.props.savePermanentAddress({ variables: { input: data } })
    if (res.data.savePermanentAddress.success) {
      console.log('OK')
      navigateAction({ ...this.props, page: 'passcode' })
    }
  }

  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ตามทะเบียนบ้าน"
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
              value: this.props.user.addressHome[d.field],
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={this.onNext}/>
      </Screen>
    )
  }
}