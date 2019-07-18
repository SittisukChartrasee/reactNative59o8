import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native'
import { withApollo } from 'react-apollo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TBold, TLight } from '../component/texts'
import { NavBar } from '../component/gradient'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import lockout from '../containers/hoc/lockout'
import Input from '../component/input'
import { LongPositionButton, NextButton } from '../component/button'
import { navigateAction } from '../redux/actions'
import { containerQuery, getStatusInProgress, getRegisterBankStatus } from '../containers/query'

const { width: widthScreen } = Dimensions.get('window')

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
})

@connect(mapToProps, dispatchToProps)
@lockout
@withApollo
export default class extends React.Component {
  state = {
    checkPoint: [
      {
        point: 'ขั้นตอนที่ 1',
        check: 'current', //success
        text: 'ยืนยันตัวตน'
      },
      {
        point: 'ขั้นตอนที่ 2',
        check: 'future',
        text: 'กรอกข้อมูลส่วนตัว'
      },
      {
        point: 'ขั้นตอนที่ 3',
        check: 'future',
        text: 'เชื่อมบัญชีธนาคาร'
      },
      {
        point: 'ขั้นตอนที่ 4',
        check: 'future',
        text: 'ทำแบบประเมินความเสี่ยง'
      }
    ],
    link: '',
  }

  componentDidMount = () => {
    containerQuery(this.props.client, {
      query: getStatusInProgress,
    }, val => {
      if (val.data.getStatusInProgress === 'Assure') {
        this.setState({
          checkPoint: this.state.checkPoint.map(
            (d, i) => i === 0
              ? ({ ...d, check: 'current' })
              : ({ ...d, check: 'future' })),
          link: 'condi'
        })
      } else if (val.data.getStatusInProgress === 'PersonalInformation') {
        this.setState({
          checkPoint: this.state.checkPoint.map(
            (d, i) => i < 1
              ? ({ ...d, check: 'success' })
              : i === 1
                ? ({ ...d, check: 'current' })
                : ({ ...d, check: 'future' })
          ),
          link: 'profile'
        })
      } else if (val.data.getStatusInProgress === 'LinkBank') {
        this.setState({
          checkPoint: this.state.checkPoint.map(
            (d, i) => i < 2
              ? ({ ...d, check: 'success' })
              : i === 2
                ? ({ ...d, check: 'current' })
                : ({ ...d, check: 'future' })
          ),
          link: 'tutorialBank'
        })
      } else if (val.data.getStatusInProgress === 'Suittest') {
        this.setState({
          checkPoint: this.state.checkPoint.map(
            (d, i) => i < 3
              ? ({ ...d, check: 'success' })
              : i === 3
                ? ({ ...d, check: 'current' })
                : ({ ...d, check: 'future' })
          ),
          link: 'suittest'
        })
      } else if (val.data.getStatusInProgress === 'Complete') {
        this.setState({
          checkPoint: this.state.checkPoint.map(
            (d, i) => i < 4
              ? ({ ...d, check: 'success' })
              : i === 4
                ? ({ ...d, check: 'current' })
                : ({ ...d, check: 'future' })
          ),
          link: 'complete'
        })
      }
    })
  }

  onNext = async () => {
    if (this.state.link === 'tutorialBank') {
      await this.props.client.query({ query: getRegisterBankStatus })
        .then((val) => {
          if (val.data.getRegisterBankStatus.status && val.data.getRegisterBankStatus.status !== 'SENT') {
            this.props.navigateAction({ ...this.props, page: 'statusBank' })
          } else {
            this.props.navigateAction({ ...this.props, page: this.state.link })
          }
        })
        .catch(() => this.props.navigateAction({ ...this.props, page: this.state.link }))
    } else {
      this.props.navigateAction({ ...this.props, page: this.state.link })
    }
  }

  render() {
    const { checkPoint } = this.state
    let sizing = { width: 108, height: 78 }
    return (
      <Screen>
        <NavBar
          title=" "
          color="transparent"
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
          <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
          <TBold fontSize={18} color={colors.white} mt="10" mb="20">{`ขั้นตอนการเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </SafeAreaView>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-start' }}>
          <KeyboardAwareScrollView
            enableOnAndroid
          >
            {checkPoint.map((props, index) => (
              <View
                key={props.point}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgrey',
                  paddingTop: 23,
                  paddingLeft: 38,
                  height: 102
                }}>
                <View style={{
                  alignItems: 'center',
                  height: '100%',
                }}>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: props.check !== 'future' ? colors.emerald : colors.smoky
                  }}>
                    {props.check === 'success' ? (
                      <Image
                        source={images.iconCheck}
                        style={{ height: 24, width: 24, borderRadius: 13, }}
                      />
                    ) : null}
                    {props.check === 'current' ? (
                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 13,
                        height: 13,
                        borderRadius: 13,
                        backgroundColor: colors.white
                      }} />
                    ) : null}
                    <View style={{
                      width: 4,
                      backgroundColor: colors.emerald
                    }} />
                  </View>
                  {index < checkPoint.length - 1 ? (
                    <View style={{
                      width: 4,
                      height: '100%',
                      backgroundColor: props.check !== 'future' && props.check !== 'current' ? colors.emerald : colors.smoky
                    }} />
                  ) : null}
                </View>
                <View style={{
                  paddingTop: 1,
                  paddingLeft: 21,
                  justifyContent: 'flex-start'
                }}>
                  <TLight fontSize={18} textAlign="left" color={colors.emerald} >{props.point}</TLight>
                  <TBold fontSize={20} mt="4" >{props.text}</TBold>
                </View>
              </View>
            ))}
          </KeyboardAwareScrollView>
          <LongPositionButton
            label="ดำเนินการต่อ"
            onPress={this.onNext}
          />
        </View>
      </Screen>
    )
  }
}


