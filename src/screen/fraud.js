import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Linking
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../component/texts'
import colors from '../config/colors'
import { LongButton, NextButton } from '../component/button'
import images from '../config/images'
import Input from '../component/input'
import { Choice } from '../component/cardSelect'
import { root, updateUser } from '../redux/actions/commonAction'
import { navigateAction } from '../redux/actions'
import setMutation from '../containers/mutation'
import lockout from '../containers/hoc/lockout'
import typeModal from '../utility/typeModal'
import { errorMessage, modalMessage } from '../utility/messages'

const checkActiveData = data => {
  return data.reduce(
    (pre, curr, inx, arr) => {
      if (curr.answer >= 0) pre.count += 1
      pre.leng = arr.length

      if (pre.leng === pre.count) pre.IS_TRUE = false
      else pre.IS_TRUE = true

      if (curr.answer >= 0) {
        pre.IS_SUM += curr.answer + 1
      }

      const chi = arr.map((d, i) => i === 0 && d.answer === 0 ? false : true)
      pre.IS_INCORRECT = chi.every(d => d)
      return pre
    },
    {
      count: 0,
      leng: 0,
      IS_SUM: 0,
      IS_INCORRECT: false,
      IS_TRUE: true
    }
  )
}

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(
  mapToProps,
  dispatchToProps
)
@setMutation
@lockout
export default class extends React.Component {

  onPress = obj => {
    const { user } = this.props
    this.props.updateUser('fraud', {
      ...user.fraud,
      choice: obj.choice,
      sumChoice: checkActiveData(obj.choice).IS_SUM
    })
  }

  onGetFraud = () => {

    const status = checkActiveData(this.props.user.fraud.choice).IS_INCORRECT
    const data = {
      hasLaunderingRecord: this.props.user.fraud.choice[0].answer === 0,
      isPolitician: this.props.user.fraud.choice[1].answer === 0
    }

    return { status, data }
  }

  onNext = async () => {

    const { status, data } = this.onGetFraud()

    if (!status) {
      this.props.toggleModal({
        ...typeModal[modalMessage.callCenter.code],
        dis: modalMessage.callCenter.defaultMessage,
      })
    } else {

      try {
        const res = await this.props.saveFraud({ variables: { input: data } })
        const success = get(res, 'data.saveFraud.success', false)
        const code = get(res, 'code', errorMessage.messageIsNull.code)
        const message = get(res, 'message', errorMessage.messageIsNull.defaultMessage)

        if (success) {
          this.props.navigateAction({ ...this.props, page: 'profile' })
        } else {
          this.props.toggleModal({
            ...typeModal[code],
            dis: message,
          })
        }
      } catch (error) {
        this.props.toggleModal({
          ...typeModal[errorMessage.requestError.code],
          dis: errorMessage.requestError.defaultMessage,
        })
      }
    }
  }

  render() {
    return (
      <Screen color='transparent'>
        <NavBar
          title='สถานะที่ถูกกำหนด'
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity onPress={() => this.props.lockout()}>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />
        {Choice({
          init: this.props.user.fraud.choice,
          onPress: this.onPress,
          paddingBottom: 100
        })}
        <NextButton
          disabled={checkActiveData(this.props.user.fraud.choice).IS_TRUE}
          onPress={this.onNext}
        />
      </Screen>
    )
  }
}
