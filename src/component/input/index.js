import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import IradioColumn from './inputRadioColumn'
import Input from './inputDefault'
import InputSearch from './inputSearch'
import InputPicker from './inputPicker'
import InputPickerExpire from './inputPickerExpire'
import { ButtonCard, SelectCard, LinkCard } from '../cardSelect'
import { TMed, TLight, TBold } from '../texts'
import colors from '../../config/colors';
import images from '../../config/images';

const Star = ({
  position='absolute',
  left=10,
  top=13,
}) => (
  <View style={{ position, left, top }}>
    <TLight color={colors.softRed} textAlign="left">*</TLight>
  </View>
)

export default (props, key) => {
  switch (props.type) {
    case 'mask':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Imask key={key} {...props} />
          <Star />
        </View>
      )
    case 'dropdown':
      return  (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Idown {...props} />
          <Star />
        </View>
      )

    case 'textInput':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Imaterial {...props} />
          <Star />
        </View>
      )

    case 'Icustom':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Input {...props} />
          <Star />
        </View>
      )

    case 'radio':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Iradio key={key} {...props} />
          <Star />
        </View>
      )

    case 'radioColumn':
      return (
        <View key={key} style={{ marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <IradioColumn {...props}/>
          <Star />
        </View>
      )

    case 'search':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mt="13" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <InputSearch />
          <Star top={8}/>
        </View>
      )

    case 'dateExpire':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <InputPickerExpire {...props}/>
          <Star top={8}/>
        </View>
      )

    case 'ymd':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <InputPicker label={props.label} {...props}/>
          <Star />
        </View>
      )

    case 'buttonCard':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <ButtonCard {...props}/>
        </View>
      )
    
    case 'selectCard':
      return (
        <View  key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <SelectCard {...props}/>
        </View>
      )

    case 'linkCard':
      return (
        <View  key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <LinkCard {...props}/>
        </View>
      )

    case 'titleHead':
      return (
        <View key={key} style={{ marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <View style={{ backgroundColor: colors.lightgrey, paddingHorizontal: 24, paddingVertical: 16 }}>
            <TBold textAlign="left">{props.label}</TBold>
          </View>
        </View>
      )

    default:
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <TBold textAlign="left" color={colors.midnight}>{props.value || '1 1234 12345'}</TBold>
        </View>
      )
  }
}