import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import Input from './inputDefault'
import InputSearch from './inputSearch'
import InputPicker from './inputPicker'
import InputPickerExpire from './inputPickerExpire'
import { TMed, TLight, TBold } from '../texts'
import colors from '../../config/colors';
import images from '../../config/images';

const Star = () => (
  <View style={{ position: 'absolute', left: -16, top: 13 }}>
    <TLight color={colors.softRed} textAlign="left">*</TLight>
  </View>
)

export default (props, key) => {
  switch (props.type) {
    case 'mask':
      return (
        <View key={key}>
          <Star />
          <Imask key={key} {...props} />
        </View>
      )
    case 'dropdown':
      return  (
        <View key={key}>
          <Star />
          <Idown {...props} />
        </View>
      )

    case 'textInput':
      return (
        <View key={key}>
          <Star />
          <Imaterial {...props} />
        </View>
      )

    case 'Icustom':
      return (
        <View key={key}>
          <Star />
          <Input {...props} />
        </View>
      )

    case 'radio':
      return (
        <View key={key}>
          <Star />
          <Iradio key={key} {...props} />
        </View>
      )

    case 'search':
      return (
        <View key={key}>
          <Star />
          <TLight fontSize="14" mt="13" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <InputSearch />
        </View>
      )

    case 'dateExpire':
      return (
        <View key={key} style={{ marginTop: 16 }}>
          <Star />
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <InputPickerExpire {...props}/>
        </View>
      )

    case 'ymd':
      return (
        <View key={key} style={{ marginTop: 16 }}>
          <Star />
          <InputPicker label={props.label} {...props}/>
        </View>
      )
  
    default:
      return (
        <View key={key} style={{ marginTop: 16 }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <TBold textAlign="left" color={colors.midnight}>1 1234 12345</TBold>
        </View>
      )
  }
}