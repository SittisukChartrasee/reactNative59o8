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
    label: 'เลขบัตรประชาชน',
    field: 'idcard',
  }, {
    label: 'หมายเลขบัตรประชาชน ( ดย. JT9-9999999-99 )',
    type: 'Icustom',
    field: 'jcnumber',
  }, {
    label: 'วันบัตรหมดอายุ',
    type: 'radio',
    init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
    field: 'expiredate',
  }, {
    label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
    type: 'dateExpire',
    field: 'expireDate',
  }, {
    label: 'เพศ',
    type: 'dropdown',
    init: [{ value: 'ชาย' }, { value: 'หญิง' }],
    field: 'sex',
  }, {
    label: 'คำนำหน้า (ตัวย่อ)',
    type: 'search',
    field: 'title',
  }, {
    label: 'ชื่อ (ภาษาไทย)',
    type: 'textInput',
    field: 'nameTh',
  }, {
    label: 'นามสกุล (ภาษาไทย)',
    type: 'textInput',
    field: 'lastTh'
  }, {
    label: 'ชื่อ (ภาษาอังกฤษ)',
    type: 'textInput',
    field: 'nameEn',
  }, {
    label: 'นามสกุล (ภาษาอังกฤษ)',
    type: 'textInput',
    field: 'lastEn',
  }, {
    label: 'ปีเกิด,เดือนเกิด,วันเกิด',
    type: 'ymd',
    field: 'birthDay',
  }, {
    label: 'สถานภาพสมรส',
    type: 'dropdown',
    init: [{ value: 'โสด' }, { value: 'สมรส' }, { value: 'หย่าร้าง' }],
    field: 'maritalstatus',
  }, {
    label: 'สัญชาติ',
    type: 'search',
    field: 'nationality',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    modal: false,
  }

  handleInput = (props) => {
    console.log(props)
    if (props.type === 'modal') this.setState({ modal: true })
  }

  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลส่วนตัว"
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
          style={{ paddingHorizontal: 24 }}
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

        {
          modal({
            visible: this.state.modal,
            image: images.iconBackIdcard,
            dis: `ด้านหลังบัตรประชาชน ประกอบด้วยอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 ตัว \nตัวอย่างการกรอก : JC1234567890`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}