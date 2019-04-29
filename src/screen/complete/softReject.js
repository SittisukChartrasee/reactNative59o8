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
import Input from '../../component/input'
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
  state = {
    card: [
      {
        label: 'ถ่ายบัตรประชาชน',
        type: 'linkCard',
        active: true,
      }, {
        label: 'ถ่ายบัตรประชาชนคู่ใบหน้า',
        type: 'linkCard',
      }
    ],
  }

  onChangeText = (props) => {
    console.log(props)
  }

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

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingTop: 40 }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={images.iconEdit} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
              <TLight color={colors.white}>{`ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่ด้วยนะคะ`}</TLight>
            </View>
            {
              this.state.card.map((d, key) => Input({
                field: d.field,
                label: d.label,
                type: d.type,
                init: d.init,
                image: d.image,
                active: d.active,
                onChangeText: (props) => this.onChangeText(props),
              }, key))
            }
          </View>
        </ScrollView>
        

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