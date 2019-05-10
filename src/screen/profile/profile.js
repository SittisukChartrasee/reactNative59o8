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
import { convertDate, getOfBirth, getStatusGender, getStatusMartial, getStatusChild } from '../../utility/helper'

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
    expireSatus: 'มีวันหมดอายุ',
    PreconditionRequired: [],
    InvalidArgument: [],
    fields: [
      {
        label: 'เลขบัตรประชาชน',
        field: 'idCard',
        required: false,
      }, {
        label: 'หมายเลขบัตรประชาชน ( ดย. JT9-9999999-99 )',
        type: 'Icustom',
        field: 'jcNumber',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'expireDateFlag', // isNoDocExpDate
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'docExpDate',
        required: true,
      }, {
        label: 'เพศ',
        type: 'dropdown',
        init: [{ value: 'ชาย' }, { value: 'หญิง' }],
        field: 'gender', //genderCode
        required: true,
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',
        type: 'search',
        field: 'titleTH',
        required: true,
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'firstNameTH',
        required: true,
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'lastNameTH',
        required: true,
      }, {
        label: 'ชื่อ (ภาษาอังกฤษ)',
        type: 'textInput',
        field: 'firstNameEN',
        required: true,
      }, {
        label: 'นามสกุล (ภาษาอังกฤษ)',
        type: 'textInput',
        field: 'lastNameEN',
        required: true,
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'birthDay', //yearOfBirth, monthOfBirth, dayOfBirth
        required: true,
      }, {
        label: 'สถานภาพสมรส',
        type: 'dropdown',
        init: [{ value: 'โสด' }, { value: 'สมรส' }, { value: 'หย่าร้าง' }],
        field: 'martialStatus', // martialStatusCode
        required: true,
      }, {
        label: 'คุณมีบุตร หรือบุตรบุญธรรมหรือไม่ ',
        type: 'radio',
        init: [{ title: 'ไม่มี', active: true }, { title: 'มี' }],
        field: 'isChild',
        required: false,
      }, {
        label: 'สัญชาติ',
        field: 'nationality', // nationalityCode
        value: 'ไทย',
        required: false,
      }
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props

    updateUser('profile', { ...user.profile, [props.field]: props.value })

    if (props.type === 'modal') return this.setState({ modal: true })
    else if (props.field === 'expireDateFlag') {
      this.setState({
        expireSatus: props.value,
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

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
  }

  onNext = async () => {
    const { expireSatus } = this.state
    const { navigateAction, user } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      idCard,
      jcNumber,
      isNoDocExpDate,
      docExpDate,
      gender,
      titleTH,
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      birthDay,
      isChild,
      nationalityCode,
      martialStatus,
    } = user.profile

    const data = {
      docNo: idCard,
      jcNumber,
      isNoDocExpDate,
      docExpDate: expireSatus === 'มีวันหมดอายุ' ? convertDate(docExpDate) : new Date('9999-12-31'),
      genderCode: getStatusGender(gender),
      titleTH,
      firstNameTH,
      lastNameTH,
      firstNameEN,
      lastNameEN,
      dayOfBirth: getOfBirth(birthDay, 'day'),
      monthOfBirth: `${getOfBirth(birthDay, 'month')}`,
      yearOfBirth: getOfBirth(birthDay, 'year'),
      isChild: getStatusChild(isChild),
      nationalityCode,
      martialStatusCode: getStatusMartial(martialStatus),
    }

    this.props.saveIdentity({ variables: { input: data } })
      .then(res => {
        console.log(data, res)
        if (res.data.saveIdentity.success) {
          if (martialStatus === 'สมรส' && isChild === 'มี') {
            navigateAction({ ...this.props, page: 'marry', params: { redirec: 'child' } })
          }
          else if (martialStatus === 'สมรส') navigateAction({ ...this.props, page: 'marry' })
          else if (isChild === 'ไม่มี') navigateAction({ ...this.props, page: 'career' })
          else if (isChild === 'มี') navigateAction({ ...this.props, page: 'child' })

        } else if (!res.data.saveIdentity.success) {
          switch (res.data.saveIdentity.message) {
            case 'PreconditionRequired':
              this.setState({ PreconditionRequired: res.data.saveIdentity.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.data.saveIdentity.details })
            default: return null
          }
        }
      })
      .catch(err => {
        console.log(err.toString())
      })
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลส่วนตัว"
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
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.profile[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field)
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