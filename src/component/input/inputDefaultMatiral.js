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
    onChangeText: () => {},
    field: 'fieldName',
  }

  onChangeText = (value) => {
    const { onChangeText, field } = this.props
    onChangeText({ value, type: 'textInput', field })
  }


  render() {
    const { onChangeText, field } = this.props
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
        value={this.props.value}
        onChangeText={text => onChangeText(text)}
        height="100%"
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize="none"
      />
    )
  }
}
