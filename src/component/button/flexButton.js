import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  TBold,
  TLight,
  TMed,
  TSemiBold,
  TText,
  TThin
} from '../texts'
import colors from '../../config/colors';

export default ({
  marginTop=16,
  marginLeft,
  marginRight,
  backgroundColor=colors.emerald,
  border=false,
  onPress=() => alert('need function onPress'),
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor,
      flex: 1,
      marginTop,
      marginLeft,
      marginRight,
      padding: 16,
      borderRadius: 100,
      ...(b => b
          && {
            borderColor: colors.smoky,
            borderWidth: .27,
            backgroundColor: colors.white,
          }
        )(border)
    }}
  >
    <TBold color={border ? colors.grey : colors.white}>{children}</TBold>
  </TouchableOpacity>
)