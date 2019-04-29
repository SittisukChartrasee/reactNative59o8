import React from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import font from '../../config/fonts'
import images from '../../config/images'
import { TLight } from '../texts'
import colors from '../../config/colors'

export default class extends React.Component {
  static defaultProps = {
    onChangeText: () => {},
    field: 'fieldName',
    label: 'label',
  }

  render() {
    const { onChangeText, field, label } = this.props
    return (
      <View style={{ marginTop: 17 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TLight fontSize={14} textAlign="left" color={colors.grey}>{label}</TLight>
          <TouchableOpacity onPress={() => onChangeText({ type: 'modal', field })}>
            <Image source={images.iconinformation} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            height: 40,
            fontFamily: font.sukhumvitBold,
            fontSize: 18
          }}
          onChangeText={value => onChangeText({ value, type: 'Icustom', field })}
          placeholder="ตัวอย่าง JT9-9999999-99"
        />
        <View style={{ height: 1, backgroundColor: colors.smoky }} />
      </View>
    )
  }
}