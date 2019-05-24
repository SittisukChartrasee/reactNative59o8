import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  SafeAreaView,
} from 'react-native'
import { WebView } from 'react-native-webview'
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

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
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

  render() {
    const { navigateAction } = this.props

    return (
      <Screen color="transparent">
        <NavBar
          title="เชื่อมบัญชีธนาคาร"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: this.props.user.bank.urlbank }}
              onMessage={val => console.log('val'+ val)}
            />
          </View>
          <View style={{ height: 56, backgroundColor: colors.lightgrey, justifyContent: 'center' }}>
            <TMed fontSize={14} color={colors.grey}>คุณได้ออกจาก Kmyfunds และเข้าสู่เว็บไซต์ SCB แล้ว</TMed>
          </View>
          {
            this.state.status
              && (
                <TouchableOpacity
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