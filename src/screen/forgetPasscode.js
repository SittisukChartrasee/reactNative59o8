import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Image,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient'
import { LongPositionButton } from '../component/button'
import images from '../config/images'
import Input from '../component/input'
import { navigateAction } from '../redux/actions'
import colors from '../config/colors';
import { root } from '../redux/actions/commonAction'
import { forgotPasscode, requestOtp } from '../redux/actions/root-active'
import { replaceSpace } from '../utility/helper'
import { TBold } from '../component/texts';

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  forgotPasscode: bindActionCreators(forgotPasscode, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
    card: [
      {
        type: 'mask',
        label: 'เลขบัตรประชาชน',
        field: 'idCard',
        option: '9 9999 99999 99 9',
        value: '',
      }
    ]
  }

  componentDidMount = () => {
    this.props.updateRoot('currFlowUP', 'forgetPasscode')
  }

  // try and catch in root-active
  onForgotPasscode = async ({ user_token, id_card }) => {
    const res = await this.props.forgotPasscode({ user_token, id_card })
    return res
  }

  // try and catch in root-active
  onRequestOtp = async (data, { token, currFlowUP }) => {
    const res = await this.props.requestOtp(data, { token, currFlowUP })
    return res
  }

  onNext = async () => {
    const user_token = await AsyncStorage.getItem('user_token')
    const res = await this.onForgotPasscode({ user_token: user_token, id_card: replaceSpace(this.state.card[0].value) })

    const success = get(res, 'success', false)
    const code = get(res, 'code', '')

    const accessToken = get(res, 'result.access_token', '')

    if (success) {
      setTimeout(() => this.onHandleToken(accessToken), 1000)
    }
    else if (!success) {
      switch (code) {
        case '2101':
          return this.setState({ PreconditionRequired: res.details })
        case '2201':
          return this.setState({ InvalidArgument: res.details })
        default:
          return null
      }
    }
  }

  // function throttle in requestApi is interrupt this once API res forgotPasscode or requestOtp
  onHandleToken = async token => {

    const responseOtp = await this.onRequestOtp(null, { token, currFlowUP: this.props.root.currFlowUP })

    const success = get(responseOtp, 'success', false)
    const code = get(responseOtp, 'code', '')

    const refNo = get(responseOtp, 'details.ref_no', '')
    const time = get(responseOtp, 'details.time', 0)
    const transId = get(responseOtp, 'result.trans_id', '')
    const phoneNo = get(responseOtp, 'result.phone_no', '')
    const refsNo = get(responseOtp, 'result.ref_no', '')

    if (success || code === '1001') {
      if (code === '1001') {

        this.props.updateRoot('ref_no', refNo)
        this.props.updateRoot('time', time)
        this.props.updateRoot('overRequest', true)
        this.props.updateRoot('overRequestUi', true)

      } else {

        this.props.updateRoot('trans_id', transId)
        this.props.updateRoot('ref_no', refsNo)
        this.props.updateRoot('phone_no', phoneNo)
        this.props.updateRoot('overRequest', false)
        this.props.updateRoot('overRequestUi', false)

      }

      this.props.navigation.navigate({ routeName: 'otp', key: 'otpForgetPasscode' })
    }
  }

  handleInput = (obj) => {
    this.setState({
      card: this.state.card.map(d => d.field === obj.field ? ({ ...d, value: obj.value }) : d)
    })
    this.handleValidation({ field: obj.field, value: obj.value })
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'idCard' && Invalid && validateIdentityCard(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    }

    if (Required && RequiredFields(value))
      this.setState({ PreconditionRequired: PreconditionRequired.filter(o => o.field !== field) })
  }

  onValidation = field => {
    const { Required, Invalid } = this.getRequiredInvalid(field)
    if (Required)
      return Required.description
    else if (Invalid)
      return Invalid.description
    return null
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    return { Required, Invalid }
  }

  render() {
    const { card } = this.state
    return (
      <Screen color="transparent">
        <NavBar
          title="ตั้งรหัสผ่านใหม่"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />


        <View style={{ flex: 1, backgroundColor: colors.white, paddingVertical: 24 }}>
          {
            card.map((d, key) => Input({
              field: d.field,
              label: d.label,
              value: d.value,
              type: d.type,
              image: d.image,
              number: d.number,
              disabled: d.disabled,
              option: d.option,
              err: this.onValidation(d.field),
              handleInput: value => this.handleInput(value),
            }, key))
          }
        </View>

        <LongPositionButton bg={colors.lightgrey} label="ถัดไป" onPress={this.onNext} />
      </Screen>
    )
  }
}