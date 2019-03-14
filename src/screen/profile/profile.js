import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'

export default class extends React.Component {
  render() {
    return (
      <Screen color="transparent">
        <NavBar title="ข้อมูลส่วนตัว" />

        <ScrollView>
          <Input />
        </ScrollView>
      </Screen>
    )
  }
}