import React from 'react'
import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
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
import { replaceSpace, fontToLower, handleSizing, heightPercentageToDP } from '../utility/helper'
import { validateEmail, validateIdentityCard, validatePhoneNumber, RequiredFields } from '../utility/validation'

const { width: widthScreen } = Dimensions.get('window')
const { height: heightScreen } = Dimensions.get('window')

const fields = [
  {
    type: 'mask',
    label: 'หมายเลขบัตรประชาชน',
    field: 'idCard',
    option: '9 9999 99999 99 9',
    required: true,
  },
  {
    type: 'textInput',
    label: 'อีเมล',
    field: 'email',
    required: true,
  },
  {
    type: 'mask',
    label: 'หมายเลขโทรศัพท์มือถือ',
    field: 'mobilePhone',
    option: '099 999 9999',
    keyboardType: 'number-pad',
    required: true,
  }
]

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch)
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
      this.props.updateUser('profile', { ...user.profile, [obj.field]: obj.value })
    } else if (obj.field === 'email') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
    } else if (obj.field === 'mobilePhone') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
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

  onNext = async () => {
    // this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'fatca' }))
    const { user } = this.props

    this.setState({ PreconditionRequired: [], InvalidArgument: [] })

    const data = {
      id_card: replaceSpace(user.profile.idCard),
      email: fontToLower(user.contact.email),
      phone_no: replaceSpace(user.contact.mobilePhone),
    }

    this.props.requestOtp(data)
      .then(res => {
        console.log(res)
        if (res.success) {
          this.props.navigateAction({ ...this.props, page: 'otp' })
        } else if (!res.success) {
          switch (res.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.details })
            default:
              return null
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
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
          // extraScrollHeight={Platform.OS === 'ios' ? -86 : -280}
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
                fields.map((setField, key) =>
                  Input({
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
                  }, key)
                )
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

