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
import reverse from 'lodash/reverse'
import get from 'lodash/get'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import { updateUser, root } from '../../redux/actions/commonAction'
import setMutation from '../../containers/mutation'
import lockout from '../../containers/hoc/lockout'
import { convertDate, replaceSpace } from '../../utility/helper'
import { maskedFormat } from '../../utility/util'
import typeModal from '../../utility/typeModal'
import {
  validateIdentityCard,
  RequiredFields
} from '../../utility/validation'
import { errorMessage } from '../../utility/messages'

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
    expireSatus: this.props.user.spouse.isIDCardExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
    code: this.props.user.spouse.nationalityCode ? this.props.user.spouse.nationalityCode : '',
    PreconditionRequired: [],
    InvalidArgument: [],
    layout: [],
    disabledPepFlag: this.props.user.spouse.pepFlag === null,
    hidePicker: false,
    fields: [
      {
        label: 'สัญชาติ',
        type: 'radio',
        init: [
          {
            title: 'ไทย',
            active: this.props.user.spouse.nationFlag === 'ไทย'
          },
          {
            title: 'ชาวต่างชาติ',
            active: this.props.user.spouse.nationFlag === 'ชาวต่างชาติ'
          }
        ],
        field: 'nationFlag',
        required: true,
      }, {
        type: 'textInput',
        label: 'หมายเลขบัตรประชาชน',
        field: 'IDCardNo',
        format: [
          { index: 1, char: ' ' },
          { index: 5, char: ' ' },
          { index: 10, char: ' ' },
          { index: 12, char: ' ' },
        ],
        // option: '9 9999 99999 99 9',
        inVisible: this.props.user.spouse.nationFlag === 'ชาวต่างชาติ',
        required: true,
      }, {
        label: 'ประเทศ',
        type: 'search',
        field: 'marryCountry', // ต้อง save ที่ field => nationalityCode
        inVisible: this.props.user.spouse.nationFlag === 'ไทย',
        required: true,
      }, {
        label: 'หมายเลขหนังสือเดินทาง',
        type: 'textInput',
        field: 'marryPassport', // ต้อง save ที่ field => IDCardNo
        inVisible: this.props.user.spouse.nationFlag === 'ไทย',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [
          {
            title: 'มีวันหมดอายุ',
            active: !this.props.user.spouse.isIDCardExpDate
          },
          {
            title: 'ไม่มีวันหมดอายุ',
            active: this.props.user.spouse.isIDCardExpDate
          }
        ],
        field: 'expireFlag', // ต้อง save ที่ field => isIDCardExpDate
        inVisible: this.props.user.spouse.nationFlag === 'ชาวต่างชาติ',
        required: true,
      }, {
        label: 'วันที่หนังสือเดินทางหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'marryExpireDate', // ต้อง save ที่ field => marryExpireDate
        date: reverse(this.props.user.spouse.marryExpireDate.split('-')),
        inVisible: this.props.user.spouse.nationFlag === 'ไทย',
        required: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'cardExpiredDate', // ต้อง save ที่ field => cardExpiredDate
        date: reverse(this.props.user.spouse.cardExpiredDate.split('-')),
        required: true,
        inVisible: this.props.user.spouse.nationFlag === 'ชาวต่างชาติ' ||
          this.props.user.spouse.isIDCardExpDate,
      }, {
        label: 'คำนำหน้า',
        type: 'search',
        field: 'title',
        required: true,
      }, {
        label: 'ชื่อ',
        type: 'textInput',
        field: 'fistName',
        required: true,
      }, {
        label: 'นามสกุล',
        type: 'textInput',
        field: 'lastName',
        required: true,
      }, {
        label: 'คู่สมรสเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        type: 'radioColumn',
        init: [
          {
            title: 'ใช่',
            active: this.props.user.spouse.pepFlag
          },
          {
            title: 'ไม่ใช่',
            active: !this.props.user.spouse.pepFlag &&
              this.props.user.spouse.pepFlag !== null
          }
        ],
        field: 'pepFlag',
        required: true,
      },
    ]
  }

  handleInput = (props) => {
    const { fields, PreconditionRequired, InvalidArgument } = this.state
    const { user } = this.props

    if (props.field === 'nationFlag') {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => o.field !== 'nationalityCode' && o.field !== 'IDCardNo'),
        InvalidArgument: InvalidArgument.filter(o => o.field !== 'nationalityCode' && o.field !== 'IDCardNo'),
        fields: fields.map((d) => {
          if (props.value === 'ไทย') {
            this.props.updateUser('spouse', { ...user.spouse, nationFlag: 'ไทย' })
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'marryExpireDate') return { ...d, inVisible: true }
            else if (d.field === 'cardExpiredDate') return { ...d, inVisible: this.props.user.spouse.isIDCardExpDate }
            else if (d.field === 'IDCardNo' || d.field === 'expireFlag') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ชาวต่างชาติ') {
            this.props.updateUser('spouse', { ...user.spouse, nationalityCode: this.state.code, nationFlag: 'ชาวต่างชาติ' })
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'marryExpireDate') return { ...d, inVisible: false }
            else if (d.field === 'cardExpiredDate') return { ...d, inVisible: true }
            else if (d.field === 'IDCardNo' || d.field === 'expireFlag') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'expireFlag') {
      this.setState({
        expireSatus: props.value,
        fields: fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            this.props.updateUser('spouse', { ...user.spouse, expireFlag: props.value, isIDCardExpDate: false })
            if (d.field === 'cardExpiredDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            this.props.updateUser('spouse', { ...user.spouse, expireFlag: props.value, isIDCardExpDate: true })
            if (d.field === 'cardExpiredDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'marryCountry') {
      this.setState({ code: props.code })
      this.props.updateUser('spouse', {
        ...user.spouse,
        marryCountry: props.value,
        nationalityCode: props.code,
        nationalityRisk: props.risk
      })
    } else if (props.field === 'pepFlag') {
      this.setState({ disabledPepFlag: false })
      this.props.updateUser('spouse', { ...user.spouse, [props.field]: (props.value === 'ใช่') })
    } else if (props.field === 'title') {
      this.props.updateUser('spouse', {
        ...user.spouse,
        [props.field]: props.value,
        'titleCode': props.code,
        'titleDetail': props.nameDetail,
      })
    } else if (props.type === 'onFocus') {
      this.setState({ hidePicker: true })
    } else if (props.field === 'IDCardNo') {
      this.props.updateUser('spouse', {
        ...user.spouse,
        [props.field]: maskedFormat({ value: props.value, format: props.format, limit: 13, field: props.field })
      })
    } else {
      this.props.updateUser('spouse', { ...user.spouse, [props.field]: props.value })
    }
    this.handleValidation({ field: props.field, value: props.value })
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if (o.field === 'nationalityCode' && field === 'marryCountry') return o
      if (o.field === 'IDCardNo' && field === 'marryPassport') return o
      if (o.field === 'cardExpiredDate' && field === 'marryExpireDate') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if (o.field === 'nationalityCode' && field === 'marryCountry') return o
      if (o.field === 'IDCardNo' && field === 'marryPassport') return o
      if (o.field === 'cardExpiredDate' && field === 'marryExpireDate') return o
      return o.field === field
    })
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if (field === 'IDCardNo' && Invalid && validateIdentityCard(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    }

    if (Required && RequiredFields(value)) {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => {
          if (!(o.field === 'IDCardNo' && field === 'marryPassport') &&
            o.field !== field)
            return o
        })
      })
    }
  }

  onValidation = (field) => {
    const { Required, Invalid } = this.getRequiredInvalid(field)
    if (Required)
      return Required.description
    else if (Invalid)
      return Invalid.description
    return null
  }

  onNext = async () => {
    const { expireSatus } = this.state
    const { user } = this.props
    const redirec = this.props.navigation.getParam('redirec', '')
    this.setState({ PreconditionRequired: [], InvalidArgument: [], hidePicker: true })

    const {
      title,
      titleCode,
      lastName,
      pepFlag,
      nationalityCode,
      IDCardNo,
      marryPassport,
      marryIsIDCardExpDate,
      isIDCardExpDate,
      marryExpireDate,
      cardExpiredDate,
      fistName,
    } = user.spouse


    const data = {
      title,
      titleCode,
      lastName,
      pepFlag,
      nationalityCode: this.props.user.spouse.nationFlag === 'ไทย' ? 'TH' : nationalityCode,
      IDCardNo: this.props.user.spouse.nationFlag === 'ไทย' ? replaceSpace(IDCardNo) : marryPassport,
      isIDCardExpDate: this.props.user.spouse.nationFlag === 'ไทย' ? !isIDCardExpDate : marryIsIDCardExpDate,
      cardExpiredDate: (expireSatus === 'มีวันหมดอายุ')
        ? (this.props.user.spouse.nationFlag === 'ไทย')
          ? convertDate(cardExpiredDate)
          : convertDate(marryExpireDate)
        : new Date('9999-12-31'),
      fistName,
    }

    try {
      const res = await this.props.saveSpouse({ variables: { input: data } })
      const success = get(res, 'data.saveSpouse.success', false)
      const details = get(res, 'data.saveSpouse.details', [])
      const code = get(res, 'data.saveSpouse.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.saveSpouse.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        if (redirec) {
          this.props.navigateAction({ ...this.props, page: redirec })
        } else {
          this.props.navigateAction({ ...this.props, page: 'career' })
        }
      } else {
        switch (code) {
          case '2101':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ PreconditionRequired: details || [] })
          case '2201':
            this.onHandleScrollToErrorField(details || [])
            return this.setState({ InvalidArgument: details || [] })
          case '1101':
            return this.props.toggleModal({
              ...typeModal[code],
              dis: message
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
      .map((d, index) => (errField.indexOf(d.field) > -1 ||
        (d.field === 'marryCountry' && errField.indexOf('nationalityCode') > -1) ||
        (d.field === 'marryPassport' && errField.indexOf('IDCardNo') > -1)) && index)
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
    const { fields, disabledPepFlag } = this.state
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลคู่สมรส"
          navLeft={
            <TouchableOpacity
              onPress={() => {
                this.setState({ hidePicker: true })
                this.props.navigation.goBack()
              }}
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
          {
            fields.map((d, key) => Input({
              ...d,
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              value: d.field === 'title'
                ? user.spouse['titleDetail']
                : user.spouse[d.field],
              inVisible: d.inVisible,
              date: d.date,
              onSetLayout: val => this.onSetLayout(val.layout.y, key),
              handleInput: (props) => this.handleInput(props),
              hidePicker: this.state.hidePicker,
              err: this.onValidation(d.field)
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton
          onPress={this.onNext}
          disabled={disabledPepFlag}
        />
      </Screen>
    )
  }
}