import React from 'react'
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'
import images from '../../config/images'

export default ({
  label = "Long button test",
  IconImage = "",
  onPress = () => { },
  disabled = false,
  style,
}) => (
    <View style={{ ...style }} >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}
      >
        {
          IconImage ? (
            <Image source={images.iconCameraRefresh} style={{ width: 19, height: 19 }} />
          ) : null
        }
        <TBold ml={IconImage ? "16" : "0"} color={colors.white}>{label}</TBold>
      </TouchableOpacity>
    </View>
  )