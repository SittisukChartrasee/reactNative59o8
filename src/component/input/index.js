import React from 'react'
import { View } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import { TMed } from '../texts'
import colors from '../../config/colors';

const WrapperInput = (key) => {
  switch (key) {
    case 'mask': 
      return (
        <Imask />
      )

    case 'dropdown': 
      return (
        <Idown />
      )

    case 'textInput':
      return (
        <Imaterial />
      )

    case 'radio':
      return (
        <Iradio />
      )
  
  
    default:
      return (
        <View>
          <TMed fontSize="18" mb="10" mt="10" textAlign="left" color={colors.darkSage}>test</TMed>
          <TMed fontSize="20" textAlign="left" color={colors.greyishBrown}>TT M</TMed>
        </View>
      )
  }
}

export default class extends React.Component {
  render = () => {
    const { type } = this.props
    return WrapperInput(type)
  }
}