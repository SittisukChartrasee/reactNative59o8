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
import typeModal from '../../utility/typeModal'

const fields = [
  {
    label: 'ใช้ที่อยู่เดียวกับทะเบียนบ้าน',
    type: 'buttonCard',
  }, {
    label: 'ใช้ที่อยู่เดียวกับสถานที่ทำงาน',
    type: 'buttonCard',
  }, {
    label: 'ใช้ที่อยู่อื่น',
    type: 'buttonCard',
  }
]

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  handleInput = async props => {

    if (props.value === 'ใช้ที่อยู่เดียวกับสถานที่ทำงาน') {
      await this.props.saveCurrentSameWork()
        .then(res => {
          if (res.data.saveCurrentSameWork.success) this.props.navigateAction({ ...this.props, page: 'chooseDoc' })
          else return this.props.toggleModal({
            ...typeModal[res.data.saveCurrentSameWork.code],
            dis: res.data.saveCurrentSameWork.message
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else if (props.value === 'ใช้ที่อยู่เดียวกับทะเบียนบ้าน') {
      await this.props.SaveCurrentSamePermanent()
        .then(res => {
          if (res.data.SaveCurrentSamePermanent.success) this.props.navigateAction({ ...this.props, page: 'chooseDoc' })
          else return this.props.toggleModal({
            ...typeModal[res.data.SaveCurrentSamePermanent.code],
            dis: res.data.SaveCurrentSamePermanent.message
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.props.navigateAction({ ...this.props, page: 'addressCurr' })
    }
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="ที่อยู่ปัจจุบัน"
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