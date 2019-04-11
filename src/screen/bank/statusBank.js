import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
const { width: widthView } = Dimensions.get('window')

const renderText = (caseStatus) => {
  switch (caseStatus) {
    case 'FAIL':
      return {
        title: `กรุณาตรวจสอบกับธนาคารที่ท่านเลือก\n1. แอปพลิเคชันธนาคารเป็นเวอร์ชันล่าสุดหรือไม่\n2. ข้อมูลบัญชีธนาคาร หรือข้อมูลที่ให้ไว้\nกับธนาคารไม่ถูกต้อง`,
        image: images.iconFailBank,
        titleBtn: 'ลองอีกครั้ง'
      }

    case 'WAITTING':
      return {
        header: 'เชื่อมบัญชีธนาคาร',
        title: `เมื่อทำรายการสำเร็จ ให้กลับเข้าแอป KmyFunds อีกครั้ง เพื่ออัพเดทสถานะการเชื่อมบัญชีธนาคาร`,
        image: images.iconWaitBank,
      }
  
    default:
      return {
        title: 'ท่านได้ดำเนินการเชื่อมบัญชีสำเร็จแล้ว',
        image: images.iconPassBank,
        titleBtn: 'ถัดไป'
      }
  }
}

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  static defaultProps = {
    status: 'WAITTING', // DONE, WAITTING, FAIL
  }
  render() {
    const { navigateAction, status } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title={renderText(status).header || null}
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 24 }}>
          <Image source={renderText(status).image} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
          <TBold color={colors.white} mb={24}>เชื่อมบัญชีธนาคารสำเร็จ</TBold>
          <TLight color={colors.smoky}>{renderText(status).title}</TLight>
        </View>

        <View style={{ flex: 1, width: widthView, justifyContent: 'flex-end', paddingBottom: 44 }}>
          {
            renderText(status).titleBtn !== undefined &&
            <LongButton
              label={renderText(status).titleBtn}
              style={{ marginHorizontal: 24 }}
              onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
            />
          }
        </View>
      </Screen>
    )
  }
}