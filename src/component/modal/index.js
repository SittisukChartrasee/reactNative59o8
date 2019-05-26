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

export default ({
  visible=true,
  image,
  type,
  labelBtn="ตกลง",
  dis="รหัส OTP ไม่ถูกต้อง \nคุณสามารถกรอกได้อีก n ครั้ง",
  onPress=() => {},
}) => (
  <Modal isVisible={visible} onSwipeComplete={onPress} swipeDirection="left" useNativeDriver={true}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ flex: 1, padding: 24, backgroundColor: 'white', borderRadius: 8 }}>
        { image && <Image source={image} style={{ alignSelf: 'center', marginBottom: 24 }} /> }
        <TLight>{dis}</TLight>

        {
          type
            ? (
              <View style={{ flexDirection: 'row' }}>
                <FlexButton border onPress={() => alert('connect api logout yet!')}>ใช่</FlexButton>
                <FlexButton marginLeft={16} onPress={onPress}>ไม่ใช่</FlexButton>
              </View>
            ) : (
              <LongButton label={labelBtn} onPress={onPress} />
            )
        }
        
      </View>
    </View>
  </Modal>
)