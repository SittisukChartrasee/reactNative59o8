import React, { useState } from 'react'
import {
  View,
  Button
} from 'react-native'
import { TBold, TText } from './component/texts'
// import DragonLibs from 'react-native-dragon-libs'
// import Dragon from 'dragonlibs'

export default () => {
  const [count, setCount] = useState(0)
  // DragonLibs.sampleMethod('aa', 22, val => console.log(val))
  // console.log(Dragon('aasdfasdfa'))
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <TBold fontSize="30px">{`Welcome To React Native 059.8`} = {count}</TBold>
      <Button title="Counter + " onPress={() => setCount(count + 1)} />
    </View>
  )
}