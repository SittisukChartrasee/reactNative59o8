import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'

const fields = [
  {
    label: 'ธนาคารกรุงเทพ',
    image: images.iconBbl,
    type: 'buttonCard',
  }, {
    label: 'ธนาคารกสิกรไทย',
    image: images.iconkbank,
    type: 'buttonCard',
  }, {
    label: 'ธนาคารไทยพาณิชย์',
    image: images.iconscb,
    type: 'buttonCard',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  handleInput = (props) => {
    console.log(props)
  }

  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="เลือกธนาคาร"
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
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              init: d.init,
              image: d.image,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

      </Screen>
    )
  }
}