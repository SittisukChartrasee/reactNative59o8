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

const dataImage = [
  { image: images.iconrisk1 },
  { image: images.iconrisk1 }, // **start this item
  { image: images.iconrisk2 },
  { image: images.iconrisk3 },
  { image: images.iconrisk4 },
  { image: images.iconrisk5 },
  { image: images.iconrisk6 },
  { image: images.iconrisk7 },
  { image: images.iconrisk8 },
]

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
    crrLevel: '',
    descEN: '',
    descTH: '',
    fundCodeKAsset: '',
    nameEN: '',
    nameTH: '',
    returnText: '',
    riskLevel: 0,
  }

  componentDidMount = () => {
    const point = this.props.navigation.getParam('sumSuittest', 0)

    query(this.props.client, {
      query: getInvestment
    }, val => {
      const {
        crrLevel,
        descEN,
        descTH,
        fundCodeKAsset,
        nameEN,
        nameTH,
        returnText,
        assetClass,
        riskLevel,
      } = val.data.getInvestment

      this.setState({
        crrLevel,
        descEN,
        descTH,
        fundCodeKAsset,
        nameEN,
        nameTH,
        returnText,
        assetClass,
        riskLevel,
        dataPieChart: val.data.getInvestment.assetClass.map((props) => {
          return {
            title: props.nameTH,
            color: props.color,
            percent: parseInt(props.weight),
          }
        })
      })
    })
  }

  onNext = () => {
    const { risk } = this.state
    this.props.navigateAction({ ...this.props, page: 'complete', params: { risk } })
  }

  render() {
    const {
      nameTH,
      descTH,
      assetClass,
      fundCodeKAsset,
      returnText,
      dataPieChart,
      riskLevel,
    } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ผลการประเมินความเสี่ยง"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
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
              <Image source={dataImage[+riskLevel].image} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>{nameTH}</TBold>
              <TBold fontSize={16} color={colors.white}>{`ผลตอบแทนที่คาดหวังโดยเฉลี่ย ${returnText} ต่อปี`}</TBold>
            </View>

            <TLight color={colors.white} mb={40}>{descTH.replace('↵','')}</TLight>

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