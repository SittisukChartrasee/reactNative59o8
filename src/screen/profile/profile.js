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
import Modal from '../../component/modal'
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
    modal: {
      visible: false
    },
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
        init: [{ value: 'โสด' }, { value: 'สมรส' }, { value: 'หย่าร้าง' }, { value: 'หม้าย' }],
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

    if (props.field === 'jcNumber' && props.value) {
      updateUser('profile', { ...user.profile, [props.field]: (props.value).toUpperCase() })
    } else {
      updateUser('profile', { ...user.profile, [props.field]: props.value })
    }
    if (props.type === 'modal') {
      const modal = {
        image: images.iconBackIdcard,
        dis: `ด้านหลังบัตรประชาชน ประกอบด้วยอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 ตัว \nตัวอย่างการกรอก : JC1234567890`,
        visible: true,
        onPress: () => this.setState({ modal: { visible: false } })
      }
      return this.setState({ modal })
    }
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
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'genderCode' && field === 'gender') {
        return o
      }
      if ((o.field === 'yearOfBirth ' ||
        o.field === 'monthOfBirth' ||
        o.field === 'dayOfBirth') && field === 'birthDay') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'genderCode' && field === 'gender') {
        return o
      }
      if ((o.field === 'yearOfBirth ' ||
        o.field === 'monthOfBirth' ||
        o.field === 'dayOfBirth') && field === 'birthDay') {
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
      jcNumber: jcNumber ? jcNumber.trim().toUpperCase() : '',
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

    console.log(data)

    if (nationalityCode === 'USA') {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        onPress: () => this.setState({ modal: { visible: false } })
      }
      return this.setState({ modal })
    } 
    
    // else {
    //   this.props.saveIdentity({ variables: { input: data } })
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.saveIdentity.success) {
    //         if (martialStatus === 'สมรส' && isChild === 'มี') {
    //           navigateAction({ ...this.props, page: 'marry', params: { redirec: 'child' } })
    //         }
    //         else if (martialStatus === 'สมรส') navigateAction({ ...this.props, page: 'marry' })
    //         else if (isChild === 'ไม่มี') navigateAction({ ...this.props, page: 'career' })
    //         else if (isChild === 'มี') navigateAction({ ...this.props, page: 'child' })

    //       } else if (!res.data.saveIdentity.success) {
    //         switch (res.data.saveIdentity.message) {
    //           case 'PreconditionRequired':
    //             this.setState({ PreconditionRequired: res.data.saveIdentity.details })
    //             break
    //           case 'InvalidArgument':
    //             this.setState({ InvalidArgument: res.data.saveIdentity.details })
    //             break
    //           default:
    //             const modal = {
    //               dis: res.data.saveIdentity.message,
    //               visible: true,
    //               onPress: () => this.setState({ modal: { visible: false } })
    //             }
    //             this.setState({ modal })
    //             break
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err.toString())
    //     })
    // }
  }

  render() {
    const { modal } = this.state
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

        <KeyboardAwareScrollView
          extraScrollHeight={50}
          enableOnAndroid
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
        </KeyboardAwareScrollView>

        {
          Modal(modal)
        }

        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}