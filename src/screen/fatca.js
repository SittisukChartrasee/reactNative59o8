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
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  onPress = (obj) => {
    this.props.updateFatca('fatca', obj.choice)
    this.props.updateFatca('sumFatca', checkActiveData(obj.choice).IS_SUM)
  }

  onNext = async () => {
               
    const { navigateAction, fatcaReducer } = this.props
    const fatca = fatcaReducer.fatca

    const data = {
      isUSCitizen: checkActiveData(fatca).IS_TRUE,
      isHoldingUsCard: checkActiveData(fatca).IS_TRUE
    }

    if (!checkActiveData(fatca).IS_INCORRECT) {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        labelBtn: 'ติดต่อ 02 673 3888',
        onPress: () => Linking.openURL(`tel://026733888`),
        onPressClose: () => this.props.updateRoot('modal', { visible: false })
      }
      this.props.updateRoot('modal', modal)
    } else {
      this.props.saveFatca({ variables: { input: data } })
        .then(res => {
          if (res.data.saveFatca.success) navigateAction({ ...this.props, page: 'fraud' })
          else if (!res.data.saveFatca.success) {
            const modal = {
              dis: res.data.saveFatca.message,
              visible: true,
              onPress: () => this.props.updateRoot('modal', { visible: false }),
              onPressClose: () => this.props.updateRoot('modal', { visible: false })
            }
            this.props.updateRoot('modal', modal)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    const { navigation } = this.props
    const fatca = this.props.fatcaReducer.fatca
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
        <NextButton disabled={checkActiveData(fatca).IS_TRUE} onPress={this.onNext} />
      </Screen>
    )
  }
}