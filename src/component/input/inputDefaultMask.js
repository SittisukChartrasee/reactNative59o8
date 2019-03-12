import React from 'react'
import { Platform } from 'react-native'
import PropsType from 'prop-types'
import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'
import Imaterial from './inputDefaultMatiral'
import colors from '../../config/colors'

const TextMask = styled(TextInputMask)`
  borderBottomWidth: ${props => (props.checkField ? '1' : '2')};
  paddingTop: 5;
  paddingBottom: 5;
  paddingLeft: 5;
  paddingRight: 5;
  borderBottomColor: ${props => (props.checkField ? colors.hunterGreen : 'red')};
  color: ${colors.emerald};
  textAlign: center;
  fontSize: ${props => props.fs || '16'};
`

export default class extends React.Component {
  static defaultProps = {
    type: 'custom',
    editable: false,
    placeholder: 'x-xxxx-xxxxx-xx-x',
    maskingOptions: { precision: 0, delimiter: ',', separator: '.' },
    valifie: false,

    option: "999 AAA SSS ***",
    label: 'label',
  }

  state = {
    text: '',
  }

  render() {
    const {
      maskingOptions,
      onChangeText,
      value,
      option,
      label
    } = this.props
    return (
      <TextMask
        type={'custom'}
        options={{
          mask: option
        }}
        customTextInput={Imaterial}
        customTextInputProps={{
          label,
        }}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    )
  }
}



// const {
//   value, maskingOptions, type, fs, editable, placeholder, valifie,
// } = this.props
// const extendedMaskingOptions = {
//   precision: 0, delimiter: ',', separator: '.', ...maskingOptions,
// }

// fs={fs}
// style={Platform.OS === 'android' && { borderBottomColor: 'white' }}
// innerRef={(ref) => { this.myDateText = ref }}
// editable={editable}
// type={type}
// value={value}
// checkField={valifie ? (value.length === 13 && value.length > 13) : true}
// options={extendedMaskingOptions}
// value={value}
// onChangeText={this.onChangeTextInput}
// placeholder={placeholder}
// autoCorrect={false}
// autoComplete="off"
// autoCapitalize="none"
// {...this.props}