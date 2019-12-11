import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';
import { TBold, TLight } from '../texts'
import { handleFontSize } from '../../utility/helper'

const handleNumberBank = (number) => number.slice(5, 9)
const { height: heightScreen } = Dimensions.get('window')

export default ({
  handleInput = () => { },
  image = undefined,
  label = 'label',
  type = 'type',
  active = false,
  disabled = false,
  number = undefined,
  subLabel = undefined,
  color = colors.grey,
  icon = undefined,
  selected = ""
}) => (
    <TouchableOpacity
      onPress={() => handleInput({ value: label, type, selected })}
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
          paddingVertical: 16,
          paddingLeft: 16,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: colors.white,
        }}
      >
        {image && <Image source={image} style={{ width: 47, height: 47 }} resizeMode="cover" />}
        {subLabel ?
          number ?
            <View style={{ flex: 3 }}>
              <TLight textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>{label}</TLight>
              <TLight textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>XXX-X-X{handleNumberBank(number)}-X</TLight>
            </View>
            : <View style={{ flex: 3 }}>
              <TBold textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>{label}</TBold>
              <TLight textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)} color={color}>{subLabel}</TLight>
            </View>
          : number ?
            <View style={{ flex: 3 }}>
              <TLight textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>{label}</TLight>
              <TLight textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>XXX-X-X{handleNumberBank(number)}-X</TLight>
            </View>
            : <View style={{ flex: 3 }}>
              <TBold textAlign="left" ml={10} fontSize={handleFontSize(heightScreen)}>{label}</TBold>
            </View>
        }
        {icon ?
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
            <Image source={images.iconNextPageBlack} style={{ width: 22, height: 22, marginRight: 16 }} resizeMode="cover" />
          </View>
          : null
        }
      </View>
      {active && <Image source={images.stroke1} style={{ marginHorizontal: 16 }} />}
    </TouchableOpacity>
  )
