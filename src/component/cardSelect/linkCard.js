import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';
import { TBold, TLight } from '../texts'

export default ({
  onChangeText=() => {},
  image=undefined,
  label='label',
  type='type',
  active=false,
}) => (
  <TouchableOpacity
    onPress={() => onChangeText({ value: label, type })}
    disabled={active}
    style={{
      borderRadius: 10,
      backgroundColor: active ? colors.emerald : colors.white,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: active ? 0 : 8,
        borderBottomRightRadius: active ? 0 : 8,
        borderColor: 'transparent',
        paddingVertical: 24,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white
      }}
    >
      { image && <Image source={image} style={{ width: 47, height: 47 }} resizeMode="cover"/> }
      <TBold textAlign="left" ml={10}>{label}</TBold>
    </View>
      { active
        ? <Image source={images.stroke1} style={{ marginHorizontal: 16 }}/>
        : <Image source={images.iconNextPageBlack} style={{ marginHorizontal: 16 }}/>
      }
  </TouchableOpacity>
)
