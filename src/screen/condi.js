import React from 'react'
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../config/colors'
import images from '../config/images'
import { TLight } from '../component/texts'
import { NavBar } from '../component/gradient'
import { LongButton } from '../component/button'

export default class extends React.Component {
  state = {
    agree: false,
  }
  render() {
    const { agree } = this.state
    const { navigation } = this.props
    return (
      <View>
        <NavBar title="เงื่อนไขการเปิดบัญชี" />
        <ScrollView style={{ height: '50%', marginHorizontal: 16, marginTop: 40 }} showsVerticalScrollIndicator={false}>
          <TLight color={colors.grey} fontSize={16} textAlign="left">
          1. ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ หรือ ภาระผูกพันใด ๆให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ หรือบุคคลดังกล่าว.   	ผู้ขอใช้บริการมีความประสงค์ให้ธนาคารหักเงินจากบัญชีเงินฝากของผู้ขอใช้บริการ เพื่อชำระหนี้ และ/หรือ ภาระผูกพันใด ๆ ให้แก่ผู้รับเงิน ตามจำนวนเงินและวันที่ที่ปรากฏในใบแจ้งหนี้ และ/หรือ ข้อมูลที่ผู้รับเงินได้นำส่งให้แก่ธนาคารผ่านช่องทางอิเล็กทรอนิกส์ หรือด้วยวิธีใดที่ธนาคารได้ตกลงกับผู้รับเงิน หรือตามคำสั่งที่ธนาคารได้รับจากผู้รับเงิน ตัวแทนของผู้รับเงิน และ/หรือบุคคลอื่นใดที่ได้รับแต่งตั้งหรือมอบหมายจากผู้รับเงินให้กระทำการแทน และ/หรือในนามของผู้รับเงิน (ต่อไปนี้จะเรียกว่า ”ข้อมูลที่นำส่ง”) และนำเงินดังกล่าวโอนเข้าบัญชีเงินฝากของผู้รับเงิน และ/หรือบุคคลดังกล่าว.             
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
              marginVertical: 16,
              borderRadius: 12,
            }}
          >
            <View style={{ marginRight: 16, marginTop: 5 }}>
              {
                agree
                  ? <Image source={{}} style={{ width: 16, height: 16, backgroundColor: 'red' }} />
                  : <Image source={{}} style={{ width: 16, height: 16, backgroundColor: 'green' }} />
              }
            </View>
            <View style={{ flex: 1 }}>
              <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
            </View>
          </TouchableOpacity>
          <LongButton
            label="ยืนยัน"
            onPress={() => navigation.navigate('tutorialBackCamera')}
            style={{ marginHorizontal: 24 }}
          />
        </View>
      </View>
    )
  }
}


