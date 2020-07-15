import React, { useState } from 'react'
import {
  View,
  Button
} from 'react-native'
import { TBold, TText } from './component/texts'
import Picker from './component/input/inputPickerExpire'
import DeviceInfo from 'react-native-device-info'
// import DragonLibs from 'react-native-dragon-libs'
// import Dragon from 'dragonlibs'

export default () => {
  const [count, setCount] = useState(0)
  // DragonLibs.sampleMethod('aa', 22, val => console.log(val))
  // console.log(Dragon('aasdfasdfa'))
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <TBold fontSize="30px">{`Welcome To React Native 059.8`} = {count}</TBold>
        <Button title="Counter + " onPress={() => setCount(count + 1)} />
        <Button title="Clear" onPress={() => setCount(0)} />
      </View>
      {/* <Picker /> */}
      <View style={{ backgroundColor: 'gray', flex: 1, alignItems: 'flex-start' }}>
        <TBold>- deviceId: {DeviceInfo.getDeviceId()}</TBold>
        <TBold>- getUniqueId: {DeviceInfo.getUniqueID()}</TBold>
        <TBold>- brand: {DeviceInfo.getManufacturer()}</TBold>
      </View>
    </View>
  )
}