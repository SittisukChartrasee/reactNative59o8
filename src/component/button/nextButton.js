import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../../component/texts'
import images from '../../config/images'

export default ({
  label="ต่อไป",
  disabled=false,
  onPress=() => {},
}) => (
  <View style={{ position: 'absolute', right: 20, bottom: 20 }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <TBold fontSize="16" mr="10">{label}</TBold>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{ 
          width: 40,
          height: 40,
          backgroundColor: disabled ? colors.smoky :colors.emerald,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image source={images.nextArrow} />
      </TouchableOpacity>
    </View>
  </View>
)