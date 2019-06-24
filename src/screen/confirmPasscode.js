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
import { root } from '../redux/actions/commonAction'

const defaultPasscode = {
  dot: ['', '', '', '', '', ''],
  number: '',
}

const mapToProps = ({ root, passcode }) => ({ root, passcode })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  requestRegister: bindActionCreators(requestRegister, dispatch),
  updateRoot: bindActionCreators(root, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
    defaultKey: false,
    dis: ''
  }

  setNumber = (obj) => {
    const { passcode } = this.props
    this.setState({ ...obj })

    const data = {
      password: obj.number,
    }
    if (obj.number.length === 6) {
      if (passcode.passcode === data.password) {
        this.props.requestRegister(data, this.props.root.access_token)
          .then(res => {
            console.log(res)
            if (res.success) {
              this.props.navigateAction({ ...this.props, page: 'condi' })
              AsyncStorage.setItem('access_token', res.result.access_token)
              AsyncStorage.setItem('user_token', res.result.user_token)
            } else if (!res.success) {
              const modal = {
                dis: res.message,
                visible: true,
                onPress: () => this.props.updateRoot('modal', { visible: false }),
                onPressClose: () => this.props.updateRoot('modal', { visible: false })
              }
              return this.props.updateRoot('modal', modal)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (passcode.passcode !== data.password) {
        const modal = {
          dis: `รหัสผ่าน (PIN) ไม่ตรงกับที่ตั้งไว้\nกรุณากรอกใหม่อีกครั้ง`,
          visible: true,
          onPress: () => {
            this.props.updateRoot('modal', { visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          },
          onPressClose: () => {
            this.props.updateRoot('modal', { visible: false })
            this.setState({ ...defaultPasscode, defaultKey: true })
          }
        }
        return this.props.updateRoot('modal', modal)
      }
    }
  }

  // onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'passcode' })
  onPrevPage = () => {
    this.props.navigation.goBack()
  }

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
