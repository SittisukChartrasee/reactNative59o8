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

const fields = [
  {
    label: 'ประเทศ',
    type: 'search',
    field: 'idcard',
  }, {
    label: 'ชื่อสถานที่ทำงาน',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'เลขที่',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'อาคาร/หมู่บ้าน',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'ชั้น',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'ห้อง',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'หมู่ที่',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'ตรอก/ซอย/แยก',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'ถนน',
    type: 'textInput',
    field: 'idcard',
  }, {
    label: 'แขวง/ตำบล',
    type: 'search',
    field: 'idcard',
  }, {
    label: 'เขต/อำเภอ',
    field: 'idcard',
  }, {
    label: 'จังหวัด',
    field: 'idcard',
  }, {
    label: 'รหัสไปรษณีย์',
    field: 'idcard',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ที่ทำงาน"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
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
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}