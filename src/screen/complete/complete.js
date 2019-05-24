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
import lockout from '../../containers/hoc/lockout'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@lockout
export default class extends React.Component {

  onNext = async () => {
    const { navigateAction } = this.props
    const verifyStatus = false

    // รอ backEnd ทำ API

    // this.props.verify({ variables: { input: data } })
    // .then(res => {
    //   if (res.data.saveFatca.success) {
    //     navigateAction({ ...this.props, page: 'fraud' })
    //   } else if (!res.data.saveFatca.success) {
    //     const modal = {
    //       dis: res.data.saveFatca.message,
    //       visible: true,
    //       onPress: () => this.setState({ modal: { visible: false } })
    //     }
    //     return this.setState({ modal })
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    if (verifyStatus) {
      navigateAction({ ...this.props, page: 'waiting' })
    } else {
      navigateAction({ ...this.props, page: 'verifyEmail' })
    }
  }

  render() {
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ยืนยันการสมัคร"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
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
            label="ยืนยันเปิดบัญชีลงทุน"
            style={{ marginHorizontal: 24 }}
            onPress={this.onNext}
          />
        </View>
      </Screen>
    )
  }
}