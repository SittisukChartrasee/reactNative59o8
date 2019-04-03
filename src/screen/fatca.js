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

const checkActiveData = (data) => {
  return data.reduce((pre, curr, inx, arr) => {
    if (curr.answer === 0 || curr.answer === 1) pre.count += 1
    pre.leng = arr.length
    
    if (pre.leng === pre.count) pre.IS_SAME = false
    else pre.IS_SAME = true

    return pre
  }, {
    count: 0,
    leng: 0,
    IS_SAME: true,
  })
}


const mapToProps = ({ fatcaReducer }) => ({ fatcaReducer })
const dispatchToProps = dispatch => ({
  updateFatca: bindActionCreators(fatca, dispatch),
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  onPress = (obj) => {
    const fatca = this.props.fatcaReducer.fatca
    const NewArr = fatca.map((curr, i) => (i === obj.key ? { ...curr, answer: obj.choice } : curr))
    const checkFatca = NewArr.every(curr => curr.answer === 0)
    this.props.updateFatca('fatca', NewArr)
    this.props.updateFatca('sumFatca', checkFatca)
  }

  render() {
    const { navigation, navigateAction } = this.props
    const fatca = this.props.fatcaReducer.fatca
    return (
      <Screen color="transparent">
        <NavBar
          title="สถานะพลเมืองสหรัฐ"
          navLeft={
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <Choice data={this.props.fatcaReducer.fatca} onPress={this.onPress} scroll={this.scroll} />
        <NextButton disabled={checkActiveData(fatca).IS_SAME} onPress={() => navigateAction({ ...this.props, page: 'profile' })}/>
      </Screen>
    )
  }
}