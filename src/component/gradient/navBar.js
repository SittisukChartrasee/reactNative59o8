import React from 'react'
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TBold, TSemiBold } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

const subString = (string) => {
  return string.length >= 25 ? `${string.slice(0, 25)}...` : string
}


export default ({
  navRight,
  navLeft=<Image source={images.iconback} />,
  title="เงื่อนไขการเปิดบัญชี"
}) => (
  <LinearGradient
    colors={[colors.deepTeal, colors.hunterGreen]} 
    start={{ x: 0, y: 0 }}
    end={{ x: 0.6, y: 0 }}
  >
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          height: 43.5,
          justifyContent: 'center',
          marginHorizontal: 15,
          ...((platform) => platform === 'android' 
            ? { marginTop: 11, marginBottom: 8 } 
            : {}
          )(Platform.OS)
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            { navLeft && navLeft }
          </View>
          <View style={{ flex: 5, alignItems: 'center' }}>
            { title && <TSemiBold style={{ color: colors.white }}>{subString(title)}</TSemiBold> }
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {  navRight && navRight }
          </View>
        </View>
      </View>
    </SafeAreaView>
  </LinearGradient>
)