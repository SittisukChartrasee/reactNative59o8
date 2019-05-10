import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    required: false,
  }, {
    label: 'โทรศัพท์บ้าน',
    type: 'textInput',
    field: 'homePhone',
    required: false,
  }, {
    label: 'หมายเลขโทรศัพท์มือถืิอ',
    type: 'textInput',
    field: 'mobilePhone',
    required: false,
  }, {
    label: 'อีเมล',
    field: 'email',
    required: false,
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
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    updateUser('contact', { ...user.contact, [props.field]: props.value })
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => o.field === field)
    const Invalid = find(InvalidArgument, (o) => o.field === field)
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
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
      workPhone,
      homePhone,
      mobilePhone,
      email
    }

    this.props.saveContact({ variables: { input: data } })
      .then(res => {
        if (res.data.saveContact.success) {
          navigateAction({ ...this.props, page: 'suittest' })
          // navigateAction({ ...this.props, page: 'tutorialBank' })
        } else if (!res.data.saveContact.success) {
          switch (res.data.saveContact.message) {
            case 'PreconditionRequired':
              this.setState({ PreconditionRequired: res.data.saveContact.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.data.saveContact.details })
            default: return null
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    
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

        <KeyboardAwareScrollView
          extraScrollHeight={50}
          enableOnAndroid
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.contact[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>

        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}