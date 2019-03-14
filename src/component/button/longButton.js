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
  colorBtn=colors.emerald,
  bgTransparent=false,
  style,
}) => (
  <View style={{ marginTop: 16, ...style }}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 56,
        ...(tran => tran 
          ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.white } 
          : { backgroundColor: colorBtn }
        )(bgTransparent)
      }}
    >
      <TBold color={colors.white}>{label}</TBold>
    </TouchableOpacity>
  </View>
)