import React from 'react'
import {
  View,
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
// import { LongButton } from '../button'

export default class extends React.Component {
  render() {
    return (
      <View>
        <Modal isVisible={true}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ flex: 1, marginHorizontal: 18, padding: 24, backgroundColor: 'white', borderRadius: 8 }}>
              <TLight>{`รหัส OTP ไม่ถูกต้อง \nคุณสามารถกรอกได้อีก n ครั้ง`}</TLight>

            </View>
          </View>
        </Modal>
      </View>
    )
  }
}