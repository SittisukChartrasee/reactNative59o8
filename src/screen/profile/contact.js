import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
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
import { updateUser } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'

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

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {

  handleInput = (props) => {
    const { updateUser, user } = this.props

    updateUser('contact', { ...user.contact, [props.field]: props.value })
  }

  onNext = async () => {
    const { navigateAction, user } = this.props

    const {
      workPhone,
      homePhone,
      mobilePhone,
      email
    } = user.contact

    const data = {
      workPhone: "0888888888",
      homePhone: "0888888888",
      mobilePhone: "0888888888",
      email: "test@gmail.com"
    }

    const res = await this.props.saveContact({ variables: { input: data } })
    if (res.data.saveContact.success) {
      console.log('OK')
      navigateAction({ ...this.props, page: 'tutorialBank' })
    }
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลการติดต่อ"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
              value: user.contact[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={this.onNext}/>
      </Screen>
    )
  }
}