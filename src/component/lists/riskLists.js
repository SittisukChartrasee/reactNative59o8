import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TLight } from '../texts'

export default ({
  nameTH='title',
  color='red',
  weight='1%'
}, key) => (
  <View key={key}>
    <View style={{ paddingVertical: 6, flexDirection: 'row' }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 13, height: 13, borderRadius: 13/2, backgroundColor: color, marginRight: 8 }}/>
        <TLight>{nameTH}</TLight>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TLight>{weight}%</TLight>
      </View>
    </View>
    <View style={{ height: 1, backgroundColor: colors.smoky }}/>
  </View>
)