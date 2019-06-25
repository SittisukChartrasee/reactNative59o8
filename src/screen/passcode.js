import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import { updatePasscode } from '../redux/actions/commonAction'

const defaultPasscode = {
  dot: ['', '', '', '', '', ''],
  number: '',
}

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
    defaultKey: false,
  }

  setNumber = (obj) => {
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      this.props.updatePasscode('passcode', obj.number)
      this.props.navigateAction({
        ...this.props,
        page: 'confirmPasscode'
      })
      this.setState({ ...defaultPasscode, defaultKey: true })
    }
  }

  render() {
    const { dot, defaultKey } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{
            dot,
            title: 'ตั้งรหัสผ่าน',
            dis: 'เพื่อเข้าใช้งานในครั้งถัดไป',
            // onPrevPage: () => this.props.navigation.goBack()
          }}
        />
        <Keyboard setNumber={this.setNumber} defaultKey={defaultKey} />
      </Screen>
    )
  }
}