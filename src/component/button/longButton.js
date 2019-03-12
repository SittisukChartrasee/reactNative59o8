import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'

export default ({
  label="Long button test",
  onPress=() => {}
}) => (
  <View style={{ marginTop: 16 }}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        height: 56,
        backgroundColor: colors.emerald,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 56,
      }}
    >
      <TBold color={colors.white}>{label}</TBold>
    </TouchableOpacity>
  </View>
)