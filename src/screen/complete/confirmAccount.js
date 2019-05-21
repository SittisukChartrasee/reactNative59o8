// import React from 'react'
// import {
//   View,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   Image
// } from 'react-native'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import Screen from '../../component/screenComponent'
// import { NavBar } from '../../component/gradient'
// import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
// import colors from '../../config/colors'
// import Input from '../../component/input'
// import { LongButton } from '../../component/button'
// import images from '../../config/images'
// import { navigateAction } from '../../redux/actions'
// const { width: widthView } = Dimensions.get('window')

// const mapToProps = () => ({})
// const dispatchToProps = dispatch => ({
//   navigateAction: bindActionCreators(navigateAction, dispatch)
// })
// @connect(mapToProps, dispatchToProps)
// export default class extends React.Component {
//   state = {
//     card: [
//       {
//         label: 'ถ่ายบัตรประชาชน',
//         type: 'linkCard',
//         active: true,
//       }, {
//         label: 'ถ่ายบัตรประชาชนคู่ใบหน้า',
//         type: 'linkCard',
//       }
//     ],
//   }

//   handleInput = (props) => {
//     console.log(props)
//   }

//   render() {
//     const { navigateAction } = this.props
//     return (
//       <Screen>
//         <NavBar
//           color="transparent"
//           title="กรุณาแก้ไขข้อมูล"
//           navRight={
//             <TouchableOpacity>
//               <Image source={images.iconlogoOff} />
//             </TouchableOpacity>
//           }
//         />

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={{ paddingTop: 40 }}>
//             <View style={{ alignItems: 'center' }}>
//               <Image source={images.iconEdit} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain"  />
//               <TLight color={colors.white}>{`ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่ด้วยนะคะ`}</TLight>
//             </View>
//             {
//               this.state.card.map((d, key) => Input({
//                 field: d.field,
//                 label: d.label,
//                 type: d.type,
//                 init: d.init,
//                 image: d.image,
//                 active: d.active,
//                 handleInput: (props) => this.handleInput(props),
//               }, key))
//             }
//           </View>
//         </ScrollView>
        

//         <View style={{ paddingBottom: 44 }}>
//           <LongButton
//             label="ส่งข้อมูลอีกครั้ง"
//             style={{ marginHorizontal: 24 }}
//             onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
//           />
//         </View>
//       </Screen>
//     )
//   }
// }

import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PieChart } from '../../component/chart'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { RiskList } from '../../component/lists'
import { navigateAction } from '../../redux/actions'

const text = `1. ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ หรือ ภาระผูกพันใด ๆให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ หรือบุคคลดังกล่าว.   	ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ/หรือ ภาระผูกพันใด ๆ ให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ/หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ/หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ/หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ/หรือบุคคลดังกล่าว. `

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    risk: 0,
    agree: false,
  }

  componentDidMount = () => {
    const sumSuittest = this.props.navigation.getParam('sumSuittest', 0)
    if (sumSuittest <= 15) this.setState({ risk: 0 })
    else if (sumSuittest <= 21) this.setState({ risk: 1 })
    else if (sumSuittest <= 29) this.setState({ risk: 2 })
    else if (sumSuittest > 30) this.setState({ risk: 3 })
  }

  render() {
    const { navigateAction } = this.props
    const { risk, agree } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ผลอนุมัติเปิดบัญชี"
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ marginBottom: 19 }}>
              <Image source={images.kmyfundLogo}/>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={16} color={colors.white}>เปิดบัญชีสำเร็จ</TBold>
            </View>

            <TLight color={colors.white} mb={40}>{`ท่านสามารถเริ่มลงทุนผ่านแอปพลิเคชั่น \nK-My Funds ได้แล้ว`}</TLight>

            <View
              style={{
                backgroundColor: colors.white,
                width: '100%',
                minHeight: 352,
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                overflow: 'hidden'
              }}
            >
              <View style={{ height: 40, flexDirection: 'row' }}>
                <TBold fontSize={18} textAlign="left">เงื่อนไขการเปิดบัญชี</TBold>
              </View>
              <TLight color={colors.grey} textAlign="left">{text}</TLight>
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ agree: !agree })}
              activeOpacity={1}
              style={{
                backgroundColor: colors.lightgrey,
                padding: 16,
                flexDirection: 'row',
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              <View style={{ marginRight: 16, marginTop: 5 }}>
                {
                  agree
                    ? <Image source={images.iconCheck} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red' }} />
                    : <Image source={{}} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: colors.white }} />
                }
              </View>
              <View style={{ flex: 1 }}>
                <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="เริ่มใช้งาน K-My Funds"
            style={{ marginHorizontal: 24 }}
            disabled={!agree}
            onPress={() => navigateAction({ ...this.props, page: 'complete' })}
          />
        </View>
      </Screen>
    )
  }
}