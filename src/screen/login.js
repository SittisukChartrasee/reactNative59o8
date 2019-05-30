import React from 'react'
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

  setNumber = (obj) => {
    const userToken = this.props.navigation.getParam('userToken', '')
    const accessToken = this.props.navigation.getParam('accessToken', '')
    this.setState({
      dot: obj.dot,
      number: obj.number
    })

    if (obj.number.length === 6) {
      // console.log(userToken, obj.number, accessToken)
      const res = this.props.requestLogin({ userToken, password: obj.number }, accessToken)
      console.log(res, userToken, obj.number, accessToken)
      // navigateAction({ ...this.props, page: 'checkpoint' })
    }
  }


  // {
  //   "password":"999666",
  //   "user_token": "c7d04715-7f30-45c4-888d-5772411b14ce"
  //  }
  
  render() {
    const { dot, number } = this.state

    // const token = this.props.navigation.getParam('userToken', '')
    // console.log(token)
    return (
      <Screen>
        <HeadSpace
          {...{
            dot,
            title: 'ใส่รหัส Passcode',
            forgetbtn: () => alert('forget password')
          }}
        />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}