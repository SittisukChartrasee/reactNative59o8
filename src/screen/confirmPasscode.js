import React from 'react'
import {
  Platform,
  AsyncStorage,
  NativeModules,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import { confirmPasscode } from '../redux/actions/root-active'
import { root } from '../redux/actions/commonAction'
import getnativeModules from '../containers/hoc/infoAppNativeModules'
import typeModal from '../utility/typeModal'

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

  setNumber = (obj) => {
    this.setState({ ...obj })

    const data = {
      password: obj.number,
      type: Platform.OS,
      fcm_token: this.props.fcm,
      version: this.props.version,
      system_version: DeviceInfo.getSystemVersion(),
      device_id: this.props.deviceInfo,
    }
    if (obj.number.length === 6) {
      if (this.props.passcode.passcode === data.password) {
        const token = this.props.root.access_token
        const currFlowUP = this.props.root.currFlowUP

        this.props.confirmPasscode(data, { token, currFlowUP })
          .then(res => {
            if (currFlowUP === 'forgetPasscode') {
              this.props.navigation.navigate('login')
              return
            } else if (currFlowUP === 'updatePasscode') {
              if (res.success) this.props.updateRoot('password', data.password)
              this.props.navigation.navigate('portSuggestion')
              return
            } else if (res.success) {
              this.props.navigateAction({ ...this.props, page: 'condi' })
              AsyncStorage.setItem('access_token', res.result.access_token)
              AsyncStorage.setItem('user_token', res.result.user_token)
              NativeModules.KMyFundOnboarding.saveRegisterFlag(NativeModules.KMyFundOnboarding.STATUS_NEW_CUSTOMER)
              NativeModules.KMyFundOnboarding.saveUserToken(res.result.user_token)
            } else if (!res.success && res.code) {
              this.props.toggleModal({
                ...typeModal[res.code],
                dis: res.message,
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.props.passcode.passcode !== data.password) {
        this.props.toggleModal({
          ...typeModal['1103'],
          dis: `รหัสผ่าน (PIN) ไม่ตรงกับที่ตั้งไว้\nกรุณากรอกใหม่อีกครั้ง`,
          onPress: () => {
            this.props.toggleModal({ ...this.props.root.modal, visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          },
          onPressClose: () => {
            this.props.toggleModal({ ...this.props.root.modal, visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          }
        })
      }
    }
  }

  // onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'passcode' })
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
