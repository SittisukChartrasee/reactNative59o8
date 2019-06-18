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
import { navigateAction } from '../../redux/actions'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'

const fields = [
  {
    label: 'ใช้ที่อยู่เดียวกับทะเบียนบ้าน',
    type: 'buttonCard',
  }, {
    label: 'ใช้ที่อยู่เดียวกับสถานที่ทำงาน',
    type: 'buttonCard',
  }, {
    label: 'ใช้ที่อยู่เดียวกับที่อยู่ปัจจุบัน',
    type: 'buttonCard',
  }, { 
    label: 'ใช้ที่อยู่อื่น',
    type: 'buttonCard',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  handleInput = async (props) => {

    if (props.value === 'ใช้ที่อยู่เดียวกับทะเบียนบ้าน') {
      const res = await this.props.saveMailingSamePermanent()
      if (res.data.saveMailingSamePermanent.success) this.props.navigateAction({ ...this.props, page: 'contact' })
    } else if (props.value === 'ใช้ที่อยู่เดียวกับสถานที่ทำงาน') {
      const res = await this.props.saveMailingSameWork()
      if (res.data.saveMailingSameWork.success) this.props.navigateAction({ ...this.props, page: 'contact' })
    } else if (props.value === 'ใช้ที่อยู่เดียวกับที่อยู่ปัจจุบัน') {
      const res = await this.props.saveMailingSameCurrent()
      if (res.data.saveMailingSameCurrent.success) this.props.navigateAction({ ...this.props, page: 'contact' })
    } else {
      this.props.navigateAction({ ...this.props, page: 'addressDoc' })
    }
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่จัดส่งเอกสาร"
          navLeft={
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
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
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

      </Screen>
    )
  }
}