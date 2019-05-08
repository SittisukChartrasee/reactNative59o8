import React from 'react'
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import TextField from './inputDefaultMatiral'
import font from '../../config/fonts'
import images from '../../config/images'
import { TLight } from '../texts'
import colors from '../../config/colors'

export default class extends React.Component {
  static defaultProps = {
    handleInput: () => {},
    field: 'fieldName',
    label: 'label',
    err: '',
    value: '',
  }

  render() {
    const { handleInput, field, label, err } = this.props
    return (
      <View style={{ marginTop: 17 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -25, zIndex: 3 }}>
          <TLight fontSize={14} textAlign="left" color={err ? 'red' :colors.grey}>{label}</TLight>
          <TouchableOpacity onPress={() => handleInput({ type: 'modal', field })}>
            <Image source={images.iconinformation} style={{ ...(err => err && ({ tintColor: 'red' }))(err) }}/>
          </TouchableOpacity>
        </View>
        <TextField
          label=''
          styled={{
            textAlign: 'left',
          }}
          err={err}
          value={this.props.value}
          onChangeText={value => handleInput({ value, type: 'Icustom', field })}
          placeholder="ตัวอย่าง JT9-9999999-99"
        />
      </View>
    )
  }
}