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
  colorBtn = colors.emerald,
  bgTransparent = false,
  disabled = false,
  style,
}) => (
    <View style={{ marginTop: 16, ...style }} >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          width: '100%',
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 56,
          ...(tran => tran
            ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.white }
            : { backgroundColor: disabled ? colors.smoky : colorBtn }
          )(bgTransparent)
        }}
      >
        {
          IconImage ? (
            <Image
              source={IconImage}
              style={{ width: 33, height: 33, marginRight: 7 }}
            />
          ) : null
        }
        <TBold ml={IconImage ? "14" : "0"} color={colors.white}>{label}</TBold>
      </TouchableOpacity>
    </View>
  )