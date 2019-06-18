import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
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

const renderText = (caseStatus) => {
  switch (caseStatus) {
    case 'Rejected':
      return {
        header: 'ผลอนุมัติเปิดบัญชี',
        title: 'ขออภัยท่านไม่สามารถเปิดบัญชีกองทุนได้',
        dis: 'กรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1',
        titleBtn: 'ติดต่อ 02 673 3888',
        btnStatus: true,
      }

    case 'Approved':
      return {
        header: 'ผลอนุมัติเปิดบัญชี',
        title: 'เปิดบัญชีสำเร็จ',
        dis: 'ท่านสามารถเริ่มลงทุนผ่านแอปพลิเคชั่น\nK-My Fund ได้แล้ว',
        text: `1. ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ หรือ ภาระผูกพันใด ๆให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ หรือบุคคลดังกล่าว.   	ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ/หรือ ภาระผูกพันใด ๆ ให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ/หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ/หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ/หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ/หรือบุคคลดังกล่าว. `,
        titleBtn: 'เริ่มใช้งาน K-My Fund',
        btnStatus: false,                    
      }

    default:
      return {
        title: 'เกิดข้อผิดพลาด',
        dis: 'กรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1',
        titleBtn: 'ติดต่อ 02 673 3888',
        btnStatus: true,
      }
  }
}

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@lockout
export default class extends React.Component {
  static defaultProps = {
    status: 'Approved', // SUCCESS, REJECT, nothing
  }

  state = {
    agree: false,
  }

  render() {
    const { agree } = this.state
    const status = this.props.navigation.getParam('status', '')
    return (
      <Screen>
        <NavBar
          color="transparent"
          title={renderText(status).header || null}
          navRight={
            renderText(status).btnStatus ? (
              <TouchableOpacity
                onPress={() => this.props.lockout()}
                style={{ paddingLeft: 30 }}
              >
                <Image source={images.iconlogoOff} />
              </TouchableOpacity>
            ) : null
          }
        />
        <ScrollView
          contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={images.kmyfundLogo} style={{ width: widthView * .6, marginBottom: 19 }} resizeMode="contain" />
            <TBold color={colors.white} mb={10}>{renderText(status).title}</TBold>
            <TLight color={colors.white} mb={status === 'Approved' ? 40 : 0}>{renderText(status).dis}</TLight>
            {
              status === 'Approved' ? (
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
              <TLight color={colors.grey} textAlign="left" mb={40}>{renderText(status).text}</TLight>
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
                    : <Image source={{}} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.grey }} />
                }
              </View>
              <View style={{ flex: 1 }}>
                <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
              </View>
            </TouchableOpacity>
            </View>
              ) : null
            }
          </View>
        </ScrollView>
        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label={renderText(status).titleBtn}
            bgTransparent={renderText(status).btnStatus}
            style={{ marginHorizontal: 24 }}
            disabled={!agree}
            onPress={() => this.props.navigateAction({ ...this.props, page: '' })}
          />
        </View>
      </Screen>
    )
  }
}