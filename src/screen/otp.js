import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Keyboard from '../component/keyboard'
import Screen from '../component/screenComponent'
import { headerotp } from '../component/headSpace'
import { navigateAction, navigateReset } from '../redux/actions'
import colors from '../config/colors'
import { TLight, TBold, TMed } from '../component/texts'
import images from '../config/images'
import { velidateOtp, requestOtp } from '../redux/actions/root-active'
import { root } from '../redux/actions/commonAction'

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch),
  velidateOtp: bindActionCreators(velidateOtp, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: [false, false, false, false, false, false],
    number: '',
    currentDot: '',
    overRequest: false,
    overRequestUi: false,
    minutes: 3,
    ref_no: this.props.root.ref_no,
  }

  setNumber = async (obj) => {
    const { navigateAction, root } = this.props
    const data = {
      trans_id: root.trans_id,
      ref_no: root.ref_no,
      phone_no: root.phone_no,
      secret: obj.number,
    }

    this.setState({ ...obj })

    if (obj.key === 'del') this.setState({ currentDot: '•' })
    else obj.dot.map(d => d && this.delayDot(d))

    if (obj.number.length === 6) {
      this.props.velidateOtp(data)
        .then(res => {
          console.log(res)
          if (res.success) {
            navigateAction({ ...this.props, page: 'passcode' })
          } else if (!res.success) {
            if (res.details === 6) {
              this.setState({ overRequest: true, overRequestUi: true, minutes: res.details })
            }
            const modal = {
              dis: res.message,
              visible: true,
              onPress: () => this.props.updateRoot('modal', { visible: false }),
              onPressClose: () => this.props.updateRoot('modal', { visible: false })
            }
            return this.props.updateRoot('modal', modal)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  delayDot = (number) => {
    this.setState({ currentDot: number })
    setTimeout(() => {
      this.setState({ currentDot: '•' })
    }, 200)
  }

  onPress = async setTimeWaiting => {
    const { user } = this.props
    const data = {
      idCard: user.profile.idCard.replace(/ /g, ''),
      email: (user.contact.email).trim().toLowerCase(),
      mobilePhone: user.contact.mobilePhone.replace(/ /g, ''),
    }

    this.props.requestOtp(data)
      .then(res => {
        const resPonse = res
        console.log(resPonse)
        if (res.success) {
          setTimeWaiting(res.details)
          this.setState({ ref_no: res.result.ref_no })
        }
        else if (!res.success) {
          const modal = {
            dis: res.message,
            visible: true,
            onPress: () => this.props.updateRoot('modal', { visible: false }),
            onPressClose: () => this.props.updateRoot('modal', { visible: false })
          }
          return this.props.updateRoot('modal', modal)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'welcome' })
  onPrevPage = () => this.props.navigation.goBack()

  render() {
    const { ref_no } = this.state
    return (
      <Screen>
        {
          headerotp({
            dot: this.state.dot,
            currentDot: this.state.currentDot,
            refNo: ref_no || null,
            overRequest: this.state.overRequest,
            onPress: this.onPress,
            onPrevPage: this.onPrevPage,
            minutes: this.state.minutes,
            setState: () => this.setState({ overRequest: false }),
          })
        }

        {
          this.state.overRequestUi
            ? (
              <View style={{ flex: 1, backgroundColor: colors.white, marginTop: -40 }}>
                <TBold color={colors.softRed}>ท่านกรอกผิดเกินจำนวนครั้งที่กำหนด</TBold>
              </View>
            ) : <Keyboard setNumber={this.setNumber} />
        }

      </Screen>
    )
  }
}