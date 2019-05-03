import React from 'react'
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { Camera } from '../../component/camera'
import colors from '../../config/colors'
import { TLight, TBold } from '../../component/texts'
import images from '../../config/images'

export default class extends React.Component {
  state = {
    photo: '',
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
        {
          this.state.photo
            ? (
              <View style={{ flex: 1, backgroundColor: colors.midnight }}>
                <View style={{ flex: 1, marginHorizontal: 32, marginTop: 48 }}>
                  <Image source={{ uri: this.state.photo }} style={{ flex: 1 }} />
                </View>
                <View style={{ paddingTop: 51, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => this.setState({ photo: '' })} style={{ backgroundColor: colors.white, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50 }}>
                    <TBold color={colors.grey}>ถ่ายใหม่</TBold>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: colors.emerald, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50 }}>
                    <TBold color={colors.white}>ยืนยัน</TBold>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
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
                  handleInput={photo => this.setState({ photo: photo.uri })}
                />
              </View>
            )
        }
        
      </SafeAreaView>
    )
  }
}