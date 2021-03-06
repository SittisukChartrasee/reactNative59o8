import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  View
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import find from 'lodash/find'
import reverse from 'lodash/reverse'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { LongButton } from '../../component/button'
import { NextButton } from '../../component/button'
import { TBold } from '../../component/texts'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import setMutation from '../../containers/mutation'
import { updateUser, root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import colors from '../../config/colors'
import { validateIdentityCard, validateIdentityThaiLanguage, RequiredFields } from '../../utility/validation'
import { convertDate, getOfBirth, replaceSpace, tomorrowDate } from '../../utility/helper'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'
import { maskedFormat } from '../../utility/util'

const { width: widthView } = Dimensions.get('window')

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
    hidePicker: false,
    fields: [
      {
        label: 'ข้อมูลบุตร หรือบุตรบุญธรรมคนที่ 1',
        field: 'firstIdcard',
        type: 'titleHead',
        static: true
      }, {
        label: 'คำนำหน้า',
        type: 'search',
        field: 'firstTitle',
        required: true,
        static: true
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'firstFirstName',
        required: true,
        static: true
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'firstLastName',
        required: true,
        static: true
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'firstBirthDay',
        required: true,
        static: true
      }, {
        type: 'textInput',
        label: 'เลขบัตรประชาชน',
        field: 'firstDocNo',
        format: [
          { index: 1, char: ' ' },
          { index: 5, char: ' ' },
          { index: 10, char: ' ' },
          { index: 12, char: ' ' },
        ],
        // option: '9 9999 99999 99 9',
        required: true,
        static: true
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{
          title: 'มีวันหมดอายุ',
          active: this.props.user.child.firstExpireDateFlag === 'มีวันหมดอายุ'
        },
        {
          title: 'ไม่มีวันหมดอายุ',
          active: this.props.user.child.firstExpireDateFlag === 'ไม่มีวันหมดอายุ'
        }],
        field: 'firstExpireDateFlag',
        static: true
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'firstDocExpDate',
        date: reverse(this.props.user.child.firstDocExpDate.split('-')),
        required: true,
        static: true,
        inVisible: this.props.user.child.firstExpireDateFlag === 'ไม่มีวันหมดอายุ'
      },
      {
        label: 'ข้อมูลบุตร หรือบุตรบุญธรรมคนที่ 2',
        field: 'secondIdcard',
        type: 'titleHead',
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'คำนำหน้า',
        type: 'search',
        field: 'secondTitle',
        required: true,
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'ชื่อ (ภาษาไทย)',
        type: 'textInput',
        field: 'secondFirstName',
        required: true,
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'นามสกุล (ภาษาไทย)',
        type: 'textInput',
        field: 'secondLastName',
        required: true,
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'ปีเกิด,เดือนเกิด,วันเกิด',
        type: 'ymd',
        field: 'secondBirthDay',
        required: true,
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        type: 'textInput',
        label: 'เลขบัตรประชาชน',
        field: 'secondDocNo',
        format: [
          { index: 1, char: ' ' },
          { index: 5, char: ' ' },
          { index: 10, char: ' ' },
          { index: 12, char: ' ' },
        ],
        // option: '9 9999 99999 99 9',
        required: true,
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{
          title: 'มีวันหมดอายุ',
          active: this.props.user.child.secondExpireDateFlag === 'มีวันหมดอายุ'
        },
        {
          title: 'ไม่มีวันหมดอายุ',
          active: this.props.user.child.secondExpireDateFlag === 'ไม่มีวันหมดอายุ'
        }],
        field: 'secondExpireDateFlag',
        inVisible: this.props.user.child.inVisibleSecond,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'secondDocExpDate',
        ...((SDED) => SDED ? { date: reverse(SDED.split('-')) } : {})(this.props.user.child.secondDocExpDate), // first time undifiend
        required: true,
        inVisible: this.props.user.child.inVisibleSecond ||
          this.props.user.child.secondExpireDateFlag === 'ไม่มีวันหมดอายุ',
      }
    ]
  }

  handleInput = (props) => {
    const { user } = this.props
    if (props.field === 'firstTitle') {
      this.props.updateUser('child', {
        ...user.child,
        [props.field]: props.value,
        'firstTitleCode': props.code,
        'firstTitleDetail': props.nameDetail
      })
    } else if (props.field === 'secondTitle') {
      this.props.updateUser('child', {
        ...user.child,
        [props.field]: props.value,
        'secondTitleCode': props.code,
        'secondTitleDetail': props.nameDetail
      })
    } else if (props.field === 'firstExpireDateFlag') {
      this.props.updateUser('child', { ...user.child, [props.field]: props.value })
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
      this.props.updateUser('child', { ...user.child, [props.field]: props.value })
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
    } else if (props.field === 'firstDocNo') {
      this.props.updateUser('child', {
        ...user.child,
        [props.field]: maskedFormat({ value: props.value, format: props.format, limit: 13, field: props.field })
      })
    } else if (props.field === 'secondDocNo') {
      this.props.updateUser('child', {
        ...user.child,
        [props.field]: maskedFormat({ value: props.value, format: props.format, limit: 13, field: props.field })
      })
    } else if (props.field === 'secondIdcard') {
      this.onPressNewChild()
    } else if (props.type === 'onFocus') {
      this.setState({ hidePicker: true })
    } else this.props.updateUser('child', { ...user.child, [props.field]: props.value })
    this.handleValidation({ field: props.field, value: props.value })
  }

  onPressNewChild = () => {
    const { fields, PreconditionRequired, InvalidArgument } = this.state
    const { user } = this.props
    if (!this.props.user.child.inVisible) {
      this.setState({
        fields: fields.map((d) => {
          if (!d.static) {
            if (d.field === 'secondDocExpDate' && this.props.user.child.secondExpireDateFlag === 'ไม่มีวันหมดอายุ') {
              return d
            } else {
              return { ...d, inVisible: false }
            }
          } else return d
        })
      })
      this.props.updateUser('child', {
        ...user.child,
        inVisible: !this.props.user.child.inVisible,
        inVisibleSecond: false
      })
    } else if (this.props.user.child.inVisible) {
      this.props.updateUser('child',
        {
          ...user.child,
          secondTitle: '',
          secondFirstName: '',
          secondLastName: '',
          secondBirthDay: `-/-/${tomorrowDate()[0]}`,
          secondDocNo: '',
          secondExpireDateFlag: this.props.user.child.secondExpireDateFlag,
          secondDocExpDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
          inVisible: !this.props.user.child.inVisible,
          inVisibleSecond: true
        })
      this.setState({
        fields: fields.map((d) => {
          if (!d.static) {
            return { ...d, inVisible: true }
          } else return d
        }),
        PreconditionRequired: PreconditionRequired.filter(o => o.field.indexOf('second') === -1),
        InvalidArgument: InvalidArgument.filter(o => o.field.indexOf('second') === -1)
      })
    }
  }

  getRequiredInvalid = (field) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const Required = find(PreconditionRequired, (o) => {
      if ((o.field === 'firstDayOfBirth ' || o.field === 'firstMonthOfBirth' || o.field === 'firstYearOfBirth') && field === 'firstBirthDay') return o
      if ((o.field === 'secondDayOfBirth ' || o.field === 'secondMonthOfBirth' || o.field === 'secondYearOfBirth') && field === 'secondBirthDay') return o
      return o.field === field
    })
    const Invalid = find(InvalidArgument, (o) => {
      if ((o.field === 'firstDayOfBirth ' || o.field === 'firstMonthOfBirth' || o.field === 'firstYearOfBirth') && field === 'firstBirthDay') return o
      if ((o.field === 'secondDayOfBirth ' || o.field === 'secondMonthOfBirth' || o.field === 'secondYearOfBirth') && field === 'secondBirthDay') return o
      return o.field === field
    })
    return { Required, Invalid }
  }

  handleValidation = ({ field, value }) => {
    const { PreconditionRequired, InvalidArgument } = this.state
    const { Required, Invalid } = this.getRequiredInvalid(field)

    if ((field === 'firstDocNo' || field === 'secondDocNo') && Invalid && validateIdentityCard(replaceSpace(value))) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    } else if ((field === 'firstFirstName' ||
      field === 'firstLastName' ||
      field === 'secondFirstName' ||
      field === 'secondLastName') && validateIdentityThaiLanguage(value)) {
      this.setState({ InvalidArgument: InvalidArgument.filter(o => o.field !== field) })
    }

    if (Required && RequiredFields(value)) {
      this.setState({
        PreconditionRequired: PreconditionRequired.filter(o => o.field !== field)
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
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [], hidePicker: true })

    const {
      firstTitle,
      firstTitleCode,
      firstFirstName,
      firstLastName,
      firstBirthDay,
      firstDocNo,
      firstExpireDateFlag,
      firstDocExpDate,
      secondTitle,
      secondTitleCode,
      secondFirstName,
      secondLastName,
      secondBirthDay,
      secondDocNo,
      secondExpireDateFlag,
      secondDocExpDate,
    } = user.child


    const data = {
      firstTitle,
      firstTitleCode,
      firstFirstName,
      firstLastName,
      firstDayOfBirth: getOfBirth(firstBirthDay, 'day'),
      firstMonthOfBirth: `${getOfBirth(firstBirthDay, 'month')}`,
      firstYearOfBirth: getOfBirth(firstBirthDay, 'year'),
      firstDocNo: replaceSpace(firstDocNo),
      firstIsNoExpDate: firstExpireDateFlag === 'มีวันหมดอายุ' ? false : true,
      firstDocExpDate: firstExpireDateFlag === 'มีวันหมดอายุ' ? convertDate(firstDocExpDate) : new Date('9999-12-31'),
      secondTitle,
      secondTitleCode,
      secondFirstName,
      secondLastName,
      secondDayOfBirth: getOfBirth(secondBirthDay, 'day'),
      secondMonthOfBirth: `${getOfBirth(secondBirthDay, 'month')}`,
      secondYearOfBirth: getOfBirth(secondBirthDay, 'year'),
      secondDocNo: replaceSpace(secondDocNo),
      secondIsNoExpDate: secondExpireDateFlag === 'มีวันหมดอายุ' ? false : true,
      secondDocExpDate: secondExpireDateFlag === 'มีวันหมดอายุ' ? convertDate(secondDocExpDate) : new Date('9999-12-31'),
    }

    try {
      const res = await this.props.saveChild({ variables: { input: data } })
      const success = get(res, 'data.saveChild.success', false)
      const code = get(res, 'data.saveChild.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.saveChild.message', errorMessage.messageIsNull.defaultMessage)
      const details = get(res, 'data.saveChild.details', [])

      if (success) {
        this.props.navigateAction({ ...this.props, page: 'career' })
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
          title="ข้อมูลบุตร หรือบุตรบุญธรรม"
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
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ref={ref => { this.refScrollView = ref }}
        >
          {
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              required: d.required,
              init: d.init,
              format: d.format,
              value: d.field === 'firstTitle'
                ? user.child['firstTitleDetail']
                : d.field === 'secondTitle'
                  ? user.child['secondTitleDetail']
                  : user.child[d.field],
              inVisible: d.inVisible,
              date: d.date,
              onSetLayout: val => this.onSetLayout(val.layout.y, key),
              handleInput: (props) => this.handleInput(props),
              hidePicker: this.state.hidePicker,
              err: this.onValidation(d.field)
            }, key))
          }
          <View style={{ display: this.props.user.child.inVisible ? 'none' : 'flex', flex: 1, width: widthView, justifyContent: 'flex-end', padding: 24, backgroundColor: colors.lightgrey }}>
            <TBold fontSize={16} color={colors.midnight} textAlign="left">ท่านมีบุตร หรือบุตรบุญธรรมมากกว่า 1 คนใช่ไหม?</TBold>
            <LongButton
              label="เพิ่มบุตร หรือบุตรบุญธรรม"
              style={{}}
              onPress={this.onPressNewChild}
            />
          </View>
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}
