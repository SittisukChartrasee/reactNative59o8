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
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { Select } from '../../component/cardSelect'
import { navigateAction } from '../../redux/actions'
import colors from '../../config/colors';

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    fields: [
      {
        label: 'เงินเดือน',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'มรดก',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'การขายหลักทรัพย์',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'ผลตอบแทนจากการลงทุน',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'การดำเนินการทางธุรกิจ',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'ค่านายหน้า',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'ค่าตอบแทนการให้บริการ',
        type: 'select',
        field: 'idcard',
      }, {
        label: 'อื่นๆ',
        type: 'select',
        field: 'investmentSourceOther',
      }
    ],
    data: [],
  }

  handleOnpress = (val) => {
    const { fields } = this.state
    const result = fields.map((d) => {
      if (d.label === val.label && !val.active) {
        return { ...d, active: true }
      } else if (d.label === val.label && val.active) {
        return { ...d, active: false }
      } else {
        return { ...d }
      }
    })
    const data = result.map((d) => d.active && d.label).filter(d => d !== undefined && d !== false)
    this.setState({ fields: result, data })
  }
  
  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="คุณรับเงินทุนจากแหล่งใด"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={{ backgroundColor: colors.lightgrey }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            { this.state.fields.map((d, k) => Select({ ...d, onPress: this.handleOnpress }, k))}
          </View>
        </ScrollView>

      </Screen>
    )
  }
}