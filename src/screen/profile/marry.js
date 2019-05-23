import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
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
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'
import { convertDate, getOfBirth, getStatusGender, getStatusMartial } from '../../utility/helper'

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
    nationSatus: 'ไทย',
    code: 'TH',
    PreconditionRequired: [],
    InvalidArgument: [],
    fields: [
      {
        label: 'สัญชาติ',
        type: 'radio',
        init: [{ title: 'ไทย', active: true }, { title: 'ชาวต่างชาติ' }],
        field: 'nationFlag',
        required: true,
      }, {
        label: 'หมายเลขบัตรประชาชน',
        type: 'textInput',
        field: 'IDCardNo',
        required: true,
      }, {
        label: 'ประเทศ',
        type: 'search',
        field: 'marryCountry', // ต้อง save ที่ field => nationalityCode
        inVisible: true,
        required: true,
      }, {
        label: 'หมายเลขหนังสือเดินทาง',
        type: 'textInput',
        field: 'marryPassport', // ต้อง save ที่ field => IDCardNo
        inVisible: true,
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'expireFlag', // ต้อง save ที่ field => isIDCardExpDate
        required: true,
      }, {
        label: 'วันที่หนังสือเดินทางหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'cardExpiredDate', // ต้อง save ที่ field => cardExpiredDate
        inVisible: true,
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'marryExpireDate', // ต้อง save ที่ field => cardExpiredDate
        required: true,
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',
        type: 'search',
        field: 'title',
        required: true,
      }, {
        label: 'ชื่อ',
        type: 'textInput',
        field: 'fistName',
        required: true,
      }, {
        label: 'นาม-สกุล',
        type: 'textInput',
        field: 'lastName',
        required: true,
      }, {
        label: 'คุณเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        type: 'radioColumn',
        init: [{ title: 'ใช่', active: true }, { title: 'ไม่ใช่' }],
        field: 'pepFlag',
        required: true,
      },
    ]
  }
  handleInput = (props) => {
    const { fields, code } = this.state
    const { updateUser, user } = this.props

    if (props.field === 'nationFlag') {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value })
      this.setState({
        nationSatus: props.value,
        fields: fields.map((d) => {
          if (props.value === 'ไทย') {
            updateUser('spouse', { ...user.spouse, nationalityCode: 'TH' })
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: true }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ชาวต่างชาติ') {
            updateUser('spouse', { ...user.spouse, nationalityCode: code })
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: false }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'expireFlag') {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value })
      this.setState({
        expireSatus: props.value,
        fields: fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            if (d.field === 'marryExpireDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            if (d.field === 'marryExpireDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'marryCountry') {
      this.setState({ code: props.code })
      updateUser('spouse', { ...user.spouse, nationalityCode: props.code, nationalityRisk: props.risk })
    } else {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value })
    }
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'nationalityCode' && field === 'marryCountry') {
        return o
      }
      if (o.field === 'IDCardNo' && field === 'marryPassport') {
        return o
      }
      if (o.field === 'cardExpiredDate' && field === 'marryExpireDate') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'nationalityCode' && field === 'marryCountry') {
        return o
      }
      if (o.field === 'IDCardNo' && field === 'marryPassport') {
        return o
      }
      if (o.field === 'cardExpiredDate' && field === 'marryExpireDate') {
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
    const { expireSatus, nationSatus } = this.state
    const { navigateAction, user, updateRoot } = this.props
    const redirec = this.props.navigation.getParam('redirec', '')
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })

    const {
      title,
      lastName,
      pepFlag,
      nationalityCode,
      IDCardNo,
      marryPassport,
      isIDCardExpDate,
      marryExpireDate,
      cardExpiredDate,
      fistName,
    } = user.spouse


    const data = {
      title,
      lastName,
      pepFlag: pepFlag === 'ใช่',
      nationalityCode,
      IDCardNo: nationSatus === 'ไทย' ? IDCardNo : marryPassport,
      isIDCardExpDate,
      cardExpiredDate: (expireSatus === 'มีวันหมดอายุ')
        ? (nationSatus === 'ไทย')
          ? convertDate(marryExpireDate)
          : convertDate(cardExpiredDate)
        : new Date('9999-12-31'),
      fistName,
    }

    console.log(data)

    this.props.saveSpouse({ variables: { input: data } })
      .then(res => {

        // ตรวจประเทศเสี่ยงยังไม่มีใน Flow

        // if (user.spouse.nationalityRisk) {
          
        // }

        if (res.data.saveSpouse.success) {
          if (redirec) return navigateAction({ ...this.props, page: redirec })
          navigateAction({ ...this.props, page: 'career' })
        } else if (!res.data.saveSpouse.success) {
          switch (res.data.saveSpouse.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.data.saveSpouse.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.data.saveSpouse.details })
            default:
              const modal = {
                dis: res.data.saveSpouse.message,
                visible: true,
                onPress: () => updateRoot('modal', { visible: false })
              }
              return updateRoot('modal', modal)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { user } = this.props
    const { fields } = this.state
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลคู่สมรส"
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
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.spouse[d.field],
              inVisible: d.inVisible,
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