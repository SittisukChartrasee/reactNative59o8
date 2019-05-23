import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import find from 'lodash/find'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import setMutation from '../../containers/mutation'
import { updateUser, root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import { convertDate, getOfBirth, getStatusGender, getStatusMartial, getStatusChild } from '../../utility/helper'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    PreconditionRequired: [],
    InvalidArgument: [],
    fields: [
      {
        label: 'ข้อมูลบุตรคนที่ 1',
        field: 'idcard',
        type: 'titleHead'
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',
        type: 'search',
        field: 'firstTitle',
        required: true,
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'firstFirstName',
        required: true,
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'firstLastName',
        required: true,
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'firstBirthDay',
        required: true,
      }, {
        label: 'เลขบัตรประชาชน',
        type: 'textInput',
        field: 'firstDocNo',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'firstExpireDateFlag',
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'firstDocExpDate',
        required: true,
      },
      {
        label: 'ข้อมูลบุตรคนที่ 2',
        field: 'idcard',
        type: 'titleHead'
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',
        type: 'search',
        field: 'secondTitle',
        required: true,
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'secondFirstName',
        required: true,
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'secondLastName',
        required: true,
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'secondBirthDay',
        required: true,
      }, {
        label: 'เลขบัตรประชาชน',
        type: 'textInput',
        field: 'secondDocNo',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'secondExpireDateFlag',
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'secondDocExpDate',
        required: true,
      }
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    updateUser('child', { ...user.child, [props.field]: props.value })
    if (props.field === 'firstExpireDateFlag') {
      updateUser('child', { ...user.child, [props.field]: props.value })
      this.setState({
        fields: this.state.fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            if (d.field === 'firstDocExpDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            if (d.field === 'firstDocExpDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'secondExpireDateFlag') {
      updateUser('child', { ...user.child, [props.field]: props.value })
      this.setState({
        fields: this.state.fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            if (d.field === 'secondDocExpDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            if (d.field === 'secondDocExpDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    }
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if ((o.field === 'firstDayOfBirth ' ||
        o.field === 'firstMonthOfBirth' ||
        o.field === 'firstYearOfBirth') && field === 'firstBirthDay') {
        return o
      }
      if ((o.field === 'secondDayOfBirth ' ||
        o.field === 'secondMonthOfBirth' ||
        o.field === 'secondYearOfBirth') && field === 'secondBirthDay') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if ((o.field === 'firstDayOfBirth ' ||
        o.field === 'firstMonthOfBirth' ||
        o.field === 'firstYearOfBirth') && field === 'firstBirthDay') {
        return o
      }
      if ((o.field === 'secondDayOfBirth ' ||
        o.field === 'secondMonthOfBirth' ||
        o.field === 'secondYearOfBirth') && field === 'secondBirthDay') {
        return o
      }
      return o.field === field
    })
    if (Required) {
      return Required.description
    } else if (Invalid) {
      return Invalid.description
    }
    return null
  }

  onNext = async () => {
    const { navigateAction, user, updateRoot } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })

    const {
      firstTitle,
      firstFirstName,
      firstLastName,
      firstBirthDay,
      firstDocNo,
      firstExpireDateFlag,
      firstDocExpDate,
      secondTitle,
      secondFirstName,
      secondLastName,
      secondBirthDay,
      secondDocNo,
      secondExpireDateFlag,
      secondDocExpDate,
    } = user.child


    const data = {
      firstTitle,
      firstFirstName,
      firstLastName,
      firstDayOfBirth: getOfBirth(firstBirthDay, 'day'),
      firstMonthOfBirth: `${getOfBirth(firstBirthDay, 'month')}`,
      firstYearOfBirth: getOfBirth(firstBirthDay, 'year'),
      firstDocNo,
      firstIsNoExpDate: firstExpireDateFlag === 'มีวันหมดอายุ' ? true : false,
      firstDocExpDate: convertDate(firstDocExpDate),
      secondTitle,
      secondFirstName,
      secondLastName,
      secondDayOfBirth: getOfBirth(secondBirthDay, 'day'),
      secondMonthOfBirth: `${getOfBirth(secondBirthDay, 'month')}`,
      secondYearOfBirth: getOfBirth(secondBirthDay, 'year'),
      secondDocNo,
      secondIsNoExpDate: secondExpireDateFlag === 'มีวันหมดอายุ' ? true : false,
      secondDocExpDate: convertDate(secondDocExpDate),
    }

    this.props.saveChild({ variables: { input: data } })
      .then(res => {
        console.log(res)
        if (res.data.saveChild.success) {
          navigateAction({ ...this.props, page: 'career' })
        } else if (!res.data.saveChild.success) {
          switch (res.data.saveChild.message) {
            case 'PreconditionRequired':
              return this.setState({ PreconditionRequired: res.data.saveChild.details })
            case 'InvalidArgument':
              return this.setState({ InvalidArgument: res.data.saveChild.details })
            default:
              const modal = {
                dis: res.data.saveChild.message,
                visible: true,
                onPress: () => updateRoot('modal', { visible: false })
              }
              return updateRoot('modal', modal)
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
          title="ข้อมูลบุตร"
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
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.child[d.field],
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