import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import { PieChart } from '../../component/chart'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { RiskList } from '../../component/lists'
import { navigateAction } from '../../redux/actions'
import lockout from '../../containers/hoc/lockout'
import {
  getInvestment
} from '../../containers/query'

const query = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
export default class extends React.Component {
  state = {
    risk: 0,
    dataPieChart: [],
    dataTitle: [
      { title: 'ความเสี่ยงต่ำ', image: images.iconrisk12 },
      { title: 'ความเสี่ยงปานกลาง\nค่อนข้างต่ำ', image: images.iconrisk34 },
      { title: 'ความเสี่ยงปานกลาง\nค่อนข้างสูง', image: images.iconrisk56 },
      { title: 'ความเสี่ยงสูง', image: images.iconrisk78 },
    ]
  }

  componentDidMount = () => {
    const point = this.props.navigation.getParam('sumSuittest', 0)
    if (point <= 15) {
      this.setState({ risk: 0 })
    }
    else if (point <= 21) {
      this.setState({ risk: 1 })
    }
    else if (point <= 29) {
      this.setState({ risk: 2 })
    }
    else if (point > 30) {
      this.setState({ risk: 3 })
    }

    query(this.props.client, {
      query: getInvestment,
      variables: { point: `${point}` }
    }, val => this.setState({
      ...val.data.getInvestment,
      dataPieChart: val.data.getInvestment.assetClass.map((props) => {
        return {
          title: props.nameTH,
          color: props.color,
          percent: parseInt(props.weight),
        }
      })
    })
    )
  }

  onNext = () => {
    const { navigateAction } = this.props
    const { risk } = this.state
    navigateAction({ ...this.props, page: 'complete', params: { risk } })
  }

  render() {
    const { navigation } = this.props
    const {
      risk,
      descTH,
      assetClass,
      fundCodeKAsset,
      returnText,
      dataPieChart,
      dataTitle
    } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ผลการประเมินความเสี่ยง"
          navLeft={
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView contentContainerStyle={{ paddingTop: 40, paddingHorizontal: 24 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ marginBottom: 19 }}>
              <Image source={dataTitle[risk].image} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>{dataTitle[risk].title}</TBold>
              <TBold fontSize={16} color={colors.white}>{`ผลตอบแทนที่คาดหวังโดยเฉลี่ย ${returnText} ต่อปี`}</TBold>
            </View>

            <TLight color={colors.white} mb={40}>{descTH}</TLight>

            <View style={{ backgroundColor: colors.white, width: '100%', minHeight: 352, paddingVertical: 16, borderRadius: 16, overflow: 'hidden' }}>
              <View style={{ height: 80, flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={images.bookmark} style={{ marginRight: 8 }} />
                    <TLight fontSize={14} textAlign="left">กองทุนที่แนะนำ</TLight>
                  </View>
                  <TBold fontSize={28} textAlign="left">{fundCodeKAsset}</TBold>
                </View>
                <View style={{ width: 75, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <PieChart data={dataPieChart} />
                </View>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TBold fontSize={14}>สัดส่วนการลงทุนตามพอร์ตแนะนำ</TBold>
                  {/* <TLight fontSize={12} color={colors.grey}>{dataTitle[risk].time}</TLight> */}
                  {/* รอถามเรื่องวันที่ อัปเดท พอร์ต  KA ตอบกลับมาว่า ตัดออก */}
                </View>
                {assetClass ? sortBy(assetClass, [(o) => o.sortOrder]).map(RiskList) : null}
              </View>

            </View>
          </View>
        </ScrollView>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="ถัดไป"
            style={{ marginHorizontal: 24 }}
            onPress={this.onNext}
          />
        </View>
      </Screen>
    )
  }
}