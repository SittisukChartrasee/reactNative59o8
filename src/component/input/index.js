import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'
import Iradio from './inputRadio'
import IradioColumn from './inputRadioColumn'
import Input from './inputDefault'
import InputSearch from './inputSearch'
import InputPicker from './inputPicker'
import InputPickerExpire from './inputPickerExpire'
import InputModal from './inputModal'
import { ButtonCard, SelectCard, LinkCard } from '../cardSelect'
import { TMed, TLight, TBold } from '../texts'
import colors from '../../config/colors'
import fonts from '../../config/fonts'
import images from '../../config/images'

const Star = ({
  position = 'absolute',
  left = 10,
  top = 13,
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
          {props.required ? <Star /> : null}
        </View>
      )
    case 'dropdown':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Idown {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'textInput':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex', ...props.style }}>
          <Imaterial {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'Icustom':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Input {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'radio':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <Iradio key={key} {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'radioColumn':
      return (
        <View key={key} style={{ marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <IradioColumn {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'search':
      return (
        <View key={key} style={{ paddingHorizontal: 24, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mt="13" textAlign="left" color={props.err ? 'rgb(213, 0, 0)' : colors.grey}>{props.label}</TLight>
          <InputSearch {...props} />
          {props.required ? <Star top={8} /> : null}

        </View>
      )

    case 'dateExpire':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={props.err ? 'rgb(213, 0, 0)' : colors.grey}>{props.label}</TLight>
          <InputPickerExpire {...props} />
          {props.required ? <Star top={8} /> : null}
        </View>
      )

    case 'ymd':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <InputPicker label={props.label} {...props} />
          {props.required ? <Star /> : null}
        </View>
      )

    case 'buttonCard':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <ButtonCard {...props} />
        </View>
      )

    case 'selectCard':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <SelectCard {...props} />
        </View>
      )

    case 'linkCard':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <LinkCard {...props} />
        </View>
      )

    case 'titleHead':
      return (
        <View key={key} style={{ marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <View style={{ backgroundColor: colors.lightgrey, paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TBold textAlign="left">{props.label}</TBold>
            <TouchableOpacity
              onPress={() => props.handleInput({ type: 'titleHead', field: props.field, })}
              style={{ display: props.field === 'secondIdcard' ? 'flex' : 'none' }}
            >
              <TBold color={colors.softRed}>ลบ</TBold>
            </TouchableOpacity>
          </View>
        </View>
      )

    case 'modal':
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 10, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={props.err ? 'rgb(213, 0, 0)' : colors.grey}>{props.label}</TLight>
          <InputModal {...props} />
          {props.required ? <Star /> : null}
          <Text style={{ fontFamily: fonts.sukhumvitLight, fontSize: 12, color: props.err ? 'rgb(213, 0, 0)' : undefined, marginTop: 4 }}>{props.err}</Text>
        </View>
      )

    default:
      return (
        <View key={key} style={{ paddingHorizontal: 24, marginTop: 16, display: props.inVisible ? 'none' : 'flex' }}>
          <TLight fontSize="14" mb="10" mt="10" textAlign="left" color={colors.grey}>{props.label}</TLight>
          <TBold textAlign="left" color={colors.midnight}>{props.value || ''}</TBold>
          {props.required ? <Star /> : null}
        </View>
      )
  }
}