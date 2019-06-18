import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  SafeAreaView,
} from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'
// import { WebView } from 'react-native-webview'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { LongPositionButton, FlexButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import colors from '../../config/colors';
import { TBold, TMed } from '../../component/texts';
import setMutation from '../../containers/mutation'

const handleNameBank = key => {
  switch (key) {
    case 'ธนาคารกสิกรไทย': return 'Kbank'
    case 'ธนาคารไทยพาณิชย์': return 'SCB'
    default: return '[default bank]'
  }
}

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {
  static defaultProps = {
    user: {
      bank: {
        bankName: '',
        urlbank: 'https://online.kasikornbankgroup.com/K-Online/'
      }
    }
  }

  state = {
    status: false,
  }

  onHandleWebView = navEvent => {
    this.setState({ status: navEvent.title === 'การสมัครไม่สำเร็จ' })
    console.log(navEvent)
    if (!navEvent.loading) {
      switch (navEvent.title) {
        case 'การสมัครไม่สำเร็จ':
          break

        case 'ความสำเร็จในการลงทะเบียน':
            this.props.updateRegisterBankStatus()
            .then(res => {
              console.log(res) // ให้ทำอะไรหรอ
            })
            .catch(err => {
              console.log(err.toString())
            })
          this.props.navigation.navigate('statusBank')
          break

        default:
          break
      }
    }
  }

  render() {
    const bankName = this.props.navigation.getParam('bankName', '')
    const url = this.props.navigation.getParam('url', 'https://ws06.uatebpp.kasikornbank.com/PGSRegistration.do?reg_id=20190604114131234908234&langLocale=th_TH')
    return (
      <Screen color="transparent">
        <NavBar
          title="เชื่อมบัญชีธนาคาร"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.toggleModal({
                dis: 'คุณต้องการออกจากหน้าเชื่อมบัญชี\nใช่หรือไม่',
                visible: true,
                type: 'row',
                onPress: () => this.props.toggleModal({ visible: false }),
                onConfirm: async () => {
                  await this.props.toggleModal({ visible: false })
                  await this.props.navigation.navigate('chooseBank')
                },
                onPressClose: () => this.props.toggleModal({ visible: false }),
              })}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <WKWebView
              source={{ uri: url }}
              onProgress={(progress) => console.log(progress)}
              // injectedJavaScript={`(function(){
              //   document.querySelector("#emailAdd").value = '${user.contact.email}'
              //   document.querySelector("#mobileNo").value = '${user.contact.mobilePhone}'
              //   document.querySelector("#nationalID").value = '${user.profile.idCard}'
              //   return false
              // }())`}
              onNavigationResponse={(e) => console.log(e.nativeEvent)}
              onNavigationStateChange={this.onHandleWebView}
            />
            {/* <WebView
            // this.props.user.bank.urlbank
              source={{ uri: url }}
              injectedJavaScript={'(function(){ return "test element" }());'}
              onNavigationStateChange={this.onHandleWebView}
            /> */}
          </View>
          <View style={{ height: 56, backgroundColor: colors.lightgrey, justifyContent: 'center' }}>
            <TMed fontSize={14} color={colors.grey}>คุณได้ออกจาก Kmyfunds และเข้าสู่เว็บไซต์ {handleNameBank(bankName)} แล้ว</TMed>
          </View>
          {
            this.state.status
              && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    backgroundColor: colors.emerald,
                    marginVertical: 24,
                    marginHorizontal: 24,
                    padding: 10,
                    borderRadius: 100,
                  }}
                >
                  <TBold color={colors.white}>กลับ</TBold>
                </TouchableOpacity>
              )
          }
          
        </SafeAreaView>
      </Screen>
    )
  }
}