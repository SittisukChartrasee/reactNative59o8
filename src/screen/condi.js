import React from 'react'
import {
  View,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  NativeModules
} from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'
import { withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import colors from '../config/colors'
import images from '../config/images'
import { isIphoneX } from '../config/helper'
import { TLight } from '../component/texts'
import { NavBar } from '../component/gradient'
import { navigateAction } from '../redux/actions'
import setMutation from '../containers/mutation'
import { containerQuery, getTermAndCondition } from '../containers/query'
import { LongButton } from '../component/button'
import lockout from '../containers/hoc/lockout'
import fonts from '../config/fonts';

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
@withApollo
export default class extends React.Component {
  state = {
    agree: false,
    html: ''
  }

  componentDidMount = async () => {
    const a = await AsyncStorage.getItem('user_token')
    const b = await AsyncStorage.getItem('userToken')
    const c = await AsyncStorage.getAllKeys()
    console.log(a, b, c)

    containerQuery(
      this.props.client,
      { 
        query: getTermAndCondition
      },
      (val) => {
        console.log(val)
        this.setState({ html: val.data.getTermAndCondition })
      }
    )
  }

  onNext = async () => {
    // NativeModules.KMyFundOnboarding.saveRegisterFlag(NativeModules.KMyFundOnboarding.STATUS_APPROVE)
    this.props.acceptTerm()
      .then(res => {
        console.log(res)
        if (res.data.acceptTerm.success) {
          this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera' })
        }
      })
  }

  render() {
    const { agree } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white', marginBottom: isIphoneX() ? '7%' : 16 }}>
        <NavBar
          title="เงื่อนไขการเปิดบัญชี"
          navRight={
            <TouchableOpacity onPress={() => this.props.lockout()}>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <WKWebView
          source={{ html: this.state.html }}
          injectedJavaScript={`(function(){
            document.querySelector("#content").style.fontFamily = "SukhumvitSet-Light";
            document.querySelector("#content").style.fontSize = '40px';
            document.querySelector("#content").style.marginRight = '30px';
            document.querySelector("#content").style.marginLeft = '30px';
            document.querySelector("#content").style.marginTop = '40px';
            document.querySelector("#content").style.color = '${colors.grey}';
            return false
          }())`}
        />
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ agree: !agree })}
            style={{
              backgroundColor: colors.lightgrey,
              padding: 16,
              flexDirection: 'row',
              marginHorizontal: 24,
              marginTop: 16,
              borderRadius: 12,
            }}
          >
            <View style={{ marginRight: 16, marginTop: 5 }}>
              {
                agree
                  ? <Image
                    source={images.iconCheck}
                    style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red' }}
                  />
                  : <View style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.grey }} />
              }
            </View>
            <View style={{ flex: 1 }}>
              <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
            </View>
          </TouchableOpacity>
          <LongButton
            label="ยืนยัน"
            onPress={this.onNext}
            style={{ marginHorizontal: 24 }}
            disabled={!agree}
          />
        </View>
      </View>
    )
  }
}
