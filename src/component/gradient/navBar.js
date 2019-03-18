import React from 'react'
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
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
  navLeft=(
    <TouchableOpacity onPress={() => {}}>
      <Image source={images.iconback} />
    </TouchableOpacity>
  ),
  title="navBar title",
  color,
}) => (
  <LinearGradient
    colors={color ? [color, color] : [colors.deepTeal, colors.hunterGreen]} 
    start={{ x: 0, y: 0 }}
    end={{ x: 0.6, y: 0 }}
  >
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          height: 51.5,
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
            { title && <TBold color={colors.white}>{subString(title)}</TBold> }
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {  navRight && navRight }
          </View>
        </View>
      </View>
    </SafeAreaView>
  </LinearGradient>
)