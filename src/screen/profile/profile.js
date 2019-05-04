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
import { convertDate, getOfBirth } from '../../utility/helper'

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
    fields: [
      {
        label: 'เลขบัตรประชาชน',
        field: 'idCard',
      }, {
        label: 'หมายเลขบัตรประชาชน ( ดย. JT9-9999999-99 )',
        type: 'Icustom',
        field: 'jcNumber',
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'expireDateFlag', // isNoDocExpDate
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'docExpDate',
      }, {
        label: 'เพศ',
        type: 'dropdown',
        init: [{ value: 'ชาย' }, { value: 'หญิง' }],
        field: 'gender', //genderCode
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',
        type: 'search',
        field: 'titleTH',
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'firstNameTH',
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'lastNameTH'
      }, {
        label: 'ชื่อ (ภาษาอังกฤษ)',
        type: 'textInput',
        field: 'firstNameEN',
      }, {
        label: 'นามสกุล (ภาษาอังกฤษ)',
        type: 'textInput',
        field: 'lastNameEN',
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'birthDay', //yearOfBirth, monthOfBirth, dayOfBirth
      }, {
        label: 'สถานภาพสมรส',
        type: 'dropdown',
        init: [{ value: 'โสด' }, { value: 'สมรส' }, { value: 'หย่าร้าง' }],
        field: 'martialStatus', // martialStatusCode
      }, {
        label: 'สัญชาติ',
        field: 'nationality', // nationalityCode
        value: 'ไทย'
      }
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props

    updateUser('profile', { ...user.profile, [props.field]: props.value })

    if (props.type === 'modal') this.setState({ modal: true })
    else if (props.field === 'gender') { }
    else if (props.field === 'expireDateFlag') {
      this.setState({
        fields: this.state.fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            if (d.field === 'docExpDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            if (d.field === 'docExpDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    }
  }

  onNext = async () => {
    const { navigateAction, user } = this.props
    const {
      idCard,
      jcNumber,
      isNoDocExpDate,
      docExpDate,
      genderCode,
      titleTH,
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      birthDay,
      nationalityCode,
      martialStatusCode,
    } = user.profile

    const data = {
      docNo: idCard,
      jcNumber,
      isNoDocExpDate,
      docExpDate: convertDate(docExpDate),
      genderCode,
      titleTH,
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      dayOfBirth: getOfBirth(birthDay, 'day'),
      monthOfBirth: `${getOfBirth(birthDay, 'month')}`,
      yearOfBirth: getOfBirth(birthDay, 'year'),
      nationalityCode,
      martialStatusCode,
    }

    const res = await this.props.saveIdentity({ variables: { input: data } })
    if (res.data.saveIdentity.success) {
      console.log('OK')
      switch (martialStatusCode) {
        case 'U':
          navigateAction({ ...this.props, page: 'career' })
          break;
        case 'M':
          navigateAction({ ...this.props, page: 'marry' })
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลส่วนตัว"
          navLeft={
            <TouchableOpacity onPress={() => { }}>
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
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              init: d.init,
              value: user.profile[d.field],
              inVisible: d.inVisible,
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

        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}