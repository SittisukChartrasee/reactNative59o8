import React from 'react'
import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native'
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
import { NavigationActions } from 'react-navigation'
import { replaceSpace, fontToLower } from '../utility/helper'

// import * as validate from '../utility/validation'

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
    const { details } = this.state
    if (obj.field === 'idCard') {
      this.props.updateUser('profile', { ...user.profile, [obj.field]: obj.value })
    } else if (obj.field === 'email') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
    } else if (obj.field === 'mobilePhone') {
      this.props.updateUser('contact', { ...user.contact, [obj.field]: obj.value })
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
    // this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'fatca' }))
    const { user } = this.props

    this.setState({ PreconditionRequired: [], InvalidArgument: [] })

    const data = {
      idCard: replaceSpace(user.profile.idCard),
      email: fontToLower(user.contact.email),
      mobilePhone: replaceSpace(user.contact.mobilePhone),
    }

    console.log(data)

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
              const modal = {
                dis: res.message,
                visible: true,
                onPress: () => this.props.updateRoot('modal', { visible: false }),
                onPressClose: () => this.props.updateRoot('modal', { visible: false })
              }
              return this.props.updateRoot('modal', modal)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const sizing = widthScreen <= 320 || heightScreen <= 690 ? { width: 176, height: 128, } : {}
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
        />
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
            <TBold fontSize={20} color={colors.white} mt="24" mb="40">{`กรุณากรอกข้อมูล\nเพื่อเปิดบัญชีกองทุน`}</TBold>
          </View>
          <KeyboardAwareScrollView
            extraScrollHeight={Platform.OS === 'ios' ? -50 : 50}
            enableOnAndroid
            style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 }}
          >
            {
              fields.map((setField, key) => Input({
                ...setField,
                value: (setField.field === 'idCard')
                  ? this.props.user.profile.idCard
                  : this.props.user.contact[setField.field],
                handleInput: value => this.handleInput(value),
                err: this.onValidation(setField.field)
              }, key))
            }

          </KeyboardAwareScrollView>
          <LongPositionButton label="ถัดไป" onPress={this.onNext} />
        </ScrollView>
      </Screen>
    )
  }
}


