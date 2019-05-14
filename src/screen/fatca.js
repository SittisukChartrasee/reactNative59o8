import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
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
import { fatca } from '../redux/actions/commonAction'
import { navigateAction } from '../redux/actions'
import setMutation from '../containers/mutation'
import Modal from '../component/modal'

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
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {
  state = {
    modal: {
      visible: false
    },
  }
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
        onPress: () => this.setState({ modal: { visible: false } })
      }
      return this.setState({ modal })
    } else {
      this.props.saveFatca({ variables: { input: data } })
        .then(res => {
          if (res.data.saveFatca.success) {
            navigateAction({ ...this.props, page: 'fraud' })
          } else if (!res.data.saveFatca.success) {
            const modal = {
              dis: res.data.saveFatca.message,
              visible: true,
              onPress: () => this.setState({ modal: { visible: false } })
            }
            return this.setState({ modal })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    const { navigation } = this.props
    const { modal } = this.state
    const fatca = this.props.fatcaReducer.fatca
    return (
      <Screen color="transparent">
        <NavBar
          title="สถานะพลเมืองสหรัฐ"
          navLeft={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
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
        {
          Modal(modal)
        }
      </Screen>
    )
  }
}