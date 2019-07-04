import React from 'react'
import { TouchableOpacity, ScrollView, Image, Linking } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import find from 'lodash/find'
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
    console.log(props)

    const { user } = this.props
    if (props.field === 'occupation') {
      this.props.updateUser('career', { ...user.career, [props.field]: props.value, occupationCode: props.code })
    } else if (props.field === 'countrySourceOfIncome') {
      this.props.updateUser('career', { ...user.career, [props.field]: props.value, countyCode: props.code })
    } else if (props.field === 'busType') {
      this.props.updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code })
    } else if (props.field === 'incomeRangeCode') {
      this.props.updateUser('career', { ...user.career, [props.field]: props.value })
    } else {
      this.props.updateUser('career', { ...user.career, [props.field]: props.value.value })
    }
  }

  onValidation = field => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, o => {
      if (o.field === 'isicCode' && (field === 'busType' || field === 'busType_other')) return o
      if (o.field === 'occupationCode' && field === 'occupation') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, o => {
      if (o.field === 'isicCode' && (field === 'busType' || field === 'busType_other')) return o
      if (o.field === 'occupationCode' && field === 'occupation') return o
      return o.field === field
    })
    if (Required) return Required.description
    else if (Invalid) return Invalid.description
    return null
  }

  onNext = () => {
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
      isicOther: busType_other ? busType_other : '',
      occupationCode,
      occupationOther: occupation_other ? occupation_other : '',
      incomeRangeCode,
      countrySourceOfIncome: countyCode
    }

    console.log(data)

    if (countyCode === 'US') {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        labelBtn: 'ติดต่อ 02 673 3888',
        onPress: () => Linking.openURL(`tel:026733888`),
        onPressClose: () => this.props.updateRoot('modal', { visible: false })
      }
      return this.props.updateRoot('modal', modal)
    } else {
      this.props.saveCareer({ variables: { input: data } })
        .then(res => {
          console.log(res)

          if (res.data.saveCareer.success) {
            this.props.navigateAction({ ...this.props, page: 'sourceOfFund' })
          } else if (!res.data.saveCareer.success) {
            switch (res.data.saveCareer.message) {
              case 'PreconditionRequired':
                this.onHandleScrollToErrorField(res.data.saveCareer.details)
                return this.setState({
                  PreconditionRequired: res.data.saveCareer.details
                })
              case 'InvalidArgument':
                this.onHandleScrollToErrorField(res.data.saveCareer.details)
                return this.setState({
                  InvalidArgument: res.data.saveCareer.details
                })
              default:
                const modal = {
                  dis: res.data.saveCareer.message,
                  visible: true,
                  onPress: () => this.props.updateRoot('modal', { visible: false }),
                  onPressClose: () => this.props.updateRoot('modal', { visible: false })
                }
                return this.props.updateRoot('modal', modal)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onHandleScrollToErrorField = (field) => {
    const errField = field.map(d => d.field)
    this.state.fields.map((d, index) => {
      if (errField.indexOf(d.field) > -1) {
        this.refScrollView.scrollToPosition(0, this.state.layout[index], true)
      }
    })
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
