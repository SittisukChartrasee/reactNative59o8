import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';
import { TBold, TLight } from '../texts'

const handleNumberBank = (number) => number.slice(5, 9)

export default ({
  onChangeText=() => {},
  image=undefined,
  label='label',
  type='type',
  active=false,
  disabled=false,
  number=undefined,
}) => (
  <TouchableOpacity
    onPress={() => onChangeText({ value: label, type })}
    disabled={disabled}
    style={{
      borderWidth: active ? 2 : 1,
      borderRadius: 10,
      borderColor: active ? colors.emerald : colors.smoky,
      backgroundColor: active ? colors.emerald : 'transparent',
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
      { number 
        ? <View>
            <TLight textAlign="left" ml={10}>{label}</TLight>
            <TLight textAlign="left" ml={10}>XXX-X-X{handleNumberBank(number)}-X</TLight>
          </View>
        : <TBold textAlign="left" ml={10}>{label}</TBold>
      }
    </View>
    { active && <Image source={images.stroke1} style={{ marginHorizontal: 16 }}/> }
  </TouchableOpacity>
)
