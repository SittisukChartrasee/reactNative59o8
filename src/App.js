import React from 'react'
import {
  View,
} from 'react-native'
import { TBold, TText } from './component/texts'
import DragonLibs from 'react-native-dragon-libs'
import Dragon from 'dragonlibs'

export default () => {
  DragonLibs.sampleMethod('aa', 22, val => console.log(val))
  console.log(Dragon('aasdfasdfa'))
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <TBold fontSize="30px">{`Welcome To React Native 059.8`}</TBold>
    </View>
  )
}