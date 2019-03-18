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
const { width: widthView, height: heightView } = Dimensions.get('window')

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
          title="เชื่อมบัญชีธนาคาร"
          navLeft={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <Image source={images.group3} style={{ height: heightView * .2 }} resizeMode="contain"  />
            <TSemiBold fontSize={16} mt="5%" color={colors.white}>{`กรุณาเลือกธนาคารที่ท่าน\nต้องการใช้ทำธุรกรรมอัตโนมัติและ\nทำการยืนยันตัวตนออนไลน์`}</TSemiBold>

            <View style={{ marginHorizontal: 24, marginTop: '6%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '3%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">ตัดเงินจากบัญชีอัตโนมัติ</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รับเงินปันผล</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รับเงินค่าขายคืน</TLight>
                </View>
              </View>
            </View>
          </View>


          <View style={widthView <= 320 ? { width: widthView, marginBottom: 24 } : { width: widthView }}>
            <TSemiBold fontSize={16} color={colors.sunflower} mt="9%">{`โดยชื่อบัญชีธนาคารต้องเป็นชื่อเดียวกันกับ\nชื่อที่ใช้สมัครเปิดบัญชี KmyFunds`}</TSemiBold>
            <LongButton
              label="รับทราบ"
              style={{ marginHorizontal: 24 }}
              onPress={() => navigateAction({ ...this.props, page: 'tutorialFrontCamera' })}
            />
          </View>
        </View>
      </Screen>
    )
  }
}