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
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton, NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { Choice } from '../../component/cardSelect'
import { suittest } from '../../redux/actions/commonAction'
import { navigateAction } from '../../redux/actions'

const checkActiveData = (data) => {
  return data.reduce((pre, curr, inx, arr) => {
    if (curr.answer >= 0) pre.count += 1
    pre.leng = arr.length
    
    if (pre.leng === pre.count) pre.IS_TRUE = false
    else pre.IS_TRUE = true

    if (curr.answer >= 0) {
      pre.IS_SUM += curr.answer + 1
    }
    return pre
  }, {
    count: 0,
    leng: 0,
    IS_SUM: 0,
    IS_TRUE: true,
  })
}


const mapToProps = ({ suitReducer }) => ({ suitReducer })
const dispatchToProps = dispatch => ({
  updateSuittest: bindActionCreators(suittest, dispatch),
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  onPress = (obj) => {
    this.props.updateSuittest('suittest', obj.choice)
    this.props.updateSuittest('sumSuittest', checkActiveData(obj.choice).IS_SUM)
  }

  render() {
    const { navigation, navigateAction } = this.props
    const suittest = this.props.suitReducer.suittest
    return (
      <Screen color="transparent">
        <NavBar
          title="แบบประเมินความเสี่ยง"
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
        {
          Choice({
            init: this.props.suitReducer.suittest,
            onPress: this.onPress,
            paddingBottom: 100
          })
        }
        <NextButton disabled={checkActiveData(suittest).IS_TRUE} onPress={() => navigateAction({ ...this.props, page: 'reviewScore' })}/>
      </Screen>
    )
  }
}