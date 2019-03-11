import React from 'react'
import {
  View,
  Image,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TBold, TSemiBold, TLight } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

export const HeadPassCode = ({
  dot=['','','','','','']
}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    }}
  >
    <TSemiBold color={colors.white} fontSize={28}>ตั้งรหัส Passcode</TSemiBold>
    <TLight color={colors.smoky} fontSize={16}>เพื่อเข้าใช้งานในครั้งถัดไป</TLight>
    <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'space-around' }}>
      {
        dot.map((d, key) => (
          <View key={key}>
            {
              d
                ? <View style={{ backgroundColor: colors.white, width: 16, height: 16, borderRadius: 8, marginLeft: key === 0 ? 0 : 24 }} />
                : <View style={{ borderColor: colors.grey, borderWidth: 1, width: 16, height: 16, borderRadius: 8, marginLeft: key === 0 ? 0 : 24 }} />
            }
          </View>
        ))
      }
    </View>
  </View>
)

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