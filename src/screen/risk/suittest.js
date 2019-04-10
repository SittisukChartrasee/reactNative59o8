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
    
    if (pre.leng === pre.count) pre.IS_SAME = false
    else pre.IS_SAME = true

    return pre
  }, {
    count: 0,
    leng: 0,
    IS_SAME: true,
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
    if (obj.type === 'checkbox') {
      this.props.updateSuittest('suittest', obj.choice)
    } else {
      const sum = obj.choice.every(curr => curr.answer === 0)
      this.props.updateSuittest('suittest', obj.choice)
      this.props.updateSuittest('sumSuittest', sum)
    }
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
        <NextButton disabled={checkActiveData(suittest).IS_SAME} onPress={() => navigateAction({ ...this.props, page: 'profile' })}/>
      </Screen>
    )
  }
}