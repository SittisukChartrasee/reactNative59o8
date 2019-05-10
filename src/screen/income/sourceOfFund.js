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
        label: 'คุณได้รับเงินทุนจากแหล่งใด',
        type: 'modal',
        field: 'investmentSource',
        required: true,
        init: [
          {
            label: 'เงินเดือน',
            type: 'select',
          }, {
            label: 'มรดก',
            type: 'select',
          }, {
            label: 'การขายหลักทรัพย์',
            type: 'select',
          }, {
            label: 'ผลตอบแทนจากการลงทุน',
            type: 'select',
          }, {
            label: 'การดำเนินการทางธุรกิจ',
            type: 'select',
          }, {
            label: 'ค่านายหน้า',
            type: 'select',
          }, {
            label: 'ค่าตอบแทนการให้บริการ',
            type: 'select',
          }, {
            label: 'อื่นๆ',
            type: 'select',
            field: 'investmentSourceOther',
          }
        ]
      }, {
        label: 'แหล่งที่มาของเงินทุน',
        type: 'search',
        field: 'investmentSourceCountry',
        required: true,
      }, {
        label: 'วัตถุประสงค์การลงทุน',
        type: 'modal',
        field: 'investmentPurpose',
        required: true,
        init: [
          {
            label: "เพื่อการลงทุนระยะสั้น",
            type: 'select',
          }, {
            label: "เพื่อการลงทุนระยะยาว",
            type: 'select',
          }, {
            label: "เพื่อการเกษียณ",
            type: 'select',
          }, {
            label: "เพื่อเก็บออม",
            type: 'select',
          }, {
            label: "เพื่อสิทธิประโยชน์ทางภาษี",
            type: 'select',
          }, {
            label: "อื่นๆ",
            type: 'select',
            field: 'investmentPurposeOther',
          }
        ]
      }, {
        label: 'คุณต้องการหักภาษี ณ ที่จ่ายสำหรับเงินปันผลและค่าขายคืน หรือไม่ ?',
        type: 'radioColumn',
        init: [{ title: 'ต้องการ หักภาษี ณ ที่จ่าย', active: true }, { title: 'ไม่ใช่' }],
        field: 'dividendWithHoldingTax',
        required: false,
      },
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    if (props.type === 'modal') this.setState({ modal: true })
    else if (props.field === 'investmentSource') {
      const arr = props.data.split(',')
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: arr, investmentSourceOther: props.otherField })
    } else if (props.field === 'investmentSourceCountry') {
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value, nationalityCode: props.code, nationalityRisk: props.risk })
    } else if (props.field === 'investmentPurpose') {
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.data })
    } else {
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value })
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
    const { navigateAction, user } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry,
      investmentPurpose,
      dividendWithHoldingTax,
    } = user.sourceOfFund

    const data = {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry, // ยังไม่ได้แปลงเป็นตัวย่อ TH
      investmentPurpose,
      dividendWithHoldingTax: !(dividendWithHoldingTax === 'ไม่ใช่'),
    }

    this.props.saveSourceOfFund({ variables: { input: data } })
      .then(res => {
        if (user.sourceOfFund.nationalityRisk) {
          this.setState({ modal: true })
        } else if (res.data.saveSourceOfFund.success) {
          navigateAction({ ...this.props, page: 'addressHome' })
        } else if (!res.data.saveSourceOfFund.success) {
          switch (res.data.saveSourceOfFund.message) {
            case 'PreconditionRequired':
              this.setState({ PreconditionRequired: res.data.saveSourceOfFund.details })
            case 'InvalidArgument':
              this.setState({ InvalidArgument: res.data.saveSourceOfFund.details })
            default: return null
          }
        }
      })
  }

  render() {
    const { user } = this.props

    return (
      <Screen color="transparent">
        <NavBar
          title="เงินลงทุน"
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
              value: user.sourceOfFund[d.field],
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

        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}