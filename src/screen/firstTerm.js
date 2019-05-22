import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../component/texts'
import colors from '../config/colors'
import { LongButton } from '../component/button'
import images from '../config/images'
import { navigateAction } from '../redux/actions'
const { width: widthView } = Dimensions.get('window')

const item1 = [
  'บัตรประจำตัวประชาชนของคุณและคู่สมรส',
  'หนังสือเดินทางของคู่สมรสในกรณี\nชาวต่างชาติ',
  'สมุดบัญชี ธ.กสิกรไทย หรือ ธ.ไทยพาณิชย์ อย่างใดอย่างหนึ่ง',
  'แอปพลิเคชั่น K-Plus / SCB Easy ขึ้นอยู่กับธนาคารที่คุณใช้สมัคร',
]

const item2 = [
  'เป็นบุคคลธรรมดา มีสัญชาติไทย\nอายุ 20 ปีบริบูรณ์',
  'ไม่เป็นผู้ทีี่มีถิ่นฐานอยู่ในสหรัฐอเมริกา หรือเป็น\nพลเมืองสหรัฐอเมริกา',
  'สำหรับผู้ลงทุนที่ไม่เคยเปิดบัญชีกองทุนกับ\nบลจ. กสิกรไทยมาก่อน',
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  render() {
    const { navigateAction } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="เปิดบัญชี ต้องเตรียมอะไรบ้างนะ"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={{ marginHorizontal: 24 }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <TLight fontSize={16} mb="7%" color={colors.white}>{`เตรียมก่อนปลอดภัยเปิดบัญชีกองทุนง๊ายง่าย`}</TLight>
            <Image source={images.tutorialBankaccount} style={{ width: widthView * .6 }} resizeMode="contain"  />
          </View>
          
          {
            item1.map((d, key) => (
              <View key={key} style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image source={images.stroke1} style={{ marginTop: '3%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">{d}</TLight>
                </View>
              </View>
            ))
          }

          <View style={{ alignItems: 'center', marginHorizontal: 38, marginTop: 40, marginBottom: 8 }}>
            <TBold color={colors.white}>ตรวจสอบคุณสมบัติของผู้เปิดบัญชีกองทุนกัน</TBold>
          </View>

          {
            item2.map((d, key) => (
              <View key={key} style={{ flexDirection: 'row', marginTop: 8 }}>
                <Image source={images.stroke1} style={{ marginTop: '3%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">{d}</TLight>
                </View>
              </View>
            ))
          }
          
        </ScrollView>

        <SafeAreaView style={{ marginHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image source={images.cancelFirst} style={{ marginRight: 8 }} />
              <TBold color={colors.white}>ยกเลิก</TBold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateAction({ ...this.props, page: 'welcome' })}
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TBold color={colors.white} style={{ marginRight: 8 }}>ต่อไป</TBold>
              <Image source={images.next} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {/* <LongButton
          label="รับทราบ"
          style={{ marginHorizontal: 24 }}
          onPress={() => navigateAction({ ...this.props, page: 'cameraIdcard' })}
        /> */}
      </Screen>
    )
  }
}
