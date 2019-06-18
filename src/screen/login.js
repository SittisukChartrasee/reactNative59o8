import React from 'react'
import { AsyncStorage, NativeModules } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { requestLogin } from '../redux/actions/root-active'
import { containerQuery, getStatus } from '../containers/query'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  requestLogin: bindActionCreators(requestLogin, dispatch)
})
@connect(mapToProps, dispatchToProps)
@withApollo
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
    countPassFail: 0
  }

  setNumber = async obj => {
    const userToken = await AsyncStorage.getItem('user_token')
    this.setState({
      dot: obj.dot,
      number: obj.number
    })

    if (obj.number.length === 6) {
      const res = await this.props.requestLogin({ userToken, password: obj.number })

      console.log(res)
      if (res && res.result) {
        AsyncStorage.setItem('access_token', res.result.access_token)
        containerQuery(
          this.props.client,
          { query: getStatus },
          this.onHandleChooseScreen
        )
      }
      if (res && res.success === false) {
        this.setState({ countPassFail: this.state.countPassFail + 1 }, () => {
          if (this.state.countPassFail > 3) this.props.navigateAction({ ...this.props, page: 'lockUser' })
        })
      }
    }
  }

  onHandleChooseScreen = val => {
    switch (val.data.getStatus) {
      case 'Approved':
        this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
        break

      case 'InProgress':
        this.props.navigateAction({ ...this.props, page: 'checkpoint' })
        break

      case 'WaitingApprove':
        this.props.navigateAction({ ...this.props, page: 'waiting' })
        break

      case 'Editing':
        this.props.navigateAction({ ...this.props, page: 'softReject' })
        break
    
      default: // Rejected
        this.props.navigateAction({ ...this.props, page: 'statusApprove', params: { status: 'Rejected' } })
        break
    }
  }
  
  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{
            dot,
            title: 'กรุณากรอกรหัสผ่าน',
            onPrevPage: () => NativeModules.KMyFundOnboarding.finishActivity(),
            forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
          }}
        />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}