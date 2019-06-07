import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'
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
import { data } from './data'
import {
  getInvestment
} from '../../containers/query'

const query = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
export default class extends React.Component {
  state = {
    risk: 0,
  }

  componentDidMount = () => {
    const sumSuittest = this.props.navigation.getParam('sumSuittest', 0)
    let point = 1
    if (sumSuittest <= 15) {
      this.setState({ risk: 0 })
      point = 1
    }
    else if (sumSuittest <= 21) {
      this.setState({ risk: 1 })
      point = 2
    }
    else if (sumSuittest <= 29) {
      this.setState({ risk: 2 })
      point = 3
    }
    else if (sumSuittest > 30) {
      this.setState({ risk: 3 })
      point = 4
    }

    query(this.props.client, {
      query: getInvestment,
      variables: { point: `${point}` }
    }, val => this.setState({ ...val.data.getInvestment })
    )
  }

  render() {
    const { navigateAction, navigation } = this.props
    const { risk, descTH, assetClass, fundCodeKAsset, returnText } = this.state
    console.log(this.state)
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ยืนยันผลการประเมินความเสี่ยง"
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
              <Image source={data[risk].image} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>{data[risk].title}</TBold>
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
                  <PieChart data={data[0].risk.data} />
                </View>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TBold fontSize={14}>ตัวอย่างสัดส่วน</TBold>
                  <TLight fontSize={12} color={colors.grey}>{data[risk].risk.time}</TLight>
                </View>
                {assetClass ? assetClass.map(RiskList) : null}
              </View>

            </View>
          </View>
        </ScrollView>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="เริ่มต้นใช้งาน"
            style={{ marginHorizontal: 24 }}
            onPress={() => alert('เข้าใช้งาน KmyFunds ปัจจุบัน')}
          />
          <LongButton
            label="ทำแบบประเมินความเสี่ยงใหม่"
            bgTransparent
            style={{ marginHorizontal: 24 }}
            onPress={() => this.props.toggleModal({
              dis: 'คุณต้องการออกจากหน้าเชื่อมบัญชี\nใช่หรือไม่',
              visible: true,
              swap: true,
              type: 'row',
              onPress: () => this.props.toggleModal({ visible: false }),
              onConfirm: async () => {
                this.props.toggleModal({ visible: false })
                setTimeout(() => Linking.openURL('https://google.com'), 100)
              },
              onPressClose: () => this.props.toggleModal({ visible: false }),
            })}
          />
        </View>
      </Screen>
    )
  }
}