import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import TextField from './inputDefaultMatiral'
import { TextInputMask } from 'react-native-masked-text'
import font from '../../config/fonts'
import images from '../../config/images'
import { TLight } from '../texts'
import colors from '../../config/colors'
import Imaterial from './inputDefaultMatiral'


export default class extends React.Component {
  static defaultProps = {
    type: 'custom',
    editable: false,
    maskingOptions: { precision: 0, delimiter: ',', separator: '.' },
    valifie: false,
    option: "999 AAA SSS ***",
    value: '',
  }

  state = {
    value: this.props.value,
    placeholder: 'ตัวอย่าง JT9-9999999-99'
  }

  handleInput = (value) => {
    const { handleInput, field } = this.props
    this.setState({ value: value.toUpperCase() })
    handleInput({ value, type: 'Icustom', field })
  }

  render() {
    const { handleInput, field, label, err, option } = this.props
    return (
      <View style={{ marginTop: 17 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -25, zIndex: 3 }}>
          <TLight fontSize={14} textAlign="left" color={err ? 'red' : colors.grey}>{label}</TLight>
          <TouchableOpacity onPress={() => handleInput({ type: 'modal', field })}>
            <Image source={images.iconinformation} style={{ ...(err => err && ({ tintColor: 'red' }))(err) }} />
          </TouchableOpacity>
        </View>
        <TextInputMask
          type={'custom'}
          options={{
            mask: option,
          }}
          placeholder={this.state.placeholder}
          customTextInput={TextField}
          customTextInputProps={{
            err,
            label: '',
            styled: { textAlign: 'left', }
          }}
          value={this.state.value}
          onChangeText={this.handleInput}
        />
      </View>
    )
  }
}