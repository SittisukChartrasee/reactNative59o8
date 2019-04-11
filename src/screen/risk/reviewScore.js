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

const data = [
  {
    title: 'ตราสารหนี้ไทย',
    color: rgb(29, 58, 97),
    percent: 34,
  }, {
    title: 'ตราสารหนี้ระยะสั้น',
    color: rgb(170, 186, 194),
    percent: 7,
  }, {
    title: 'หุ้นต่างประเทศ',
    color: rgb(123, 191, 159),
    percent: 29,
  }, {
    title: 'หุ้นไทย',
    color: rgb(137, 36, 33),
    percent: 23,
  }, {
    title: 'กองทุนทางเลือก',
    color: rgb(212, 188, 144),
    percent: 7,
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  static defaultProps = {
    status: true,
  }
  render() {
    const { navigateAction, status } = this.props
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ผลการประเมินความเสี่ยง"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: colors.white, width: 80, height: 80, marginBottom: 19 }}>
              <TBold fontSize={50} color={colors.white}>3</TBold>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>ความเสี่ยงปานกลาง</TBold>
              <TBold fontSize={16} color={colors.white}>ผลตอบแทนที่คาดหวังโดยเฉลี่ย 5.5% ต่อปี</TBold>
            </View>

            <TLight color={colors.white} mb={40}>คุณเป็นนักลงทุนที่ยอมรับความเสี่ยงได้ปานกลางถึงค่อนข้างต่ำ จัดเป็นผู้ลงทุนที่รับความเสี่ยงได้น้อย เน้นปกป้องเงินลงทุน โดยมุ่งหวังโอกาสรับผลตอบแทนที่สม่ำเสมอจากการลงทุน</TLight>

            <View style={{ backgroundColor: colors.white, width: '100%', minHeight: 352, paddingVertical: 16, borderRadius: 16, overflow: 'hidden' }}>
              <View style={{ height: 80, flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 11, height: 14, marginRight: 8, borderRadius: 3, backgroundColor: colors.emerald }}/>
                    <TLight fontSize={14} textAlign="left">กองทุนที่แนะนำ</TLight>
                  </View>
                  <TBold fontSize={28} textAlign="left">K-FITS</TBold>
                </View>
                <View style={{ width: 75, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <PieChart data={data}/>
                </View>
              </View>
              
              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TBold fontSize={14}>ตัวอย่างสัดส่วน</TBold>
                  <TLight fontSize={12} color={colors.grey}>ณ. วันที่ 4 ม.ค. 62</TLight>
                </View>
                { data.map(RiskList) }
              </View>

            </View>
          </View>
        </ScrollView>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="ถัดไป"
            style={{ marginHorizontal: 24 }}
            onPress={() => navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
          />
        </View>
      </Screen>
    )
  }
}