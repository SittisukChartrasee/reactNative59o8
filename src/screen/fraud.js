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
  updateUser: bindActionCreators(updateUser, dispatch)
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

  onNext = async () => {

    const data = {
      hasLaunderingRecord: checkActiveData(this.props.user.fraud.choice).IS_TRUE,
      isPolitician: checkActiveData(this.props.user.fraud.choice).IS_TRUE
    }

    if (!checkActiveData(this.props.user.fraud.choice).IS_INCORRECT) {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        labelBtn: 'ติดต่อ 02 673 3888',
        onPress: () => Linking.openURL(`tel:026733888`),
        onPressClose: () => this.props.updateRoot('modal', { visible: false })
      }
      return this.props.updateRoot('modal', modal)
    } else {
      this.props.saveFraud({ variables: { input: data } })
        .then(res => {
          console.log(res)
          if (res.data.saveFraud.success) {
            this.props.navigateAction({ ...this.props, page: 'profile' })
          }
        })
        .catch(err => {
          console.log(err)
        })
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
