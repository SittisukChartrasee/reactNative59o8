import React from 'react'
import {
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native'
import { Camera } from '../../component/camera'
import colors from '../../config/colors'
import { TLight } from '../../component/texts'
import images from '../../config/images'

export default class extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        <View style={{ height: 56, flexDirection: 'row' }}>
          <TouchableHighlight style={{ flex: .2, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={images.iconback} />
          </TouchableHighlight>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TLight fontSize={16} color={colors.white}>{`กรุณาถ่ายรูปบัตรประชาชน\nคู่กับใบหน้า ตามรอยเส้นประ`}</TLight>
          </View>
          <View style={{ flex: .2 }} />
        </View>
        <Camera
          switchCamera
          filter={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={images.iconFIllterCameraBack} style={{ marginTop: 12 }} />
            </View>
          }
        />
      </SafeAreaView>
    )
  }
}