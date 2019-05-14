import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import { updatePasscode } from '../redux/actions/commonAction'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  updatePasscode: bindActionCreators(updatePasscode, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    const { navigateAction, updatePasscode } = this.props
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      updatePasscode('passcode', obj.number)
      navigateAction({
        ...this.props,
        page: 'confirmPasscode'
      })
    }
  }

  onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'otp' })

  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{ dot, title: 'ตั้งรหัสผ่าน', dis: 'เพื่อเข้าใช้งานในครั้งถัดไป', onPrevPage: this.onPrevPage }}
        />
        <Keyboard setNumber={this.setNumber} />
      </Screen>
    )
  }
}