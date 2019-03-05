import React from 'react'
import {
  View,
  Image,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TBold, TSemiBold } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

export default class extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={[colors.darkSage, colors.hunterGreen, colors.black]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 0 }}
        locations={[0, 1, 1]}
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          paddingTop: 64, 
          paddingBottom: 45,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <View>
          <Image source={images.kmyfundLogo} />
          <TSemiBold fontSize={20} color={colors.white} mt="30">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TSemiBold>
        </View>
      </LinearGradient>
    )
  }
}