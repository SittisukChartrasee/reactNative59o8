import React from 'react'
import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  ScrollView,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongPositionButton } from '../component/button'
import Modal from '../component/modal'
import { navigateAction } from '../redux/actions'
import { requestOtp } from '../redux/actions/root-active'
import { updateUser } from '../redux/actions/commonAction'
// import * as validate from '../utility/validation'

const { width: widthScreen } = Dimensions.get('window')

const fields = [
  {
    type: 'mask',
    label: 'หมายเลขบัตรประชาชน',
    field: 'idCard',
    option: '999 999 999 9999'
  },
  {
    type: 'textInput',
    label: 'อีเมล',
    field: 'email'
  },
  {
    type: 'mask',
    label: 'หมายเลขโทรศัพท์มือถือ',
    field: 'mobilePhone',
    option: '099 999 9999'
  }
]

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    modal: false,
    ReconditionRequired: [],
    InvalidArgument: [
      { field: 'mobilePhone', description: 'รูปแบบเบอร์โทรศัทพ์ไม่ถูกต้อง' }
    ],
  }

  componentDidMount = async () => {
    const a = await AsyncStorage.getItem('access_token')
    const b = await AsyncStorage.getItem('user_token')
    console.log('token', a, 'user_token', b)
  }

  handleInput = (obj) => {
    const { user } = this.props
    const { details } = this.state
    if (obj.field === 'idCard') {
      this.props.updateUser('profile', { ...user.profile, [obj.field]: obj.value.split(' ').join('') })
    } else if (obj.field === 'email') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
    } else if (obj.field === 'mobilePhone') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value.split(' ').join('') })
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
    const { navigateAction, user } = this.props

    const data = {
      idCard: user.profile.idCard,
      email: (user.contact.email).trim().toLowerCase(),
      mobilePhone: user.contact.mobilePhone,
    }

    const res = await this.props.requestOtp(data)
    if (res.success) {
      navigateAction({ ...this.props, page: 'otp' })
    } else if (!res.success) {
      switch (res.message) {
        case 'ReconditionRequired':
          this.setState({ ReconditionRequired: res.details })
        case 'InvalidArgument':
          this.setState({ InvalidArgument: res.details })
        default: return null
      }
    }
  }

  render() {
    const { modal } = this.state
    const sizing = widthScreen <= 320 ? { width: 160, height: 110 } : {}
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
          <TBold fontSize={20} color={colors.white} mt="10" mb="40">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 }}>

          {
            fields.map((setField, key) => Input({
              ...setField,
              value: (setField.field === 'idCard')
                ? this.props.user.profile.idCard
                : this.props.user.contact[setField.field],
              handleInput: value => this.handleInput(value),
              error: this.onValidation(setField.field)
            }, key))
          }
        
        </ScrollView>
        <LongPositionButton label="ถัดไป" onPress={this.onNext} />

        {
          Modal({
            visible: modal,
            dis: `อีเมลหรือหมายเลขโทรศัพท์นี้ \nได้ทำการสมัครเปิดบัญชีแล้ว`,
            onPress: () => this.setState({ modal: false })
          })
        }
      </Screen>
    )
  }
}


