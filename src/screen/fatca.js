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

const mapToProps = ({ fatcaReducer }) => ({ fatcaReducer })
const dispatchToProps = dispatch => ({
  updateFatca: bindActionCreators(fatca, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {

  onPress = (obj) => {
    const fatca = this.props.fatcaReducer.fatca
    const NewArr = fatca.map((curr, i) => (i === obj.key ? { ...curr, answer: obj.choice } : curr))
    const checkFatca = NewArr.every(curr => curr.answer === 0)
    this.props.updateFatca('fatca', NewArr)
    this.props.updateFatca('sumFatca', checkFatca)

    // if (this.state.layout[question + 1] !== undefined) {
    //   this.scroll.scrollTo({ y: this.state.layout[question + 1], animated: true })
    // }
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="สถานะพลเมืองสหรัฐ"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={{ paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <Choice data={this.props.fatcaReducer.fatca} onPress={this.onPress} />
          {/* disabledChoice={0} */}
        </ScrollView>
      </Screen>
    )
  }
}