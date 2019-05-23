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
        init: [{ title: 'ต้องการ หักภาษี ณ ที่จ่าย', active: true }, { title: 'ไม่ต้องการ' }],
        field: 'dividendWithHoldingTax',
        required: false,
      },
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    if (props.field === 'investmentSource') {
      const arr = props.data.split(',')
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: arr, investmentSourceOther: props.otherField })
    } else if (props.field === 'investmentSourceCountry') {
      updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value, nationalityCode: props.code })
    }
    // ตรวจสอบความเสี่ยงของประเทศ

    // else if (props.field === 'investmentSourceCountry') {
    //   updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value, nationalityCode: props.code, nationalityRisk: props.risk })
    // } 
    else if (props.field === 'investmentPurpose') {
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
    const { navigateAction, user, updateRoot } = this.props
    await this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry,
      investmentPurpose,
      dividendWithHoldingTax,
      nationalityCode,
    } = user.sourceOfFund

    const data = {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry: nationalityCode,
      investmentPurpose,
      dividendWithHoldingTax: !(dividendWithHoldingTax === 'ไม่ต้องการ'),
    }

    console.log(data)

    if (data.investmentSourceCountry === 'US') {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        onPress: () => updateRoot('modal', { visible: false })
      }
      return updateRoot('modal', modal)
    } else {
      this.props.saveSourceOfFund({ variables: { input: data } })
        .then(res => {
          if (res.data.saveSourceOfFund.success) {
            navigateAction({ ...this.props, page: 'addressHome' })
          } else if (!res.data.saveSourceOfFund.success) {
            switch (res.data.saveSourceOfFund.message) {
              case 'PreconditionRequired':
                return this.setState({ PreconditionRequired: res.data.saveSourceOfFund.details })
              case 'InvalidArgument':
                return this.setState({ InvalidArgument: res.data.saveSourceOfFund.details })
              default:
                const modal = {
                  dis: res.data.saveSourceOfFund.message,
                  visible: true,
                  onPress: () => updateRoot('modal', { visible: false })
                }
                return updateRoot('modal', modal)
            }
          }
        })
    }
  }

  render() {
    const { user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="เงินลงทุน"
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
              value: user.sourceOfFund[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
              err: this.onValidation(d.field),
            }, key))
          }
        </KeyboardAwareScrollView>
        <NextButton onPress={this.onNext} />
      </Screen>
    )
  }
}