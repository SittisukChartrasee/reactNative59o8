import React from 'react'
import { TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
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
import setMutation from '../../containers/mutation'
import { updateUser, root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import { RequiredFields } from '../../utility/validation'
import typeModal from '../../utility/typeModal'
import { errorMessage, modalMessage } from '../../utility/messages'

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
    layout: [],
    fields: [
      {
        label: 'ประเภทธุรกิจ',
        type: 'search',
        field: 'busType', // isicCode
        required: true
      },
      // {
      //   label: 'อื่นๆ (โปรดระบุ)',
      //   type: 'textInput',
      //   field: 'busType_other',
      //   inVisible: this.props.user.career.busType_other ? false : true
      // },
      {
        label: 'อาชีพ',
        type: 'search',
        field: 'occupation', // occupationCode
        required: true
      },
      {
        label: 'รายได้ต่อเดือน (บาท)',
        type: 'dropdown',
        init: [
          { value: '< 15,000' },
          { value: '15,001 - 30,000 บาท' },
          { value: '30,001 - 50,000 บาท' },
          { value: '50,001 - 100,000 บาท' },
          { value: '100,001 - 500,000 บาท' },
          { value: '500,001 - 1,000,000 บาท' },
          { value: '> 1,000,000' }
        ],
        field: 'incomeRangeCode', //incomeRangeCode
        required: true
      },
      {
        label: 'ประเทศของแหล่งที่มารายได้',
        type: 'search',
        field: 'countrySourceOfIncome',
        required: true
      }
    ]
  }

  handleInput = props => {
    try {
      const { user } = this.props
      if (props.type === 'onFocus') {
        return
      } else if (props.field === 'occupation') {
        this.props.updateUser('career', { ...user.career, [props.field]: props.value, occupationCode: props.code })
      } else if (props.field === 'countrySourceOfIncome') {
        this.props.updateUser('career', { ...user.career, [props.field]: props.value, countyCode: props.code })
      } else if (props.field === 'busType') {
        this.props.updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code })
      } else if (props.field === 'incomeRangeCode') {
        this.props.updateUser('career', { ...user.career, [props.field]: props.value })
      } else {
        const value = get(props, 'value', null)
        if (value) {
          const valueOther = get(value, 'value', null)
          if (valueOther) this.props.updateUser('career', { ...user.career, [props.field]: valueOther })
        }
      }

      this.handleValidation({ field: props.field, value: props.value })

    } catch (error) {
      console.log(error)
    }
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if ((o.field === 'isicCode' || o.field === 'isicOther') && field === 'busType') return o
      if (o.field === 'isicOther' && field === 'busType_other') return o
      if ((o.field === 'occupationCode' || o.field === 'occupationOther') && field === 'occupation') return o
      if (o.field === 'occupationOther' && field === 'occupation_other') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if ((o.field === 'isicCode' || o.field === 'isicOther') && field === 'busType') return o
      if (o.field === 'isicOther' && field === 'busType_other') return o
      if ((o.field === 'occupationCode' || o.field === 'occupationOther') && field === 'occupation') return o
      if (o.field === 'occupationOther' && field === 'occupation_other') return o
      return o.field === field
    })
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired } = this.state
    const { Required } = this.getRequiredInvalid(field)

    let val = value

    if (typeof value === 'object') val = value.value

    if (Required && RequiredFields(val)) {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => {
          if (!(o.field === 'isicCode' && field === 'busType') &&
            !(o.field === 'isicOther' && field === 'busType_other') &&
            !(o.field === 'occupationCode' && field === 'occupation') &&
            !(o.field === 'occupationOther' && field === 'occupation_other') &&
            o.field !== field)
            return o
        })
      })
    }
  }

  onValidation = field => {
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (Required) return Required.description
    else if (Invalid) return Invalid.description
    return null
  }

  onNext = async () => {
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      isicCode,
      occupationCode,
      busType_other,
      incomeRangeCode,
      occupation_other,
      countyCode
    } = user.career

    const data = {
      isicCode,
      isicOther: busType_other && isicCode === '180' ? busType_other : '',
      occupationCode,
      occupationOther: occupation_other && occupationCode === '170' ? occupation_other : '',
      incomeRangeCode,
      countrySourceOfIncome: countyCode
    }


    if (countyCode === 'US') {
      return this.props.toggleModal({
        ...typeModal[modalMessage.callCenter.code],
        dis: modalMessage.callCenter.defaultMessage,
      })
    }

    try {
      const res = await this.props.saveCareer({ variables: { input: data } })
      const success = get(res, 'data.saveCareer.success', false)
      const details = get(res, 'data.saveCareer.details', [])
      const code = get(res, 'data.saveCareer.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.saveCareer.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        this.props.navigateAction({ ...this.props, page: 'sourceOfFund' })
      } else {
        switch (code) {
          case '2101':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({
              PreconditionRequired: details || []
            })
          case '2201':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({
              InvalidArgument: details || []
            })
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

  onHandleScrollToErrorField = (field) => {
    const errField = field.map(d => d.field)
    const layoutY = this.state.fields
      .map((d, index) => errField.indexOf(d.field) > -1 && index)
      .filter(d => d !== false)
    this.refScrollView.scrollToPosition(0, this.state.layout[layoutY[0]], true)
  }

  onSetLayout = (layoutY, index) => {
    const { layout } = this.state
    const newArray = layout
    newArray[index] = layoutY
    this.setState({ layout: [...newArray] })
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="การทำงาน"
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
          ref={ref => { this.refScrollView = ref }}
        >
          {this.state.fields.map((d, key) =>
            Input(
              {
                field: d.field,
                label: d.label,
                type: d.type,
                required: d.required,
                init: d.init,
                value: user.career[d.field],
                valueOther: (user.career[`${d.field}_other`])
                  ? user.career[`${d.field}_other`]
                  : null,
                inVisible: d.inVisible,
                onSetLayout: val => this.onSetLayout(val.layout.y, key),
                handleInput: props => this.handleInput(props),
                err: this.onValidation(d.field)
              },
              key
            )
          )}
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}
