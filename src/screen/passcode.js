import React from 'react'
import {} from 'react-native'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'

export default class extends React.Component {
  render() {
    return (
      <Screen>
        <Keyboard />
      </Screen>
    )
  }
}