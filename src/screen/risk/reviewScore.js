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
import { data } from './data'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  static defaultProps = {
    risk: 3,
  }
  render() {
    const { navigateAction, risk } = this.props
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
            <View style={{ marginBottom: 19 }}>
              <Image source={data[risk].image}/>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>{data[risk].title}</TBold>
              <TBold fontSize={16} color={colors.white}>{data[risk].disTitle}</TBold>
            </View>

            <TLight color={colors.white} mb={40}>{data[risk].discription}</TLight>

            <View style={{ backgroundColor: colors.white, width: '100%', minHeight: 352, paddingVertical: 16, borderRadius: 16, overflow: 'hidden' }}>
              <View style={{ height: 80, flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={images.bookmark} style={{ marginRight: 8 }} />
                    <TLight fontSize={14} textAlign="left">กองทุนที่แนะนำ</TLight>
                  </View>
                  <TBold fontSize={28} textAlign="left">{data[risk].risk.title}</TBold>
                </View>
                <View style={{ width: 75, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <PieChart data={data[0].risk.data}/>
                </View>
              </View>
              
              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TBold fontSize={14}>ตัวอย่างสัดส่วน</TBold>
                  <TLight fontSize={12} color={colors.grey}>{data[risk].risk.time}</TLight>
                </View>
                { data[risk].risk.data.map(RiskList) }
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