import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { headerotp } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import colors from '../config/colors'
import { TLight, TBold, TMed } from '../component/texts'
import images from '../config/images'
import { velidateOtp } from '../redux/actions/root-active'

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  velidateOtp: bindActionCreators(velidateOtp, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: [false, false, false, false, false, false],
    number: '',
    currentDot: '',
  }
  
  setNumber = async (obj) => {
    const { navigateAction, root } = this.props
    const data = {
      trans_id: root.trans_id,
      ref_no: root.ref_no,
      phone_no: root.phone_no,
      secret: obj.number,
    }

    this.setState({ ...obj })
    obj.dot.map(d => d && this.delayDot(d))

    if (obj.number.length === 6) {
      const res = await this.props.velidateOtp(data)
      if (res.success) {
        navigateAction({ ...this.props, page: 'passcode' })
      }
    }
  }

  delayDot = (number) => {
    this.setState({ currentDot: number })
    setTimeout(() => {
      this.setState({ currentDot: '•' })
    }, 500)
  }

  onPress = () => {
    this.props.navigation.goBack()
  }
  
  render() {
    const { ref_no } = this.props.root
    return (
      <Screen>
        {
          headerotp({
            ...this.state,
            start: 180,
            refNo: ref_no || null,
            onPress: this.onPress,
          })
        }
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}