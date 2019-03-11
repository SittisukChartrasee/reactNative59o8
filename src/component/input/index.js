import React from 'react'
import { View } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import { TMed, TLight, TBold } from '../texts'
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
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>หมายเลขโทรศัพท์มือถือ</TLight>
          <TBold textAlign="left" color={colors.midnight}>088 888 8888</TBold>
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