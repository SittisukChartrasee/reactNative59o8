import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../component/screenComponent'
import { NavBar } from '../component/gradient'
import { LongPositionButton } from '../component/button'
import images from '../config/images'
import Input from '../component/input'
import modal from '../component/modal'
import { navigateAction } from '../redux/actions'
import colors from '../config/colors';
import { TBold } from '../component/texts';

const card = [
  {
    label: 'เลขบัตรประชาชน',
    type: 'textInput',
    value: '1 1234 12345 12 1'
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  render() {
    const { navigateAction } = this.props

    return (
      <Screen color="transparent">
        <NavBar
          title="ตั้งรหัสผ่านใหม่"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        
        <View style={{ flex: 1, backgroundColor: colors.white, paddingVertical: 24 }}>
          {
            card.map((d, key) => Input({
              label: d.label,
              value: d.value,
              type: d.type,
              image: d.image,
              number: d.number,
              disabled: d.disabled,
            }, key))
          }
        </View>

        <LongPositionButton bg={colors.lightgrey} label="ถัดไป"/>
      </Screen>
    )
  }
}