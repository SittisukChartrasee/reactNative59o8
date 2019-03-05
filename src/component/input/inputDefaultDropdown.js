import React from 'react'
import { Dropdown } from 'react-native-material-dropdown'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

const Drop = props => (
  <Dropdown
    {...props}
    label={props.label}
    data={props.data}
    onChangeText={props.onChangeText}

    tintColor={colors.darkSage}
    baseColor={colors.darkSage}
    titleFontSize={12}
    labelFontSize={14}
    fontSize={24}
    dropdownPosition={props.dropdownPosition || 0}

    textColor={colors.darkSage}
    itemColor={colors.darkSage}
    selectedItemColor={colors.darkSage}
    style={{ fontFamily: fonts.sukhumvit }}
    labelTextStyle={{ fontFamily: fonts.sukhumvit }}
    itemTextStyle={{ fontFamily: fonts.sukhumvit }}
  />
)

Drop.defaultProps = {
  data: [
    { value: 'test' },
    { value: 'test' },
    { value: 'test' },
  ],
  label: 'test label'
}

export default Drop
