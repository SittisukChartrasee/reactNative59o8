import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
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
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'
import {
  validateIdentityCard,
  validateIdentityJcNumber,
  validateIdentityEngLanguage,
  validateIdentityThaiLanguage,
  RequiredFields
} from '../../utility/validation'
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
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    expireSatus: this.props.user.profile.isNoDocExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
    PreconditionRequired: [],
    InvalidArgument: [],
    layout: [],
    // hidePicker Use for hide picker Date Back and Next Page
    hidePicker: false,
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
        label: 'คำนำหน้า',
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
        label: 'ท่านมีบุตร หรือบุตรบุญธรรมหรือไม่ ',
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
      this.props.toggleModal({
        ...typeModal['1103'],
        image: images.iconBackIdcard,
        dis: `ด้านหลังบัตรประชาชน ประกอบด้วยอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 ตัว \nตัวอย่างการกรอก : JC1234567890`,
      })
    } else if (props.field === 'expireDateFlag') {
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
      this.props.updateUser('profile', {
        ...user.profile,
        [props.field]: props.value,
        'isNoDocExpDate': isNoDoc
      })
    } else if (props.field === 'titleTH') {
      this.props.updateUser('profile', {
        ...user.profile,
        [props.field]: props.value,
        'isNoDocExpDate': isNoDoc,
        'titleCode': props.code,
        'titleDetail': props.nameDetail,
        'titleGender': props.titleGender
      })
    } else if (props.type === 'onFocus') {
      this.setState({ hidePicker: true })
    } else {
      this.props.updateUser('profile', {
        ...user.profile,
        [props.field]: props.value,
        'isNoDocExpDate': isNoDoc
      })
    }
    this.handleValidation({ field: props.field, value: props.value })
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'genderCode' && field === 'gender') return o
      if (o.field === 'martialStatusCode' && field === 'martialStatus') return o
      if ((o.field === 'yearOfBirth ' || o.field === 'monthOfBirth' || o.field === 'dayOfBirth') && field === 'birthDay') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'genderCode' && field === 'gender') return o
      if (o.field === 'martialStatusCode' && field === 'martialStatus') return o
      if ((o.field === 'yearOfBirth ' || o.field === 'monthOfBirth' || o.field === 'dayOfBirth') && field === 'birthDay') return o
      return o.field === field
    })
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'idCard' && Invalid && validateIdentityCard(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if (field === 'jcNumber' && Invalid && validateIdentityJcNumber(replaceJsCard(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if ((field === 'firstNameTH' || field === 'lastNameTH') && Invalid && validateIdentityThaiLanguage(value)) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if ((field === 'firstNameEN' || field === 'lastNameEN') && Invalid && validateIdentityEngLanguage(value)) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    }

    if (Required && RequiredFields(value)) {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => {
          if (!(o.field === 'genderCode' && field === 'gender') &&
            !(o.field === 'martialStatusCode' && field === 'martialStatus') &&
            !((o.field === 'yearOfBirth ' || o.field === 'monthOfBirth' || o.field === 'dayOfBirth') && field === 'birthDay') &&
            o.field !== field)
            return o
        })
      })
    }
  }

  onValidation = (field) => {
    const { Required, Invalid } = this.getRequiredInvalid(field)
    if (Required)
      return Required.description
    else if (Invalid)
      return Invalid.description
    return null
  }

  onNext = async () => {
    const { expireSatus } = this.state
    const { user } = this.props

    this.setState({ PreconditionRequired: [], InvalidArgument: [], hidePicker: true })

    const {
      idCard,
      jcNumber,
      isNoDocExpDate,
      docExpDate,
      gender,
      titleTH,
      titleCode,
      titleGender,
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
      docNo: replaceSpace(idCard),
      jcNumber: replaceJsCard(jcNumber),
      isNoDocExpDate,
      docExpDate: expireSatus === 'มีวันหมดอายุ' ? convertDate(docExpDate) : new Date('9999-12-31'),
      genderCode: getStatusGender(gender),
      titleTH,
      titleCode,
      titleGender,
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

    try {
      const res = await this.props.saveIdentity({ variables: { input: data } })

      const success = get(res, 'data.saveIdentity.success', false)
      const code = get(res, 'data.saveIdentity.code', errorMessage.messageIsNull.code)
      const details = get(res, 'data.saveIdentity.details', [])
      const message = get(res, 'data.saveIdentity.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {

        if (martialStatus === 'สมรส' && isChild === 'มี') {
          this.props.navigateAction({ ...this.props, page: 'marry', params: { redirec: 'child' } })
        }
        else if (martialStatus === 'สมรส') this.props.navigateAction({ ...this.props, page: 'marry' })
        else if (isChild === 'ไม่มี') this.props.navigateAction({ ...this.props, page: 'career' })
        else if (isChild === 'มี') this.props.navigateAction({ ...this.props, page: 'child' })

      } else {

        switch (code) {
          case '2101':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ PreconditionRequired: details || [] })
          case '2201':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ InvalidArgument: details || [] })
          default:
            return this.props.toggleModal({
              ...typeModal[code],
              dis: message
            })
        }

      }

    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  onHandleScrollToErrorField = async (field) => {
    const errField = await field.map(d => d.field)
    const layoutY = this.state.fields
      .map((d, index) => (errField.indexOf(d.field) > -1 ||
        (d.field === 'gender' && errField.indexOf('genderCode') > -1) ||
        (d.field === 'martialStatus' && errField.indexOf('martialStatusCode') > -1)) && index)
      .filter(d => d !== false)
    this.refScrollView.scrollToPosition(0, this.state.layout[layoutY[0]], true)
  }

  onSetLayout = (layoutY, index) => {
    const { layout } = this.state
    const newArray = layout
    newArray[index] = layoutY
    this.setState({ layout: [...newArray] })
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลส่วนตัว"
          navLeft={
            <TouchableOpacity
              onPress={() => {
                this.setState({ hidePicker: true })
                this.props.navigation.goBack()
              }}
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
          ref={ref => { this.refScrollView = ref }}
        >
          {
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: d.field === 'titleTH'
                ? user.profile['titleDetail']
                : user.profile[d.field],
              inVisible: d.inVisible,
              date: d.date,
              option: d.option,
              onSetLayout: val => this.onSetLayout(val.layout.y, key),
              handleInput: (props) => this.handleInput(props),
              hidePicker: this.state.hidePicker,
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}