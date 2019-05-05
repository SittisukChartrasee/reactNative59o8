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
          title="ยืนยันการสมัคร"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
          <Image source={images.iconPlete} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
          <TBold color={colors.white} mb={24}>ท่านได้กรอกข้อมูลครบถ้วนแล้ว</TBold>
          <TLight color={colors.white}>{`กรุณากดปุ่ม “ยืนยันเปิดบัญชีกองทุน”\nเพื่อยืนยันการส่งข้อมูลเปิดบัญชีกองทุนของท่านไปยัง\nบริษัท หลักทรัพย์จัดการกองทุนกสิกรไทย จำกัด  `}</TLight>
        </View>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="ส่งอีเมลยืนยันอีกครั้ง"
            style={{ marginHorizontal: 24 }}
            onPress={() => navigateAction({ ...this.props, page: 'verifyEmail' })}
          />
        </View>
      </Screen>
    )
  }
}