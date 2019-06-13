import React from 'react'
import { AsyncStorage } from 'react-native'
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
  }

  setNumber = obj => {
    const userToken = this.props.navigation.getParam('userToken', '')
    this.setState({
      dot: obj.dot,
      number: obj.number
    })

    if (obj.number.length === 6) {
      containerQuery(this.props.client, {
        query: getStatus,
      }, async val => {
        switch (val.data.getStatus) {
          case 'Approved':
            const res = await this.props.requestLogin({ userToken, password: obj.number })
            if (res && res.result) {
              AsyncStorage.setItem('access_token', res.result.access_token)
              this.props.navigateAction({ ...this.props, page: 'confirmAccount' })
            }
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
            this.props.navigateAction({ ...this.props, page: 'statusApprove', params: { status: 'reject' } })
            break
        }
        
      })
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
            onPrevPage: () => this.props.navigation.goBack(),
            forgetbtn: () => this.props.navigateAction({ ...this.props, page: 'forgetPasscode' })
          }}
        />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}