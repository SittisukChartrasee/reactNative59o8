import React from 'react'
import {
  AsyncStorage,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import { requestRegister } from '../redux/actions/root-active'
import Modal from '../component/modal'

const mapToProps = ({ root, passcode }) => ({ root, passcode })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  requestRegister: bindActionCreators(requestRegister, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    defaultPasscode: {
      dot: ['', '', '', '', '', ''],
      number: '',
    },
    dot: ['', '', '', '', '', ''],
    number: '',
    defaultKey: false,
    modal: false,
    dis: '',
    modal: {
      visible: false
    },
  }

  setNumber = async (obj) => {
    const { navigateAction, root, passcode } = this.props
    const { defaultPasscode } = this.state
    this.setState({ ...obj })

    const data = {
      password: obj.number,
    }
    if (obj.number.length === 6) {
      if (passcode.passcode === data.password) {
        this.props.requestRegister(data, root.access_token)
          .then(res => {
            console.log(res)
            if (res.success) {
              navigateAction({ ...this.props, page: 'condi' })
              AsyncStorage.setItem('access_token', res.result.access_token)
              AsyncStorage.setItem('user_token', res.result.user_token)
            } else if (!res.success) {
              const modal = {
                dis: res.message,
                visible: true,
                onPress: () => this.setState({ modal: { visible: false } })
              }
              return this.setState({ modal })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (passcode.passcode !== data.password) {
        const modal = {
          dis: `รหัสผ่าน(pin) ไม่ตรงกับที่ตั้งไว้\nกรุณากรอกใหม่อีกครั้ง`,
          visible: true,
          onPress: () => this.setState({ modal: { visible: false }, ...defaultPasscode })
        }
        return this.setState({
          modal,
          defaultKey: true
        })
      }
    }
  }

  // onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'passcode' })
  onPrevPage = () => {
    this.props.navigation.goBack()
    this.props.navigateReset({ ...this.props, page: 'passcode' })
  }

  render() {
    const { dot, modal, defaultKey } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{ dot, title: 'ยืนยันรหัสผ่าน', dis: 'กรอกรหัสอีกครั้ง', onPrevPage: this.onPrevPage }}
        />
        <Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
        {
          Modal(modal)
        }
      </Screen>
    )
  }
}