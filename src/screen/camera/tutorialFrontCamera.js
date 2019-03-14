import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
const { width: widthView } = Dimensions.get('window')


export default class extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ถ่ายบัตรประชาชนคู่ใบหน้า"
          navLeft={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <TLight fontSize={16} mb="7%" color={colors.white}>{`แสดงบัตรประชาชนไว้ด้านหน้าของคุณ \nเพื่อแสดงความเป็นเจ้าของบัตร`}</TLight>
            <Image source={images.selfie} style={{ width: widthView * .6 }} resizeMode="contain"  />

            <View style={{ marginHorizontal: 24, marginTop: '6%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={images.stroke1} style={{ marginTop: '3%' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รูปภาพไม่เบลอ ใบหน้าชัดเจน และเห็นภาพบัตรเต็มใบ</TLight>
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
              // onPress={() => navigation.navigate('tutorialBackCamera')}
            />
          </View>
        </View>
      </Screen>
    )
  }
}