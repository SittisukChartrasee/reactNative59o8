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

  onNext = async () => {
    const user_token = await AsyncStorage.getItem('user_token')
    this.props.forgotPasscode({
      user_token: user_token,
      id_card: replaceSpace(this.state.card[0].value),
    })
      .then((res) => {
        if (res.success) this.onHandleToken(res)
        else if (!res.success) {
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
      .catch(err => console.log(err))
  }

  onHandleToken = res => {
    this.props.requestOtp(null, { token: res.result.access_token, currFlowUP: this.props.root.currFlowUP })
      .then(resValidate => {
        if (resValidate.success || resValidate.code === '1001') {
          if (resValidate.code === '1001') {
            this.props.updateRoot('ref_no', resValidate.details.ref_no)
            this.props.updateRoot('time', resValidate.details.time)
            this.props.updateRoot('overRequest', true)
            this.props.updateRoot('overRequestUi', true)
          } else {
            this.props.updateRoot('trans_id', resValidate.result.trans_id)
            this.props.updateRoot('ref_no', resValidate.result.ref_no)
            this.props.updateRoot('phone_no', resValidate.result.phone_no)
            this.props.updateRoot('overRequest', false)
            this.props.updateRoot('overRequestUi', false)
          }
          this.props.navigation.navigate({ routeName: 'otp', key: 'otpForgetPasscode' })
        }
        // AsyncStorage.setItem('access_token', resValidate.result.access_token)
      })
      .catch(err => console.log('err validate', err))
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