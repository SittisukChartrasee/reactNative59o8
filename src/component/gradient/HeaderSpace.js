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

export const dotComponent = ({
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
  labelBtn="ลืมรหัส",
  dis,
  dot,
  forgetbtn,
  children=({ dot }) => dotComponent({ dot })
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
    { children({ dot }) }

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
            {labelBtn}
          </TSemiBold>
        </TouchableOpacity>
      )
    }
    
  </View>
)
