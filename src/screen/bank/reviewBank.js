import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { LongPositionButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'
import colors from '../../config/colors';
import { TBold } from '../../component/texts';

const card = [
  {
    label: 'ธนาคารกสิกรไทย',
    number: '1234567890',
    image: images.iconkbank,
    disabled: true,
    type: 'selectCard',
  }, {
    label: 'สาขาบัญชีธนาคาร',
    value: 'สาขาสำนักสีลม'
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
          style={{ backgroundColor: colors.lightgrey }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: colors.white, paddingVertical: 24 }}>
            <TBold>ท่านเชื่อมบัญชีธนาคารเรียบร้อยแล้ว</TBold>
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
        </ScrollView>

        <LongPositionButton bg={colors.lightgrey} label="ถัดไป"/>
      </Screen>
    )
  }
}