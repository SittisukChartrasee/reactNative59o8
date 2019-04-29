import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { headerotp } from '../component/headSpace'
import { navigateAction } from '../redux/actions'
import colors from '../config/colors'
import { TLight, TBold, TMed } from '../component/texts';
import images from '../config/images';

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: [false, false, false, false, false, false],
    number: '',
    currentDot: '',
  }
  
  setNumber = (obj) => {
    const { navigateAction } = this.props
    this.setState({ ...obj })

    obj.dot.map(d => d && this.delayDot(d))
    if (obj.number.length === 6) {
      navigateAction({ ...this.props, page: 'passcode' })
    }
  }

  delayDot = (number) => {
    this.setState({ currentDot: number })
    setTimeout(() => {
      this.setState({ currentDot: '•' })
    }, 500)
  }

  onPress = () => {
    console.log('kok')
  }
  
  render() {
    return (
      <Screen>
        {
          headerotp({
            ...this.state,
            start: 60,
            end: 59,
            onPress: this.onPress,
          })
        }
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}