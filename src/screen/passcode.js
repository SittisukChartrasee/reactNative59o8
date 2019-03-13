import React from 'react'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadSpace } from '../component/headSpace'

export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    const { navigation } = this.props
    this.setState({ ...obj })

    if (obj.number.length === 6) {
      navigation.navigate('confirmPasscode')
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