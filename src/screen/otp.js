import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace, lineotpComponent } from '../component/headSpace'
import { navigateAction } from '../redux/actions'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: [false, false, false, false, false, false],
    number: '',
  }

  setNumber = (obj) => {
    const { navigateAction } = this.props
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      navigateAction({ ...this.props, page: 'passcode' })
    }
  }
  
  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadSpace
          {...{
            dot,
            title: 'กรอกหมายเลข OTP',
            labelBtn: 'ส่งรหัส OTP อีกครั้ง',
            dis: 'รหัสอ้างอิง : KaS4TEd',
            forgetbtn: () => alert('resent OTP'),
            component: lineotpComponent,
          }}
        />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}