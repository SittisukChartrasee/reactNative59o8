import React from 'react'
import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { requestLogin } from '../redux/actions/root-active'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestLogin: bindActionCreators(requestLogin, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = async obj => {
    const userToken = this.props.navigation.getParam('userToken', '')
    this.setState({
      dot: obj.dot,
      number: obj.number
    })

    if (obj.number.length === 6) {
      const res = await this.props.requestLogin({ userToken, password: obj.number })
      if (res && res.result) {
        AsyncStorage.setItem('access_token', res.result.access_token)
        this.props.navigateAction({ ...this.props, page: 'checkpoint' })
      }
    }
  }
  
  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{
            dot,
            title: 'ใส่รหัส Passcode',
            onPrevPage: () => this.props.navigation.goBack(),
            forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
          }}
        />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}