import React from 'react'
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TText, TSemiBold, TLight } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

export default ({
  dot=['','','','','','']
}) => (
  <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'space-around' }}>
    {
      dot.map((d, key) => (
        <View key={key}>
          {
            d
              ? <View style={{ backgroundColor: colors.white, width: 16, height: 16, borderRadius: 8, marginLeft: key === 0 ? 0 : 24 }} />
              : <View style={{ borderColor: colors.grey, borderWidth: 1, width: 16, height: 16, borderRadius: 8, marginLeft: key === 0 ? 0 : 24 }} />
          }
        </View>
      ))
    }
  </View>
)