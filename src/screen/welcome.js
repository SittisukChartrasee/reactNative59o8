import React from 'react'
import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongPositionButton } from '../component/button'
import { navigateAction } from '../redux/actions'
import { requestOtp } from '../redux/actions/root-active'
import { updateUser, root } from '../redux/actions/commonAction'
import lockout from '../containers/hoc/lockout'
import { NavBar } from '../component/gradient'
import { replaceSpace, fontToLower, handleSizing } from '../utility/helper'
import { validateEmail, validateIdentityCard, validatePhoneNumber, RequiredFields } from '../utility/validation'
import { maskedFormat } from '../utility/util'

const { height: heightScreen } = Dimensions.get('window')

const fields = [
  {
    type: 'textInput',
    label: 'หมายเลขบัตรประชาชน',
    field: 'idCard',
    format: [
      { index: 1, char: ' ' },
      { index: 5, char: ' ' },
      { index: 10, char: ' ' },
      { index: 12, char: ' ' },
    ],
    // option: '9 9999 99999 99 9',
    required: true,
  },
  {
    type: 'textInput',
    label: 'อีเมล',
    field: 'email',
    required: true,
  },
  {
    type: 'textInput',
    label: 'หมายเลขโทรศัพท์มือถือ',
    field: 'mobilePhone',
    format: [
      { index: 3, char: ' ' },
      { index: 6, char: ' ' },
    ],
    // option: '099 999 9999',
    keyboardType: 'number-pad',
    required: true,
  }
]

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
@lockout
export default class extends React.Component {
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
  }

  componentDidMount = async () => {
    const a = await AsyncStorage.getItem('access_token')
    const b = await AsyncStorage.getItem('user_token')
    console.log('token', a, 'user_token', b)
  }

  handleInput = (obj) => {
    const { user } = this.props
    
    if (obj.field === 'idCard') {
      this.props.updateUser('profile', {
        ...user.profile,
        [obj.field]: maskedFormat({ value: obj.value, format: obj.format, limit: 13, field: obj.field })
      })
    } else if (obj.field === 'email') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
    } else if (obj.field === 'mobilePhone') {
      this.props.updateUser('contact', {
        ...user.contact,
        [obj.field]: maskedFormat({ value: obj.value, format: obj.format, limit: 10, field: obj.field })
      })
    }
    this.handleValidation({ field: obj.field, value: obj.value })
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'idCard' && Invalid && validateIdentityCard(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if (field === 'email' && Invalid && validateEmail(fontToLower(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if (field === 'mobilePhone' && Invalid && validatePhoneNumber(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    }

    if (Required && RequiredFields(value))
      this.setState({ PreconditionRequired: PreconditionRequired.filter(o => o.field !== field) })
  }

  onValidation = (field) => {
    const { Required, Invalid } = this.getRequiredInvalid(field)
    if (Required)
      return Required.description
    else if (Invalid)
      return Invalid.description
    return null
  }

  // try and catch in root-active
  onRequestOtp = async data => {
    const res = await this.props.requestOtp(data, { token: null })
    return res
  }

  handleError = ({ code, details }) => {
    switch (code) {
      case '2101':
        return this.setState({ PreconditionRequired: details })
      case '2201':
        return this.setState({ InvalidArgument: details })
      default:
        return null
    }
  }

  onNext = async () => {
    const { user } = this.props

    this.setState({ PreconditionRequired: [], InvalidArgument: [] })

    const data = {
      id_card: replaceSpace(user.profile.idCard),
      email: fontToLower(user.contact.email),
      phone_no: replaceSpace(user.contact.mobilePhone),
    }

    const res = await this.onRequestOtp(data)

    const success = get(res, 'success', false)
    const code = get(res, 'code', '1103')
    const details = get(res, 'details', null)

    if (success || code === '1001') {
      if (code === '1001') {
        const time = get(res, 'details.time', 0)
        const refNo = get(res, 'details.ref_no', '')

        this.props.updateRoot('time', time)
        this.props.updateRoot('ref_no', refNo)
        this.props.updateRoot('overRequest', true)
        this.props.updateRoot('overRequestUi', true)
      } else {
        this.props.updateRoot('overRequest', false)
        this.props.updateRoot('overRequestUi', false)
      }

      return this.props.navigateAction({ ...this.props, page: 'otp' })
    } else {
      this.handleError({ code, details })
    }
  }

  onSubmitFirstName = (field) => {
    const arr = ['idCard', 'email', 'mobilePhone']
    if (this[arr[arr.indexOf(field) + 1]]) this[arr[arr.indexOf(field) + 1]].focus()
  }

  render() {
    return (
      <Screen>
        <NavBar
          img={images.logoKasset}
          color="transparent"
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
          extraHeight={100}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={images.kmyfundLogo} style={handleSizing(heightScreen)} resizeMode="contain" />
              <TBold fontSize={20} color={colors.white} mt="24" mb="40">{`กรุณากรอกข้อมูล\nเพื่อเปิดบัญชีกองทุน`}</TBold>
            </View>
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'flex-start',
                backgroundColor: '#fff',
                paddingBottom: 24,
              }}>
              {
                fields.map((setField, key) => Input({
                  ...setField,
                  refFunc: ref => { this[setField.field] = ref },
                  value: (setField.field === 'idCard')
                    ? this.props.user.profile.idCard
                    : this.props.user.contact[setField.field],
                  handleInput: value => this.handleInput(value),
                  err: this.onValidation(setField.field),
                  keyboardType: setField.keyboardType,
                  returnKeyType: setField.field === 'mobilePhone' ? 'done' : 'next',
                  onSubmitEditing: () => this.onSubmitFirstName(setField.field),
                }, key))
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
        <LongPositionButton
          label="ถัดไป"
          onPress={this.onNext}
        />
      </Screen>
    )
  }
}

