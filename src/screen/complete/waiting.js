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
  render() {
    const { navigateAction } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="รอผลอนุมัติเปิดบัญชี"
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <Image source={images.iconTransfer} style={{ width: widthView * .6 }} resizeMode="contain"  />
          <View>
            <TBold color={colors.white} mb={24}>{`เราได้รับข้อมูลการเปิดบัญชีกองทุน\nของท่านแล้ว`}</TBold>
            <TLight color={colors.white}>{`กรุณารอผลการอนุมัติภายใน 3 วันทำการ\nผ่านระบบแจ้งเตือน`}</TLight>
          </View>
          <TLight color={colors.white}>{`หากมีข้อสงสัยกรุณาติดต่อ\n02 673 3888 กด 1 และ กด 1`}</TLight>
        </View>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="รีเฟรช"
            bgTransparent
            style={{ marginHorizontal: 24 }}
            onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
          />
        </View>
      </Screen>
    )
  }
}