import React from 'react'
import {
  View,
  Image,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TBold } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

const subString = (string) => {
  return string.length >= 25 ? `${string.slice(0, 25)}...` : string
}


export const NavBar = ({
  navRight,
  navLeft=<Image source={images.iconback} />,
  title="เงื่อนไขการเปิดบัญชี"
}) => (
  <LinearGradient
    colors={[colors.darkSage, colors.hunterGreen, colors.black]} 
    start={{ x: 0, y: 0 }}
    end={{ x: 0.6, y: 0 }}
    locations={[0, 1, 1]}
  >
    <StatusBar barStyle="light-content" />
    <View
      style={{
        height: 43.5,
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 15,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          { navLeft && navLeft }
        </View>
        <View style={{ flex: 5, alignItems: 'center' }}>
          { title && <TBold style={{ color: colors.white }}>{subString(title)}</TBold> }
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {  navRight && navRight }
        </View>
      </View>
    </View>
  </LinearGradient>
)