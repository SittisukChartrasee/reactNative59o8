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
  render() {
    const { navigateAction } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ถ่ายบัตรประชาชน"
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

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <TLight fontSize={16} mb="7%" color={colors.white}>{`ข้อมูลบนรูปบัตรประชาชนต้องชัดเจน \nไม่มีการปิดบังส่วนหนึ่งส่วนใดของบัตร`}</TLight>
            <Image source={images.idCardMockup} style={{ width: widthView * .6 }} resizeMode="contain"  />

            <View style={{ marginHorizontal: 24, marginTop: '6%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '3%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รูปภาพไม่เบลอ เห็นตัวอักษรชัดเจน และเห็นภาพบัตรเต็มใบ</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '2%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">ไม่ถ่ายสะท้อนแสง และไม่มืด หรือสว่างจนเกินไป</TLight>
                </View>
              </View>
            </View>
          </View>

          <View style={{ width: widthView }}>
            <LongButton
              label="รับทราบ"
              style={{ marginHorizontal: 24 }}
              onPress={() => navigateAction({ ...this.props, page: 'cameraIdcard' })}
            />
          </View>
        </View>
      </Screen>
    )
  }
}