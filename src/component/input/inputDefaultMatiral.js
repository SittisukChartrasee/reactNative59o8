import React from 'react'
import PropsType from 'prop-types'
import { TextField } from 'react-native-material-textfield'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

const lineInput = editable => (editable ? 1 : 0)

export default class extends React.PureComponent {
  static defaultProps = {
    label: 'label',
    fs: 16,
    styled: {},
    handleInput: () => {},
    onChangeText: () => {},
    field: 'fieldName',
    value: '',
  }

  state = {
    value: this.props.value,
  }

  handleInput = (value) => {
    const { handleInput, field, onChangeText } = this.props
    this.setState({ value })
    onChangeText(value)
    handleInput({ value, type: 'textInput', field })
  }

  render() {
    return (
      <TextField
        {...this.props}
        label={this.props.label}
        style={[
          { fontFamily: fonts.sukhumvitBold, color: colors.hunterGreen },
          this.props.label === '' && { fontSize: this.props.fs, textAlign: 'center' },
          { ...this.props.styled },
        ]}
        labelTextStyle={{ fontFamily: fonts.sukhumvitLight, fontSize: 100 }}
        tintColor={colors.grey}
        baseColor={colors.grey}
        titleFontSize={12}
        labelFontSize={this.props.labelFontSize !== undefined ? 20 : 14}
        activeLineWidth={this.props.activeLineWidth !== undefined ? 0 : 2}
        fontSize={18}
        value={this.props.value || this.state.value}
        onChangeText={this.handleInput}
        height="100%"
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />
    )
  }
}
