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

const mapToProps = () => ({ })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    choice: [
      {
        title: 'ท่านมีประวัติความผิดกฏหมายฟอกเงินย้อนหลังภายใน 3 ปีหรือไม่',
        choice: [
          'ใช่',
          'ไม่ใช่'
        ]
      }, {
        title: 'ท่านมีประวัติความผิดกฏหมายฟอกเงินย้อนหลังภายใน 3 ปีหรือไม่',
        choice: [
          'ใช่',
          'ไม่ใช่'
        ]
      }
    ],
    sumChoice: 0,
  }

  onPress = (obj) => {
    this.setState({
      choice: obj.choice,
      sumChoice: checkActiveData(obj.choice).IS_SUM
    })
  }

  render() {
    const { navigation, navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="สถานะที่ถูกกำหนด"
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
            init: this.state.choice,
            onPress: this.onPress,
            paddingBottom: 100
          })
        }
        <NextButton disabled={checkActiveData(this.state.choice).IS_TRUE} onPress={() => navigateAction({ ...this.props, page: 'profile' })}/>
      </Screen>
    )
  }
}