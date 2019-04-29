import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';
import TextInput from '../input/inputDefaultMatiral'
import { TBold } from '../texts';

export default ({
  label='label',
  active=false,
  value='',
  onPress=() => {},
  onChangeText=() => {}
}) => (
  <View>
    <TouchableOpacity onPress={() => onPress({ label, active })}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginVertical: 16 }}>
        <TBold textAlign="left">{label}</TBold>
        { active && <Image source={images.stroke1} style={{ tintColor: colors.emerald }} /> }
      </View>
      { label !== 'อื่นๆ'
        ? <View style={{ height: 1, marginLeft: 24, backgroundColor: colors.smoky }} />
        : active && (
          <View style={{ marginHorizontal: 24, marginBottom: 33, marginTop: -20 }}>
            <TextInput label="โปรดระบุแหล่งเงินทุน" onChangeText={onChangeText} value={value} />
          </View>
        )
      }
    </TouchableOpacity>
  </View>
)