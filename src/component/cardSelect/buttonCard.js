import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';
import { TBold } from '../texts'


export default ({
  handleInput=() => {},
  image=undefined,
  label='label',
  type='type'
}) => (
  <TouchableOpacity
    onPress={() => handleInput({ value: label, type })}
    style={{
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.smoky,
      paddingVertical: 24,
      paddingHorizontal: 16,
      flexDirection: 'row',
    }}
  >
    { image && <Image source={image} style={{ width: 47, height: 47 }} resizeMode="cover"/> }
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <TBold textAlign="left" ml={10}>{label}</TBold>
      <Image source={images.iconNextPageBlack} />
    </View>
  </TouchableOpacity>
)