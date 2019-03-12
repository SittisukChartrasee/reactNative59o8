import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'

export default ({
  label="Long button test"
}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 24,
    }}
  >
    <TouchableOpacity
      onPress={() => console.log('ok')}
      style={{
        width: '100%',
        height: 56,
        backgroundColor: colors.emerald,
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