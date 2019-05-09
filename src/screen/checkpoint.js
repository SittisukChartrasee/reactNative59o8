import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TBold, TLight } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongPositionButton, NextButton } from '../component/button'
import { navigateAction } from '../redux/actions'
import { requestOtp } from '../redux/actions/root-active'
import { updateUser } from '../redux/actions/commonAction'

const { width: widthScreen } = Dimensions.get('window')

const checkPoint = [
  {
    point: 'ขั้นตอนที่ 1',
    check: 'success',
    text: 'ยืนยันตัวตน'
  },
  {
    point: 'ขั้นตอนที่ 2',
    check: 'current',
    text: 'กรอกข้อมูลส่วนตัว'
  },
  {
    point: 'ขั้นตอนที่ 3',
    check: 'future',
    text: 'กรอกข้อมูลส่วนตัว'
  },
  {
    point: 'ขั้นตอนที่ 4',
    check: 'future',
    text: 'ทำแบบระเมินความเสี่ยง'
  }
]

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  render() {
    let sizing = { width: 108, height: 78 }
    if (Platform.OS === 'android') {
      styles = widthScreen <= 320 ? {flex: 1, justifyContent: 'flex-end', alignItems: 'center',marginTop} : { flex: 1, justifyContent: 'flex-end', alignItems: 'center'}
    }
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingTop: widthScreen <= 480 ? 25 : 0 }}>
          <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
          <TBold fontSize={18} color={colors.white} mt="24" mb="32">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <View style={{ flex: 2, backgroundColor: '#fff', justifyContent: 'flex-start' }}>
          {checkPoint.map((props, index) => (
            <View
              key={props.point}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                paddingTop: 23,
                paddingLeft: 38,
                height: 102
              }}>
              <View>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: props.check !== 'future' ? colors.emerald : colors.smoky
                }}>
                  {props.check === 'success' ? (
                    <Image
                      source={images.iconCheck}
                      style={{ height: 24, width: 24, borderRadius: 13, }}
                    />
                  ) : null}
                  {props.check === 'current' ? (
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 13,
                      height: 13,
                      borderRadius: 13,
                      backgroundColor: colors.white
                    }} />
                  ) : null}
                  <View style={{
                    width: 4,
                    backgroundColor: colors.emerald
                  }} />
                </View>
                {index < checkPoint.length - 1 ? (
                  <View style={{
                    marginLeft: 11,
                    width: 4,
                    height: '100%',
                    backgroundColor: props.check !== 'future' && props.check !== 'current' ? colors.emerald : colors.smoky
                  }} />
                ) : null}
              </View>
              <View style={{
                paddingTop: 1,
                paddingLeft: 21,
                justifyContent: 'flex-start'
              }}>
                <TLight fontSize={18} textAlign="left" color={colors.emerald} >{props.point}</TLight>
                <TBold fontSize={20} mt="4" >{props.text}</TBold>
              </View>
            </View>
          ))}
        </View>
        <LongPositionButton label="ดำเนินการต่อ" onPress={navigateAction({ ...this.props, page: 'welcome' })} />
      </Screen>
    )
  }
}


