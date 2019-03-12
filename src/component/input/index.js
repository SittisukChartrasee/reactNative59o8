import React from 'react'
import { View } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import { TMed, TLight, TBold } from '../texts'
import colors from '../../config/colors';

export default (props, key) => {
  switch (props.type) {
    case 'mask': 
      return (
        <Imask key={key} {...props} />
      )

    case 'dropdown': 
      return (
        <Idown key={key} />
      )

    case 'textInput':
      return (
        <Imaterial key={key} {...props} />
      )

    case 'radio':
      return (
        <Iradio key={key} />
      )
  
  
    default:
      return (
        <View key={key} style={{ marginTop: 16 }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>หมายเลขโทรศัพท์มือถือ</TLight>
          <TBold textAlign="left" color={colors.midnight}>088 888 8888</TBold>
        </View>
      )
  }
}