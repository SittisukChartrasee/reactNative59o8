import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import Modal from "react-native-modal"
import {
  TBold,
  TLight,
  TMed,
  TSemiBold,
  TText,
  TThin
} from '../texts'
import { LongButton } from '../button'
import images from '../../config/images'

export default ({
  visible=false,
  image,
  labelBtn="รับทราบ",
  dis="รหัส OTP ไม่ถูกต้อง \nคุณสามารถกรอกได้อีก n ครั้ง",
  onPress=() => {},
}) => (
  <Modal isVisible={visible} onSwipeComplete={onPress} swipeDirection="left" useNativeDriver={true}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ flex: 1, padding: 24, backgroundColor: 'white', borderRadius: 8 }}>
        { image && <Image source={images} style={{ alignSelf: 'center', marginBottom: 24 }} /> }
        <TLight>{dis}</TLight>
        <LongButton label={labelBtn} onPress={onPress} />
      </View>
    </View>
  </Modal>
)