import React from 'react'
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'

export default class extends React.Component {
  render() {
    return (
      <Screen>
        <NavBar color="transparent" title="ถ่ายบัตรประชาชน" />

        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <TLight fontSize={16} mt="39" color={colors.white}>{`ข้อมูลบนรูปบัตรประชาชนต้องชัดเจน \nไม่มีการปิดบังส่วนหนึ่งส่วนใดของบัตร`}</TLight>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{}} style={{ width: '67%', height: '31%', backgroundColor: 'green', borderRadius: 5 }} />
            </View>

            <View style={{ marginHorizontal: 22 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{}} style={{ width: 14, height: 14, backgroundColor: 'white' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">รูปภาพไม่เบลอ เห็นตัวอักษรชัดเจน และเห็นภาพบัตรเต็มใบ</TLight>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Image source={{}} style={{ width: 14, height: 14, backgroundColor: 'white' }} />
                <View style={{ paddingHorizontal: 16 }}>
                  <TLight fontSize={16} color={colors.smoky} textAlign="left">ไม่ถ่ายสะท้อนแสง และไม่มืด หรือสว่างจนเกินไป</TLight>
                </View>
              </View>
            </View>
          </View>
        </View>

        <LongButton
          label="รับทราบ"
          // onPress={() => navigation.navigate('tutorialBackCamera')}
          style={{ marginHorizontal: 24, marginTop: '19%' }}
        />
      </Screen>
    )
  }
}