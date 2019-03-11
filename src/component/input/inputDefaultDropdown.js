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
    baseColor={colors.grey}
    titleFontSize={12}
    labelFontSize={14}
    fontSize={24}
    dropdownPosition={props.dropdownPosition || 0}

    textColor={colors.darkSage}
    itemColor={colors.darkSage}
    selectedItemColor={colors.darkSage}
    style={{ fontFamily: fonts.sukhumvitBold }}
    labelTextStyle={{ fontFamily: fonts.sukhumvitText }}
    itemTextStyle={{ fontFamily: fonts.sukhumvitBold }}
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
