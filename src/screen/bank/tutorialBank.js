import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
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

const { width: widthView, height: heightView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@lockout
export default class extends React.Component {
  render() {
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="เชื่อมบัญชีธนาคาร"
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ alignItems: 'center', paddingTop: '12%', marginBottom: 24 }}>
            <Image source={images.group3} style={{ height: heightView * .2 }} resizeMode="contain" />
            <TSemiBold fontSize={16} mt="7%" mb="5%" color={colors.white}>{`กรุณาเลือกธนาคารที่ท่าน\nต้องการใช้เป็นบัญชี`}</TSemiBold>

            <View style={{}}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">ชำระค่าซื้อกองทุนผ่าน K-My Funds</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รับเงินปันผลกองทุน</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รับเงินค่าขายคืนกองทุน</TLight>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>

        <View style={{ width: widthView, marginBottom: 24 }}>
          <TSemiBold fontSize={16} color={colors.sunflower} mt="2%">{`โดยชื่อบัญชีธนาคารจะต้องตรงกับ\nชื่อผู้ขอเปิดบัญชีกองทุนเท่านั้น`}</TSemiBold>
          <LongButton
            label="ตกลง"
            style={{ marginHorizontal: 24 }}
            onPress={() => this.props.navigateAction({ ...this.props, page: 'chooseBank' })}
          />
        </View>
      </Screen>
    )
  }
}