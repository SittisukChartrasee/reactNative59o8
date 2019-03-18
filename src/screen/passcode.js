import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    const { navigation } = this.props
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      navigateAction({ ...this.props, page: 'confirmPasscode' })
    }
  }
  
  render() {
    const { dot, number } = this.state

    return (
      <Screen>
        <HeadSpace {...{ dot, title: 'ตั้งรหัส Passcode', dis: 'เพื่อเข้าใช้งานในครั้งถัดไป' }} />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}