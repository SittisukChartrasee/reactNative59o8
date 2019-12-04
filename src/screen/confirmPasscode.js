import React from 'react'
import {
  Platform,
  NativeModules,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import get from 'lodash/get'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import { confirmPasscode } from '../redux/actions/root-active'
import { root } from '../redux/actions/commonAction'
import getnativeModules from '../containers/hoc/infoAppNativeModules'
import typeModal from '../utility/typeModal'
import { passcodeMessage } from '../utility/messages'
import SecureKeyStore from "../utility/keyStore";

const defaultPasscode = {
  dot: ['', '', '', '', '', ''],
  number: '',
}

const mapToProps = ({ root, passcode }) => ({ root, passcode })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  confirmPasscode: bindActionCreators(confirmPasscode, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@getnativeModules
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
    defaultKey: false,
    dis: ''
  }

  setNumber = async obj => {
    this.setState({ ...obj })

    if (obj.number.length === 6) {

      const data = {
        password: obj.number,
        type: Platform.OS,
        fcm_token: this.props.fcm,
        version: this.props.version,
        system_version: DeviceInfo.getSystemVersion(),
        device_id: this.props.deviceInfo,
      }

      if (this.props.passcode.passcode !== data.password) {
        this.props.toggleModal({
          ...typeModal[passcodeMessage.equalPasscode.code],
          dis: passcodeMessage.equalPasscode.defaultMessage,
          onPress: () => {
            this.props.toggleModal({ ...this.props.root.modal, visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          },
          onPressClose: () => {
            this.props.toggleModal({ ...this.props.root.modal, visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          }
        })
      } else {
        const token = this.props.root.access_token
        const currFlowUP = this.props.root.currFlowUP

        this.props.updateRoot('password', data.password)

        try {
          const res = await this.props.confirmPasscode(data, { token, currFlowUP })

          const success = get(res, 'success', false)
          const code = get(res, 'code', passcodeMessage.messageIsNull.code)
          const message = get(res, 'message', passcodeMessage.messageIsNull.defaultMessage)

          const accessToken = get(res, 'result.access_token', '')
          const userToken = get(res, 'result.user_token', '')

          if (success) {

            if (currFlowUP === 'forgetPasscode') {
              this.props.navigation.navigate('login')
              return
            } else if (currFlowUP === 'updatePasscode') {
              this.props.navigation.navigate('portSuggestion')
              return
            } else {
              SecureKeyStore.set("access_token", accessToken)
              SecureKeyStore.set("user_token", userToken)
              NativeModules.KMyFundOnboarding.saveRegisterFlag(NativeModules.KMyFundOnboarding.STATUS_NEW_CUSTOMER)
              NativeModules.KMyFundOnboarding.saveUserToken(userToken)

              this.props.navigateAction({ ...this.props, page: 'condi' })
            }
          } else if (message === 'unauthorized') {
            this.props.toggleModal({
              ...typeModal[passcodeMessage.unauthorized.code],
              dis: passcodeMessage.unauthorized.defaultMessage
            })
            this.setState({ ...defaultPasscode, defaultKey: true })
          } else {
            this.props.toggleModal({ ...typeModal[code], dis: message })
            this.setState({ ...defaultPasscode, defaultKey: true })
          }

        } catch (error) {
          this.setState({ ...defaultPasscode, defaultKey: true })
        }
      }
    }
  }

  onPrevPage = () => this.props.navigation.goBack()

  render() {
    const { dot, defaultKey } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{ dot, title: 'ยืนยันรหัสผ่าน', dis: 'กรอกรหัสอีกครั้ง', onPrevPage: this.onPrevPage }}
        />
        <Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
      </Screen>
    )
  }
}
