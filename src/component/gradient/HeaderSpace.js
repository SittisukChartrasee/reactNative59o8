import React from 'react'
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TSemiBold, TLight } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

const dotComponent = ({
  dot=['','','','','','']
}) => (
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
)

export const HeadPassCode = ({
  title="Test title",
  dis,
  dot,
  forgetbtn,
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
    <TSemiBold color={colors.white} fontSize={28}>{title}</TSemiBold>
    { dis && <TLight color={colors.smoky} fontSize={16}>{dis}</TLight> }
    { dotComponent({ dot }) }

    {
      forgetbtn && typeof forgetbtn === 'function' && (
        <TouchableOpacity
          onPress={forgetbtn}
          style={{
            position: 'absolute',
            bottom: 40,
          }}
        >
          <TSemiBold 
            style={{ textDecorationLine: 'underline', textDecorationColor: 'white' }}
            color={colors.smoky}
          >
            ลืมรหัส
          </TSemiBold>
        </TouchableOpacity>
      )
    }
    
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