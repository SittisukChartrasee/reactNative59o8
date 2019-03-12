import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../../component/texts'
import images from '../../config/images'

export default () => (
  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
    <TouchableOpacity
      onPress={() => console.log('ok')}
      style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 20 }}
    >
      {/* <Image source={images.} */}
    </TouchableOpacity>
  </View>
)