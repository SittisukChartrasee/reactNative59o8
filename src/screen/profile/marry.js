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
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'
import { updateUser } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import { convertDate, getOfBirth, getStatusGender, getStatusMartial } from '../../utility/helper'

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
    nationSatus: 'ไทย',
    ReconditionRequired: [],
    InvalidArgument: [
      { field: 'IDCardNo', description: 'รูปแบบไม่ถูกต้อง' },
      { field: 'fistName', description: 'รูปแบบไม่ถูกต้อง' }
    ],
    fields: [
      {
        label: 'สัญชาติ',
        type: 'radio',
        init: [{ title: 'ไทย', active: true }, { title: 'ชาวต่างชาติ' }],
        field: 'nationFlag',
      }, {
        label: 'หมายเลขบัตรประชาชน',
        type: 'textInput',
        field: 'IDCardNo',
      }, {
        label: 'ประเทศ',
        type: 'search',
        field: 'marryCountry', // ต้อง save ที่ field => nationalityCode
        inVisible: true,
      }, {
        label: 'หมายเลขหนังสือเดินทาง',
        type: 'textInput',
        field: 'marryPassport', // ต้อง save ที่ field => IDCardNo
        inVisible: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'expireFlag', // ต้อง save ที่ field => isIDCardExpDate
      }, {
        label: 'วันที่หนังสือเดินทางหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'cardExpiredDate', // ต้อง save ที่ field => cardExpiredDate
        inVisible: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'marryExpireDate', // ต้อง save ที่ field => cardExpiredDate
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',    
        type: 'search',
        field: 'title',
      }, {
        label: 'ชื่อ',
        type: 'textInput',
        field: 'fistName',
      }, {
        label: 'นาม-สกุล',
        type: 'textInput',
        field: 'lastName',
      }, {
        label: 'คุณเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        type: 'radioColumn',
        init: [{ title: 'ใช่', active: true }, { title: 'ไม่ใช่' }],
        field: 'pepFlag',
      },
    ]
  }
  handleInput = (props) => {
    const { fields } = this.state
    const { updateUser, user } = this.props

    if (props.field === 'nationFlag') {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value } )
      this.setState({
        nationSatus: props.value,
        fields: fields.map((d) => {
          if (props.value === 'ไทย') {
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: true }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ชาวต่างชาติ') {
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: false }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'expireFlag') {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value } )
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
      updateUser('spouse', { ...user.spouse, nationalityCode: props.code, nationalityRisk: props.risk } )
    } else {
      updateUser('spouse', { ...user.spouse, [props.field]: props.value } )
    }
  }

  onValidation = (field) => {
    const { ReconditionRequired, InvalidArgument } = this.state
    const Required = find(ReconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
  }

  onNext = async () => {
    const { expireSatus, nationSatus } = this.state
    const { navigateAction, user } = this.props
    const redirec = this.props.navigation.getParam('redirec', '')

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

    this.props.saveSpouse({ variables: { input: data } })
      .then(res => {
        if (user.spouse.nationalityRisk) {
          return this.setState({ modal: true })
        } else if (res.data.saveSpouse.success) {
          if (redirec) return navigateAction({ ...this.props, page: redirec })
          navigateAction({ ...this.props, page: 'career' })
        } else if (!res.data.saveSpouse.success) {
          switch (res.data.saveSpouse.message) {
            case 'ReconditionRequired':
              this.setState({ ReconditionRequired: res.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.details })
            default: return null
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { user } = this.props
    const { fields, error } = this.state
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลคู่สมรส"
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
              value: user.spouse[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
              error: this.onValidation(d.field)
            }, key))
          }
        </ScrollView>

        {
          modal({
            visible: this.state.modal,
            dis: `ประเทศของท่าน\nมีความเสี่ยงไม่สามารถสมัครต่อได้`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={this.onNext}/>
      </Screen>
    )
  }
}