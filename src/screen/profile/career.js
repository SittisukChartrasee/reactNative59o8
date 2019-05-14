import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
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
import setMutation from '../../containers/mutation'
import { updateUser } from '../../redux/actions/commonAction'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {
  state = {
    modal: false,
    PreconditionRequired: [],
    InvalidArgument: [],
    fields: [
      {
        label: 'ประเภทธุรกิจ',
        type: 'search',
        field: 'busType', // isicCode
        required: true,
      }, {
        label: 'อาชีพ',
        type: 'search',
        field: 'occupation', // occupationCode
        required: true,
      }, {
        label: 'รายได้ต่อเดือน (บาท)',
        type: 'dropdown',
        init: [
          { value: 'ไม่เกิน 10,000 บาท' },
          { value: '10,001 - 20,000 บาท' },
          { value: '20,001 - 30,000 บาท' },
          { value: '30,001 - 50,000 บาท' },
          { value: '50,001 - 100,000 บาท' },
          { value: '100,001 - 200,000 บาท' },
          { value: 'มากกว่า 200,000 บาท' },
          { value: 'ไม่มีรายได้' }
        ],
        field: 'incomeRange', //incomeRangeCode
        required: true,
      }, {
        label: 'ประเทศของแหล่งที่มารายได้',
        type: 'search',
        field: 'countrySourceOfIncome',
        required: true,
      }
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    console.log(props)
    if (props.type === 'modal') this.setState({ modal: true })
    else if (props.field === 'busType') {
      updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code }) 
    } else if (props.field === 'busType') {
      updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code }) 
    } else if (props.field === 'occupation') {
      updateUser('career', { ...user.career, [props.field]: props.value, occupationCode: props.code })
    } else if (props.field === 'incomeRange') {
      updateUser('career', { ...user.career, [props.field]: props.value })
    } if (props.field === 'countrySourceOfIncome') {
      updateUser('career', { ...user.career, [props.field]: props.value, countyCode: props.code, countryRisk: props.risk })
    }
  }

  onValidation = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'isicCode' && field === 'busType') {
        return o
      }
      if (o.field === 'occupationCode' && field === 'occupation') {
        return o
      }
      if (o.field === 'incomeRangeCode' && field === 'incomeRange') {
        return o
      }
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'isicCode' && field === 'busType') {
        return o
      }
      if (o.field === 'occupationCode' && field === 'occupation') {
        return o
      }
      if (o.field === 'incomeRangeCode' && field === 'incomeRange') {
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
    const { navigateAction, user } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      isicCode,
      occupationCode,
      incomeRange,
      incomeRangeCode,
      countrySourceOfIncome,
    } = user.career


    const data = {
      isicCode,
      occupationCode,
      incomeRangeCode: incomeRange,
      countrySourceOfIncome
    }

    this.props.saveCareer({ variables: { input: data } })
      .then(res => {
        if (user.career.countryRisk) {
          return this.setState({ modal: true })
        } else if (res.data.saveCareer.success) {
          navigateAction({ ...this.props, page: 'sourceOfFund' })
        } else if (!res.data.saveCareer.success) {
          switch (res.data.saveCareer.message) {
            case 'PreconditionRequired':
              this.setState({ PreconditionRequired: res.data.saveCareer.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.data.saveCareer.details })
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
          title="การทำงาน"
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
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.career[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field),
            }, key))
          }
        </KeyboardAwareScrollView>

        {
          modal({
            visible: this.state.modal,
            dis: `ประเทศของท่าน\nมีความเสี่ยงไม่สามารถสมัครต่อได้`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={this.onNext}/>
      </Screen>
    )
  }
}