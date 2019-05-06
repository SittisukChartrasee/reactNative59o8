import React from 'react'
import {
  AsyncStorage,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { requestRegister } from '../redux/actions/root-active'

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestRegister: bindActionCreators(requestRegister, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = async (obj) => {
    const { navigateAction, root } = this.props
    this.setState({ ...obj })

    const data = {
      password: obj.number,
    }

    if (obj.number.length === 6) {
      const res = await this.props.requestRegister(data, root.access_token)
      console.log(res)
      if (res.success) {
        navigateAction({ ...this.props, page: 'condi' })
        AsyncStorage.setItem('access_token', res.result.access_token)
        AsyncStorage.setItem('user_token', res.result.user_token)
      }
    }
  }
  
  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadSpace {...{ dot, title: 'ยืนยันรหัส Passcode', dis: 'กรอกรหัสอีกครั้ง' }} />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}