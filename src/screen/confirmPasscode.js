import React from 'react'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadPassCode } from '../component/gradient/HeaderSpace'

export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    const { navigation } = this.props
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      navigation.navigate('login')
    }
  }
  
  render() {
    const { dot, number } = this.state
    return (
      <Screen>
        <HeadPassCode {...{ dot, title: 'ยืนยันรหัส Passcode', dis: 'กรอกรหัสอีกครั้ง' }} />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}