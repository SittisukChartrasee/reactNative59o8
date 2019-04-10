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

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  static defaultProps = {
    status: true,
  }
  render() {
    const { navigateAction, status } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title={null}
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
          <Image source={status ? images.iconPassBank : images.iconFailBank} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
          <TBold color={colors.white} mb={24}>เชื่อมบัญชีธนาคารสำเร็จ</TBold>
          {
            status
              ? <TLight color={colors.smoky} fontSize={16}>{`ท่านได้ดำเนินการเชื่อมบัญชีสำเร็จแล้ว`}</TLight>
              : (
                <View>
                  <TLight color={colors.white}>{`กรุณาตรวจสอบกับธนาคารที่ท่านเลือก\n1. แอปพลิเคชันธนาคารเป็นเวอร์ชันล่าสุดหรือไม่\n2. ข้อมูลบัญชีธนาคาร หรือข้อมูลที่ให้ไว้\nกับธนาคารไม่ถูกต้อง `}</TLight>
                </View>
              )
          }
        </View>

        <View style={{ flex: 1, width: widthView, justifyContent: 'flex-end', paddingBottom: 44 }}>
          <LongButton
            label="ถัดไป"
            style={{ marginHorizontal: 24 }}
            onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
          />
        </View>
      </Screen>
    )
  }
}