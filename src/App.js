import React from 'react'
import {
  View,
} from 'react-native'
import { TBold } from './component/texts'

export default () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TBold fontSize="30px">{`Welcome To React Native 059.8`}</TBold>
    </View>
  )
}