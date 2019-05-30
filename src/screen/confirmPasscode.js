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
    defaultPasscode: {
      dot: ['', '', '', '', '', ''],
      number: '',
    },
    dot: ['', '', '', '', '', ''],
    number: '',
    defaultKey: false,
    dis: ''
  }

  setNumber = async (obj) => {
    const { navigateAction, root, passcode, updateRoot } = this.props
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
                onPress: () => updateRoot('modal', { visible: false }),
                onPressClose: () => this.props.updateRoot('modal', { visible: false })
              }
              return updateRoot('modal', modal)
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
            updateRoot('modal', { visible: false })
            this.setState({...defaultPasscode})
          },
          onPressClose: () => this.props.updateRoot('modal', { visible: false })
        }
        this.setState({ defaultKey: true })
        return updateRoot('modal', modal)
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