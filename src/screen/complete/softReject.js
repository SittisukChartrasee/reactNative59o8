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
          title="กรุณาแก้ไขข้อมูล"
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
          <Image source={images.iconEdit} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
          <TLight color={colors.white}>{`ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่ด้วยนะคะ`}</TLight>
        </View>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="ส่งข้อมูลอีกครั้ง"
            style={{ marginHorizontal: 24 }}
            onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
          />
        </View>
      </Screen>
    )
  }
}