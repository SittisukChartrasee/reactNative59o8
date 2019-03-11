import React from 'react'
import {
  View
} from 'react-native'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { HeadPassCode } from '../component/gradient/HeaderSpace'

export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  setNumber = (obj) => {
    this.setState({ ...obj })
  }
  
  render() {
    const { dot, number } = this.state
    const ForHead = { dot }
    return (
      <Screen>
        <HeadPassCode {...ForHead} />
        <Keyboard setNumber={this.setNumber}/>
      </Screen>
    )
  }
}