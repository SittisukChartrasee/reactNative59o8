import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Modal,
  AsyncStorage,
  ActivityIndicator,
  NativeModules
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
import { imageRisk } from './data'
import { root } from '../../redux/actions/commonAction'
import { getInvestmentAfterApprove } from '../../containers/query'
import setMutation from '../../containers/mutation'
import getnativeModules from '../../containers/hoc/infoAppNativeModules'

const query = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@withApollo
@setMutation
@getnativeModules
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
  }

  componentDidMount = () => {
    query(this.props.client, {
      query: getInvestmentAfterApprove,
    }, val => {
      this.setState({ ...val.data.getInvestmentAfterApprove })
    })
  }

  componentWillUnmount = () => {
    this.props.updateRoot('password', '')
  }

  onNext = async () => {
    this.onCallApi()
  }

  onConfirm = async () => {
    this.onCallApi()
    this.props.toggleModal({ visible: false })
    setTimeout(() => Linking.openURL('https://k-invest.kasikornbankgroup.com/CustomerRisk/default.aspx?lang=TH'), 100)
  }

  onCallApi = async () => {
    NativeModules.KMyFundOnboarding.autoLogin(this.props.root.password, await AsyncStorage.getItem('user_token'))
    NativeModules.KMyFundOnboarding.saveRegisterFlag(NativeModules.KMyFundOnboarding.STATUS_APPROVE)
    this.props.saveFCMToken({
      variables: {
        input: {
          FCMToken: this.props.fcm,
          userToken: await AsyncStorage.getItem('user_token')
        }
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  render() {
    const {
      riskLevel,
      descTH,
      nameTH,
      assetClass,
      fundCodeKAsset,
      returnText
    } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="ยืนยันผลการประเมินความเสี่ยง"
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
              <Image source={riskLevel ? imageRisk[+riskLevel] : {}} />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TBold fontSize={28} color={colors.white}>{nameTH}</TBold>
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
                  <PieChart data={assetClass} />
                </View>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TBold fontSize={14}>ตัวอย่างสัดส่วน</TBold>
                  {/* <TLight fontSize={12} color={colors.grey}>{data[risk].risk.time}</TLight> // เวลาเอาออกเพราะยังไม่มีจากหลังบ้าน */} 
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
            onPress={this.onNext}
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
              onConfirm: this.onConfirm,
              onPressClose: () => this.props.toggleModal({ visible: false }),
            })}
          />
        </View>

        {/* <Modal
          visible
          transparent
        >
          <View style={{ flex: 1 }}>
              <View style={{ flex: 1, marginVertical: '50%', marginHorizontal: 20, backgroundColor: 'white' }}>
                <View style={{ flex: 1, justifyContent: 'center', aligmItems: 'center', flexDirection: 'row' }}>
                  <ActivityIndicator size="large" color={colors.emerald} />
                </View>
              </View>
          </View>
        </Modal> */}
      </Screen>
    )
  }
}