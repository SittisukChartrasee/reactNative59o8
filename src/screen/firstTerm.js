import React from 'react'
import {
  NativeModules,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Clipboard,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../component/texts'
import colors from '../config/colors'
import { LongButton } from '../component/button'
import images from '../config/images'
import { navigateAction } from '../redux/actions'
import getVersion from '../config/version'
import SecureKeyStore from "../utility/keyStore";

const { width: widthView } = Dimensions.get('window')

const item1 = [
  'บัตรประจำตัวประชาชนของท่านและคู่สมรส',
  'หนังสือเดินทางของคู่สมรสในกรณี\nชาวต่างชาติ',
  'สมุดบัญชี ธ.กสิกรไทย หรือ ธ.ไทยพาณิชย์ อย่างใดอย่างหนึ่ง',
  'แอปพลิเคชัน K PLUS หรือบัตร ATM ธ.ไทยพาณิชย์ ขึ้นอยู่กับธนาคารที่ท่านใช้สมัคร',
]

const item2 = [
  'เป็นบุคคลธรรมดา มีสัญชาติไทย\nอายุ 20 ปีบริบูรณ์',
  'ไม่เป็นผู้ที่มีถิ่นฐานอยู่ในสหรัฐอเมริกา หรือเป็นพลเมืองสหรัฐอเมริกา',
  'สำหรับผู้ลงทุนที่ไม่เคยเปิดบัญชีกองทุนกับ\nบลจ. กสิกรไทยมาก่อน',
]

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  onNext = () => {
    this.props.navigateAction({ ...this.props, page: 'welcome' })
  }

  onClipboardVersion = () => {
    const version = getVersion.version
    const build = getVersion.build
    const getEnv = this.props.root.env
    const time = getVersion.time
    const formate = `version : ${version} build : ${build} env : ${getEnv} date : ${time}`
    Clipboard.setString(formate)
  }

  render() {
    // test
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="เปิดบัญชี ต้องเตรียมอะไรบ้างนะ"
          navLeft={
            <TouchableOpacity
              onPress={() => NativeModules.KMyFundOnboarding.finishActivity()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={{ marginHorizontal: 24 }}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <TLight fontSize={16} mb="7%" color={colors.white}>{`เตรียมก่อนปลอดภัยเปิดบัญชีกองทุนง๊ายง่าย`}</TLight>
            <TouchableOpacity activeOpacity={1} onPress={this.onClipboardVersion}>
              <Image source={images.tutorialBankaccount} style={{ width: widthView * .6 }} resizeMode="contain" />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={async () => {
                SecureKeyStore.clear()
                NativeModules.KMyFundOnboarding.finishActivity()
                // NativeModules.KMyFundOnboarding.autoLogin('100', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9')
                // SecureKeyStore.set("access_token", 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTkxMTI4ODUsImlkZW50aXR5IjoiWDRvZVUvTUN2NXhuOEtMZXhrS2hPNkM5NVJIU0hwN09Md1QvcDJueXZad0I1RmhRWXp2MkRKaEFHSFNhdTlMNmh3MlgyT2p2b0UyWmNmZ3pSdm1VWlZ4RzZQb2hndGZLVGVnclBTVFcifQ.ePioDlD-myl7JM5mH60ivY-mKBtbu11p_cFEgkxXSrnWkQgEFT-pSY8DbY96q1EWs_MwKZBS2Ku7vwTQ7GaEBDWh6LgaOVih9qKA9owUQ_8lXfMutsc-I1xaUM1rhApImCeux9pUq_BIGaihPpuv76pspGYBaineMirGr8HDEDx30-3SWtjBUlOUoWZJRs_1iXruSu54l8I3sSjoSOvvQdAIcDs_hXAVpftHGOqmZcueLoCg242Tj7Z5eTubW8vqGm2kI7u42ONTGIZzK-oJqLM8e9VEzhND052Vs-MZePSWW8DoXYmwhE0iUEi1H6NAUQPz6P7dQKqKI2LeZVKiYw'
                // )
              }}
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Image source={images.cancelFirst} style={{ marginRight: 8 }} />
              <TBold color={colors.white}>ยกเลิก</TBold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.onNext}
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TBold color={colors.white} style={{ marginRight: 8 }}>ต่อไป</TBold>
              <Image source={images.next} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Screen>
    )
  }
}
