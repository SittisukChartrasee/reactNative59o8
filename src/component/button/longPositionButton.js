import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'

export default ({
  label="Long button test",
  onPress=() => {},
  disabled=false,
}) => (
  <View
    style={{
      backgroundColor: 'white',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 24,
      paddingHorizontal: 24,
    }}
  >
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: '100%',
        height: 56,
        backgroundColor: disabled ? colors.smoky :colors.emerald,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        borderRadius: 56,
      }}
    >
      <TBold color={colors.white}>{label}</TBold>
    </TouchableOpacity>
  </View>
)