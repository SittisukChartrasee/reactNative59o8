import React from 'react'
import { Platform } from 'react-native'
import PropsType from 'prop-types'
import styled from 'styled-components/native'
import { TextInputMask } from 'react-native-masked-text'
import colors from '../../config/colors'
import { TextField } from 'react-native-material-textfield'
import fonts from '../../config/fonts'


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
    value: '',
  }

  state = {
    value: this.props.value,
  }

  handleInput = (value) => {
    const { handleInput, field } = this.props
    this.setState({ value })
    handleInput({ value, type: 'mask', field })
  }

  render() {
    const {
      maskingOptions,
      handleInput,
      option,
      label,
      field,
      err
    } = this.props
    const { value } = this.state
    return (
      <TextInputMask
        type={'custom'}
        options={{
          mask: option,
        }}
        customTextInput={TextField}
        customTextInputProps={{
          ref: ref => ref && this.props.refFunc && this.props.refFunc(ref),
          returnKeyType: this.props.returnKeyType,
          onSubmitEditing: this.props.onSubmitEditing,
          keyboardType: this.props.keyboardType || 'default',
          label,
          error: err,
          value,
          autoComplete: "off",
          autoCapitalize: "none",
          style:
            [
              { fontFamily: fonts.sukhumvitBold, color: colors.hunterGreen },
              this.props.label === '' && { fontSize: this.props.fs, textAlign: 'center' },
              { ...this.props.styled },
            ],
          labelTextStyle: { fontFamily: fonts.sukhumvitLight, fontSize: 100 },
          titleTextStyle: { fontFamily: fonts.sukhumvitLight },
          tintColor: colors.grey,
          baseColor: colors.grey,
          titleFontSize: 12,
          labelFontSize: this.props.labelFontSize !== undefined ? 20 : 14,
          activeLineWidth: this.props.activeLineWidth !== undefined ? 0 : 2,
          fontSize: 18,
          onChangeText: this.handleInput,
          height: "100%",
          autoCorrect: false,
          autoComplete: "off",
          autoCapitalize: "none"
        }}
        value={value}
        onChangeText={this.handleInput}
      />
    )
  }
}