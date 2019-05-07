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
    handleInput: () => {},
    field: 'fieldName',
    label: 'label',
    value: '',
  }

  render() {
    const { handleInput, field, label } = this.props
    return (
      <View style={{ marginTop: 17 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TLight fontSize={14} textAlign="left" color={colors.grey}>{label}</TLight>
          <TouchableOpacity onPress={() => handleInput({ type: 'modal', field })}>
            <Image source={images.iconinformation} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            height: 45,
            fontFamily: font.sukhumvitBold,
            fontSize: 18
          }}
          value={this.props.value}
          onChangeText={value => handleInput({ value, type: 'Icustom', field })}
          placeholder="ตัวอย่าง JT9-9999999-99"
        />
        <View style={{ height: 1, backgroundColor: colors.smoky }} />
      </View>
    )
  }
}