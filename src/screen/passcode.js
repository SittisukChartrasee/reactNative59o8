import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { updatePasscode } from '../redux/actions/commonAction'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updatePasscode: bindActionCreators(updatePasscode, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      this.props.updatePasscode('passcode', obj.number)
      this.props.navigateAction({
        ...this.props,
        page: 'confirmPasscode'
      })
    }
  }

  render() {
    const { dot } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{ dot, title: 'ตั้งรหัสผ่าน', dis: 'เพื่อเข้าใช้งานในครั้งถัดไป' }}
        />
        <Keyboard setNumber={this.setNumber} />
      </Screen>
    )
  }
}