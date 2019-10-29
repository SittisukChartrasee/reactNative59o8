import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'
import { PieChart } from '../../chart'
import Screen from '../../screenComponent'
import { NavBar } from '../../gradient'
import { TText, TBold, TSemiBold, TLight } from '../../texts'
import colors from '../../../config/colors'
import { LongButton } from '../../button'
import images from '../../../config/images'
import { RiskList } from '../../lists'
import { navigateAction } from '../../../redux/actions'
import lockout from '../../../containers/hoc/lockout'
import { getInvestment } from '../../../containers/query'
import typeModal from '../../../utility/typeModal'
import { root } from '../../../redux/actions/commonAction'
import { onStore } from '../../../redux/store'
import { errorMessage } from '../../../utility/messages'

const dataImage = [
  null,
  images.iconrisk1, // **start this item
  images.iconrisk2,
  images.iconrisk3,
  images.iconrisk4,
  images.iconrisk5,
  images.iconrisk6,
  images.iconrisk7,
  images.iconrisk8,
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
export default class extends React.Component {
  state = {
    riskLevel: 0,
    crrLevel: '',
    nameTH: '',
    nameEN: '',
    returnText: '',
    descTH: '',
    descEN: '',
    fundCodeKAsset: '',
    assetClass: [],
    loading: true
  }

  componentDidMount = async () => {

    try {

      const res = await this.props.client.query({ query: getInvestment })
      const dataInvestment = get(res, 'data.getInvestment', {})

      this.setState({ ...dataInvestment, loading: false })

    } catch (error) {
      this.setState({ loading: false })

      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  onNext = async () => {
    await onStore.dispatch(NavigationActions.navigate({ routeName: 'complete' }))
    this.props.updateRoot('screenModal', { visible: false, page: 'reviewScore' })
  }

  onGoBack = async () => {
    await onStore.dispatch(NavigationActions.navigate({ routeName: 'suittest' }))
    this.props.updateRoot('screenModal', { visible: false, page: 'reviewScore' })
  }

  render() {
    const {
      nameTH,
      descTH,
      assetClass,
      fundCodeKAsset,
      returnText,
      riskLevel,
    } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ผลการประเมินความเสี่ยง"
          navLeft={
            <TouchableOpacity
              onPress={this.onGoBack}
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
            {
              this.state.loading ?
                <ActivityIndicator size="large" color={colors.white} /> : (
                  <>
                    <View style={{ marginBottom: 19 }}>
                      <Image source={dataImage[+riskLevel]} />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                      <TBold fontSize={28} color={colors.white}>{nameTH}</TBold>
                      <TBold fontSize={16} color={colors.white}>{`ผลตอบแทนที่คาดหวังโดยเฉลี่ย ${returnText} ต่อปี`}</TBold>
                    </View>

                    <TLight color={colors.white} mb={40}>{descTH.replace('↵', '')}</TLight>

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
                          <PieChart data={assetClass} />
                        </View>
                      </View>

                      <View style={{ flex: 1, paddingHorizontal: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <TBold fontSize={14}>สัดส่วนการลงทุนตามพอร์ตแนะนำ</TBold>
                        </View>
                        {assetClass ? sortBy(assetClass, [(o) => o.sortOrder]).map(RiskList) : null}
                      </View>

                    </View>
                  </>
                )
            }
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