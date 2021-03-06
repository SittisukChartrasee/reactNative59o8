import React from 'react'
import Modal from 'react-native-modal'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  TBold,
  TLight,
  TMed,
  TSemiBold,
  TText,
  TThin
} from '../texts'
import {
  LongButton,
  LongPositionButton,
  NextButton,
  FlexButton,
} from '../button'
import CheckBox from '../checkbox'
import colors from '../../config/colors';

export default class extends React.Component {
  static defaultProps = {
    visible: false,
    image: undefined,
    type: undefined,
    labelBtn: "ตกลง",
    dis: "[default discription]",
    onChange: undefined,
    swap: false,
    onPress: () => alert('use func onPress yet!'),
    onConfirm: () => alert('use func onConfirm yet!'),
    onPressClose: () => alert('use func onPressClose yet!'),
    disabled: false
  }

  render() {
    const {
      visible,
      image,
      type,
      labelBtn,
      swap,
      dis,
      onPress,
      onChange,
      onConfirm,
      onPressClose,
      disabled
    } = this.props

    return (
      <Modal
        isVisible={visible}
        onSwipeComplete={onPressClose}
        onRequestClose={onPressClose}
        swipeDirection="left"
        useNativeDriver={true}
      >
        <TouchableOpacity
          onPress={onPressClose}
          activeOpacity={1}
          disabled={disabled}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, padding: 24, backgroundColor: 'white', borderRadius: 8 }}
          >
            {image && <Image source={image} style={{ alignSelf: 'center', marginBottom: 24 }} />}
            <TLight>{dis}</TLight>
            {/* { onChange && (
              <View 
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colors.smoky,
                  marginTop: 16,
              }}>
                <CheckBox onChange={val => onChange(val)} />
                <TLight>ไม่ต้องการบันทึกข้อมูล</TLight>
              </View>
            )} */}

            {
              type
                ? swap
                  ? (
                    <View style={{ flexDirection: 'row' }}>
                      <FlexButton border onPress={onPressClose}>ไม่ใช่</FlexButton>
                      <FlexButton marginLeft={16} onPress={onConfirm}>ใช่</FlexButton>
                    </View>
                  )
                  : (
                    <View style={{ flexDirection: 'row' }}>
                      <FlexButton border onPress={onConfirm}>ใช่</FlexButton>
                      <FlexButton marginLeft={16} onPress={onPressClose}>ไม่ใช่</FlexButton>
                    </View>
                  ) : (
                  <LongButton label={labelBtn} onPress={onPress} />
                )
            }

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}