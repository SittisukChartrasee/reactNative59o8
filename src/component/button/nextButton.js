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
  onPress=() => {},
}) => (
  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <TBold fontSize="16" mr="10">{label}</TBold>
      <TouchableOpacity
        onPress={onPress}
        style={{ 
          width: 40,
          height: 40,
          backgroundColor: colors.emerald,
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