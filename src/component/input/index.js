import React from 'react'
import { View } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import Input from './inputDefault'
import { TMed, TLight, TBold } from '../texts'
import colors from '../../config/colors';

export default (props, key) => {
  switch (props.type) {
    case 'mask': return <Imask key={key} {...props} />

    case 'dropdown': return <Idown key={key} {...props} />

    case 'textInput': return <Imaterial key={key} {...props} />

    case 'Icustom': return <Input key={key} {...props} />

    case 'radio': return <Iradio key={key} {...props} />
  
    default:
      return (
        <View key={key} style={{ marginTop: 16 }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <TBold textAlign="left" color={colors.midnight}>1 1234 12345</TBold>
        </View>
      )
  }
}