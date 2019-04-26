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
    label: 'โทรศัพท์ที่ทำงาน',
    type: 'textInput',
    field: 'workPhone',
  }, {
    label: 'โทรศัพท์บ้าน',
    type: 'textInput',
    field: 'homePhone',
  }, {
    label: 'หมายเลขโทรศัพท์มือถืิอ',
    type: 'textInput',
    field: 'mobilePhone',
  }, {
    label: 'อีเมล',
    field: 'email',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลการติดต่อ"
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
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}