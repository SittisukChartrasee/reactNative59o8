import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import reverse from 'lodash/reverse'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'
import {
  convertDate,
  getOfBirth,
  getStatusGender,
  getStatusMartial,
  getStatusChild,
  replaceJsCard,
  replaceSpace
} from '../../utility/helper'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    expireSatus: 'มีวันหมดอายุ',
    PreconditionRequired: [],
    InvalidArgument: [],
    fields: [
      {
        label: 'เลขบัตรประชาชน',
        field: 'idCard',
        required: false,
      }, {
        type: 'Icustom',
        label: 'หมายเลขหลังบัตรประชาชน (Laser Code)',
        field: 'jcNumber',
        option: 'SSS-SSSSSSS-SS',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [
          {
            title: 'มีวันหมดอายุ',
            active: !this.props.user.profile.isNoDocExpDate
          },
          {
            title: 'ไม่มีวันหมดอายุ',
            active: this.props.user.profile.isNoDocExpDate
          }
        ],
        field: 'expireDateFlag', // isNoDocExpDate
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'docExpDate',
        date: reverse(this.props.user.profile.docExpDate.split('-')),
        required: true,
        inVisible: this.props.user.profile.isNoDocExpDate
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
        date: 20, // กำหนด ปี สำหรับ อายุ 20 ปี
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
        init: [
          {
            title: 'ไม่มี',
            active: (this.props.user.profile.isChild === 'ไม่มี')
          },
          {
            title: 'มี',
            active: (this.props.user.profile.isChild === 'มี')
          }
        ],
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
    const { user } = this.props
    const { expireSatus } = this.state
    let isNoDoc = expireSatus === 'มีวันหมดอายุ' ? false : true
    if (props.type === 'modal') {
      const modal = {
        image: images.iconBackIdcard,
        dis: `ด้านหลังบัตรประชาชน ประกอบด้วยอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 ตัว \nตัวอย่างการกรอก : JC1234567890`,
        visible: true,
        onPress: () => this.props.updateRoot('modal', { visible: false }),
        onPressClose: () => this.props.updateRoot('modal', { visible: false })
      }
      return this.props.updateRoot('modal', modal)
    }
    else if (props.field === 'expireDateFlag') {
      isNoDoc = props.value === 'มีวันหมดอายุ' ? false : true
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
    this.props.updateUser('profile', {
      ...user.profile,
      [props.field]: props.value,
      'isNoDocExpDate': isNoDoc
    })
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'genderCode' && field === 'gender') {
        return o
      }
      if (o.field === 'martialStatusCode' && field === 'martialStatus') {
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
      if (o.field === 'martialStatusCode' && field === 'martialStatus') {
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

  onNext = () => {
    const { expireSatus } = this.state
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [] })
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

    console.log(birthDay)

    const data = {
      docNo: replaceSpace(idCard),
      jcNumber: replaceJsCard(jcNumber),
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

    this.props.saveIdentity({ variables: { input: data } })
      .then(res => {
        console.log(res)
        if (res.data.saveIdentity.success) {
          if (martialStatus === 'สมรส' && isChild === 'มี') {
            this.props.navigateAction({ ...this.props, page: 'marry', params: { redirec: 'child' } })
          }
          else if (martialStatus === 'สมรส') this.props.navigateAction({ ...this.props, page: 'marry' })
          else if (isChild === 'ไม่มี') this.props.navigateAction({ ...this.props, page: 'career' })
          else if (isChild === 'มี') this.props.navigateAction({ ...this.props, page: 'child' })

        } else if (!res.data.saveIdentity.success) {
          switch (res.data.saveIdentity.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.data.saveIdentity.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.data.saveIdentity.details })
            default:
              const modal = {
                dis: res.data.saveIdentity.message,
                visible: true,
                onPress: () => this.props.updateRoot('modal', { visible: false }),
                onPressClose: () => this.props.updateRoot('modal', { visible: false })
              }
              return this.props.updateRoot('modal', modal)
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
              date: d.date,
              option: d.option,
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}