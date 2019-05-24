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
import Modal from '../component/modal'

const mapToProps = ({ root, user }) => ({ root, user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  navigateReset: bindActionCreators(navigateReset, dispatch),
  requestOtp: bindActionCreators(requestOtp, dispatch),
  velidateOtp: bindActionCreators(velidateOtp, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    dot: [false, false, false, false, false, false],
    number: '',
    currentDot: '',
    restart: false,
    modal: false,
    dis: ''
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
            this.setState({ dis: res.message, modal: true })
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

  onPress = async () => {
    const { user } = this.props
    const data = {
      idCard: user.profile.idCard,
      email: (user.contact.email).trim().toLowerCase(),
      mobilePhone: user.contact.mobilePhone,
    }

    this.props.requestOtp(data)
      .then(res => {
        console.log(res)
        if (res.success) {
          this.setState({ restart: true, })
        }
        else if (!res.success) {
          this.setState({ dis: res.message, modal: true })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // onPrevPage = () => this.props.navigateReset({ ...this.props, page: 'welcome' })
  onPrevPage = () => this.props.navigation.goBack()

  render() {
    const { modal, dis } = this.state
    const { ref_no } = this.props.root
    return (
      <Screen>
        {
          headerotp({
            dot: this.state.dot,
            currentDot: this.state.currentDot,
            restart: this.state.restart,
            refNo: ref_no || null,
            onPress: this.onPress,
            onPrevPage: this.onPrevPage,
          })
        }
        <Keyboard setNumber={this.setNumber} />
        {
          Modal({
            visible: modal,
            dis,
            onPress: () => this.setState({ dis: '', modal: false })
          })
        }
      </Screen>
    )
  }
}