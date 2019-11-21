import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
import get from 'lodash/get'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import setMutation from '../../containers/mutation'
import { replaceSpace } from '../../utility/helper'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'
import { maskedFormat } from '../../utility/util'

const fields = [
  {
    label: 'โทรศัพท์ที่ทำงาน',
    type: 'textInput',
    field: 'workPhone',
    required: false,
  },
  {
    field: 'homePhones',
    init: [
      {
        label: 'โทรศัพท์บ้าน',
        type: 'textInput',
        field: 'homePhone',
        format: [
          { index: 2, char: ' ' },
          { index: 5, char: ' ' },
        ],
        // option: '09 999 9999',
        required: false,
      },
      {
        label: 'ต่อ',
        type: 'textInput',
        field: 'homePhoneExt',
        required: false,
      },
    ]
  },
  {
    label: 'หมายเลขโทรศัพท์มือถืิอ',
    field: 'mobilePhone',
    required: false,
  },
  {
    label: 'อีเมล',
    field: 'email',
    required: false,
  }
]

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
  }

  handleInput = (props) => {
    const { user } = this.props
    if (props.field === 'homePhoneExt') {
      if (props.value.length <= 4) {
        return this.props.updateUser('contact', { ...user.contact, [props.field]: props.value })
      } else {
        return this.props.updateUser('contact', { ...user.contact })
      }
    } else if (props.field === 'homePhone') {
      this.props.updateUser('contact', {
        ...user.contact,
        [props.field]: maskedFormat({
          value: props.value,
          format: props.format,
          limit: 9,
          field: props.field
        })
      })

    } else {
      this.props.updateUser('contact', { ...user.contact, [props.field]: props.value })
    }
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
    const { user } = this.props
    const {
      workPhone,
      homePhone,
      homePhoneExt,
      mobilePhone,
      email
    } = user.contact

    const data = {
      workPhone,
      homePhone: homePhoneExt ? `${replaceSpace(homePhone)} #${homePhoneExt}` : replaceSpace(homePhone),
      mobilePhone: replaceSpace(mobilePhone),
      email
    }

    try {
      const res = await this.props.saveContact({ variables: { input: data } })
      const success = get(res, 'data.saveContact.success', false)
      const details = get(res, 'data.saveContact.details', [])
      const code = get(res, 'data.saveContact.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.saveContact.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        this.props.navigateAction({ ...this.props, page: 'tutorialBank' })
      } else {
        switch (code) {
          case '2101':
            return this.setState({ PreconditionRequired: details || [] })
          case '2201':
            return this.setState({ InvalidArgument: details || [] })
          default:
            return this.props.toggleModal({
              ...typeModal[code],
              dis: message
            })
        }
      }
    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลการติดต่อ"
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

        <KeyboardAwareScrollView
          extraScrollHeight={50}
          enableOnAndroid
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {
            fields.map(d => {
              if (d.field === 'homePhones') {
                return <View key={d.field} style={{ flex: 1, flexDirection: 'row' }}>
                  {
                    d.init.map(k =>
                      <View key={k.field} style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Input
                          {...k}
                          value={user.contact[k.field]}
                          handleInput={(props) => this.handleInput(props)}
                          err={this.onValidation(k.field)}
                        />
                      </View>
                    )
                  }
                </View>
              } else {
                return <Input
                  key={d.field}
                  field={d.field}
                  label={d.label}
                  type={d.type}
                  required={d.required}
                  init={d.init}
                  value={user.contact[d.field]}
                  inVisible={d.inVisible}
                  handleInput={(props) => this.handleInput(props)}
                  err={this.onValidation(d.field)}
                />
              }
            })
          }

        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}