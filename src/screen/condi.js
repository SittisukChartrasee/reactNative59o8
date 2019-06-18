import React from 'react'
import {
  View,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import colors from '../config/colors'
import images from '../config/images'
import { isIphoneX } from '../config/helper'
import { TLight } from '../component/texts'
import { NavBar } from '../component/gradient'
import { navigateAction } from '../redux/actions'
import setMutation from '../containers/mutation'
import { LongButton } from '../component/button'
import lockout from '../containers/hoc/lockout'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    agree: false,
  }

  componentDidMount = async () => {
    const a = await AsyncStorage.getItem('user_token')
    const b = await AsyncStorage.getItem('userToken')
    const c = await AsyncStorage.getAllKeys()
    console.log(a, b, c)
  }

  onNext = async () => {
    
    this.props.acceptTerm()
      .then(res => {
        console.log(res)
        if (res.data.acceptTerm.success) {
          this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera' })
        }
      })
  }

  render() {
    const { agree } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white', marginBottom: isIphoneX() ? '7%' : 16 }}>
        <NavBar
          title="เงื่อนไขการเปิดบัญชี"
          navRight={
            <TouchableOpacity onPress={() => this.props.lockout()}>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />
        <ScrollView contentContainerStyle={{ marginHorizontal: 16, paddingTop: '5%' }} showsVerticalScrollIndicator={false}>
          <TLight color={colors.grey} fontSize={16} textAlign="left">
            {` 1. บริษัทจัดการมีสิทธิที่จะไม่อนุมัติหรือปฏิเสธคำขอเปิดบัญชีกองทุนรวม หรือการทำธุรกรรมกับผู้ลงทุนทั้งหมดหรือบางส่วน ได้โดยไม่จำเป็นต้องชี้แจงแสดงเหตุผลใดๆแก่ผู้ลงทุน และการตัดสินใจของบริษัทจัดการให้ถือเป็นที่สุด ทั้งนี้ ให้รวมถึงสิทธิที่จะดำเนินการใดๆให้เป็นไปตามข้อกำหนดสิทธิและหน้าที่ของบริษัทจัดการที่ระบุไว้ในหนังสือชี้ชวน ตลอดจนเงื่อนไขและข้อกำหนดอื่นใดที่บริษัทจัดการได้กำหนดไว้ นอกจากนี้บริษัทจัดการจะไม่รับเปิดบัญชีกองทุนในกรณีดังต่อไปนี้
  - พลเมืองสหรัฐอเมริกาหรือผู้ที่มีถิ่นฐานอยู่ในสหรัฐอเมริกา หรือบุคคลซึ่งโดยปกติมีถิ่นที่อยู่ในสหรัฐอเมริกา
  - บุคคลที่อายุต่ำกว่า 20 ปีบริบูรณ์
  2. ในการเปิดบัญชีกองทุนผ่านK-My Funds บัญชีเงินฝากธนาคารที่ผู้ขอเปิดบัญชีกองทุนระบุให้เป็นบัญชีเพื่อซื้อหน่วยลงทุนจะถูกใช้เป็นบัญชีเพื่อรับเงินค่าขายคืนและ/หรือเงินปันผล ในกรณีที่ผู้ขอเปิดบัญชีประสงค์จะเปลี่ยนแปลงบัญชีเงินฝากธนาคารจะต้องปฎิบัติตามหลักเกณฑ์ เงื่อนไขและวิธีการที่บริษัทจัดการกำหนด
  3. การเปิดบัญชีกองทุนผ่าน K-My Funds จะครอบคลุมถึงการสมัครใช้บริการ SMS Fund Alert บริการ K-Mutual Fund Reports และบริการ K-Cyber Invest  อย่างไรก็ตาม บริษัทอาจเปลี่ยนแปลงหรือยกเลิกการให้บริการดังกล่าวได้ โดยเป็นดุลยพินิจของบริษัทจัดการ
          `}
          </TLight>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ agree: !agree })}
            style={{
              backgroundColor: colors.lightgrey,
              padding: 16,
              flexDirection: 'row',
              marginHorizontal: 24,
              marginTop: 16,
              borderRadius: 12,
            }}
          >
            <View style={{ marginRight: 16, marginTop: 5 }}>
              {
                agree
                  ? <Image
                    source={images.iconCheck}
                    style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red' }}
                  />
                  : <Image source={{}} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.grey }} />
              }
            </View>
            <View style={{ flex: 1 }}>
              <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
            </View>
          </TouchableOpacity>
          <LongButton
            label="ยืนยัน"
            onPress={this.onNext}
            style={{ marginHorizontal: 24 }}
            disabled={!agree}
          />
        </View>
      </View>
    )
  }
}
