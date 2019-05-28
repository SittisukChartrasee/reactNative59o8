import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native'
import { bindActionCreators } from 'redux'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import lockout from '../../containers/hoc/lockout'
import { checkVerifiedEmail } from '../../containers/query'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@lockout
@withApollo
export default class extends React.Component {

  onNext = async () => {
    const { navigateAction } = this.props
    this.props.client.query({ query: checkVerifiedEmail })
      .then(res => {
        if (res.data.checkVerifiedEmail) navigateAction({ ...this.props, page: 'waiting' })
        else navigateAction({ ...this.props, page: 'verifyEmail' })
      })
      .catch(err => console.log(err))
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
          <TLight color={colors.white}>{`กรุณากดปุ่ม “ยืนยันเปิดบัญชีกองทุน” เพื่อยืนยัน\nการส่งข้อมูลเปิดบัญชีกองทุนของท่านไปยัง\nบริษัท หลักทรัพย์จัดการกองทุนกสิกรไทย จำกัด`}</TLight>
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