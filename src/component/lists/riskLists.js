import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TLight } from '../texts'

export default ({
  title='title',
  color='red',
  percent='1%'
}, key) => (
  <View key={key}>
    <View style={{ paddingVertical: 6, flexDirection: 'row' }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 13, height: 13, borderRadius: 13/2, backgroundColor: color, marginRight: 8 }}/>
        <TLight>{title}</TLight>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TLight>{percent}%</TLight>
      </View>
    </View>
    <View style={{ height: 1, backgroundColor: colors.smoky }}/>
  </View>
)