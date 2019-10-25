import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

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
  navigateAction: bindActionCreators(navigateAction, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  handleInput = async (props) => {

    if (props.value === 'ใช้ที่อยู่เดียวกับทะเบียนบ้าน') {

      try {
        const res = await this.props.saveMailingSamePermanent()
        const success = get(res, 'data.saveMailingSamePermanent.success', false)
        const code = get(res, 'data.saveMailingSamePermanent.code', errorMessage.messageIsNull.code)
        const message = get(res, 'data.saveMailingSamePermanent.message', errorMessage.messageIsNull.defaultMessage)

        if (success) {
          this.props.navigateAction({ ...this.props, page: 'contact' })
        } else {
          this.props.toggleModal({
            ...typeModal[code],
            dis: message
          })
        }

      } catch (error) {
        this.props.toggleModal({
          ...typeModal[errorMessage.requestError.code],
          dis: errorMessage.requestError.defaultMessage,
        })
      }

    } else if (props.value === 'ใช้ที่อยู่เดียวกับสถานที่ทำงาน') {

      try {
        const res = await this.props.saveMailingSameWork()
        const success = get(res, 'data.saveMailingSameWork.success', false)
        const code = get(res, 'data.saveMailingSameWork.code', errorMessage.messageIsNull.code)
        const message = get(res, 'data.saveMailingSameWork.message', errorMessage.messageIsNull.defaultMessage)

        if (success) {
          this.props.navigateAction({ ...this.props, page: 'contact' })
        } else {
          this.props.toggleModal({
            ...typeModal[code],
            dis: message
          })
        }

      } catch (error) {
        this.props.toggleModal({
          ...typeModal[errorMessage.requestError.code],
          dis: errorMessage.requestError.defaultMessage,
        })
      }

    } else if (props.value === 'ใช้ที่อยู่เดียวกับที่อยู่ปัจจุบัน') {

      try {
        const res = await this.props.saveMailingSameCurrent()
        const success = get(res, 'data.saveMailingSameCurrent.success', false)
        const code = get(res, 'data.saveMailingSameCurrent.code', errorMessage.messageIsNull.code)
        const message = get(res, 'data.saveMailingSameCurrent.message', errorMessage.messageIsNull.defaultMessage)

        if (success) {
          this.props.navigateAction({ ...this.props, page: 'contact' })
        } else {
          this.props.toggleModal({
            ...typeModal[code],
            dis: message
          })
        }

      } catch (error) {
        this.props.toggleModal({
          ...typeModal[errorMessage.requestError.code],
          dis: errorMessage.requestError.defaultMessage,
        })
      }

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