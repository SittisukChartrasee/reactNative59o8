import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Linking,
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
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
import { fatca, root } from '../redux/actions/commonAction'
import { navigateAction } from '../redux/actions'
import setMutation from '../containers/mutation'
import lockout from '../containers/hoc/lockout'
import typeModal from '../utility/typeModal'
import { errorMessage, modalMessage } from '../utility/messages'

const checkActiveData = (data) => {
  return data.reduce((pre, curr, inx, arr) => {
    if (curr.answer >= 0) pre.count += 1
    pre.leng = arr.length

    if (pre.leng === pre.count) pre.IS_TRUE = false
    else pre.IS_TRUE = true

    if (curr.answer >= 0) {
      pre.IS_SUM += curr.answer + 1
    }

    const chi = arr.map(d => d.answer).filter(d => d !== undefined)
    pre.IS_INCORRECT = chi.every(d => d)
    return pre
  }, {
    count: 0,
    leng: 0,
    IS_SUM: 0,
    IS_INCORRECT: false,
    IS_TRUE: true,
  })
}


const mapToProps = ({ fatcaReducer }) => ({ fatcaReducer })
const dispatchToProps = dispatch => ({
  updateFatca: bindActionCreators(fatca, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {

  onPress = (obj) => {
    this.props.updateFatca('fatca', obj.choice)
    this.props.updateFatca('sumFatca', checkActiveData(obj.choice).IS_SUM)
  }

  onGetFatca = () => {

    const fatca = this.props.fatcaReducer.fatca
    const status = checkActiveData(this.props.fatcaReducer.fatca).IS_INCORRECT
    const data = {
      isUSCitizen: fatca[0].answer === 0,
      isHoldingUsCard: fatca[1].answer === 0,
      isUSTaxPurposes: fatca[2].answer === 0,
      surrenderedUSCitizenship: fatca[3].answer === 0,
      transferFundsToAccountInUS: fatca[4].answer === 0,
      grantedToPersonWithUSAddress: fatca[5].answer === 0,
      mailOrCareOfAddressAccountOpenedKBank: fatca[6].answer === 0,
      currentOrMailingAddressAccountOpenedKbank: fatca[7].answer === 0,
      isUSPhoneNo: fatca[8].answer === 0,
    }

    return { status, data }
  }

  onNext = async () => {

    const { status, data } = this.onGetFatca()

    if (!status) {
      this.props.toggleModal({
        ...typeModal[modalMessage.callCenter.code],
        dis: modalMessage.callCenter.defaultMessage,
      })
    } else {
      try {
        const res = await this.props.saveFatca({ variables: { input: data } })

        const success = get(res, 'data.saveFatca.success', false)
        const code = get(res, 'code', errorMessage.messageIsNull.code)
        const message = get(res, 'message', errorMessage.messageIsNull.defaultMessage)

        if (success) {
          this.props.navigateAction({ ...this.props, page: 'fraud' })
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
      <Screen color="transparent">
        <NavBar
          title="สถานะพลเมืองสหรัฐ"
          navLeft={
            <TouchableOpacity
              // onPress={() => store.dispatch(StackActions.popToTop())}
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
        {
          Choice({
            init: this.props.fatcaReducer.fatca,
            onPress: this.onPress,
            paddingBottom: 100
          })
        }
        <NextButton disabled={checkActiveData(this.props.fatcaReducer.fatca).IS_TRUE} onPress={this.onNext} />
      </Screen>
    )
  }
}