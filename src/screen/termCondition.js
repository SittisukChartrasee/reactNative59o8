import React from 'react'
import {
  View
} from 'react-native'
import colors from '../config/colors'
import images from '../config/images'
import { NavBar } from '../component/gradient'

export default class extends React.Component {
  render() {
    return (
      <View>
        <NavBar />
      </View>
    )
  }
}