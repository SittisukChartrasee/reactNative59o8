import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
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
        labelOther: 'โปรดระบุแหล่งเงินทุน',
        type: 'modal',
        field: 'investmentSource',
        required: true,
        init: [
          {
            label: 'เงินเดือน',
            type: 'select',
            active: false,
          }, {
            label: 'มรดก',
            type: 'select',
            active: false,
          }, {
            label: 'เงินออม',
            type: 'select',
            active: false,
          }, {
            label: 'การลงทุน',
            type: 'select',
            active: false,
          }, {
            label: 'เงินเกษียณ',
            type: 'select',
            active: false,
          }, {
            label: 'ประกอบธุรกิจ',
            type: 'select',
            active: false,
          }, {
            label: 'อื่นๆ',
            type: 'select',
            active: false,
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
        labelOther: 'โปรดระบุวัตถุประสงค์การลงทุน',
        type: 'modal',
        field: 'investmentPurpose',
        required: true,
        init: [
          {
            label: "เงินเดือน",
            type: 'select',
            active: false,
          }, {
            label: "เงินออม",
            type: 'select',
            active: false,
          }, {
            label: "เงินเกษียณ",
            type: 'select',
            active: false,
          }, {
            label: "มรดก",
            type: 'select',
            active: false,
          }, {
            label: "การลงทุน",
            type: 'select',
          }, {
            label: "ประกอบธุรกิจ",
            type: 'select',
            active: false,
          }, {
            label: "อื่นๆ",
            type: 'select',
            active: false,
            field: 'investmentPurposeOther',
          }
        ]
      },

      // ทาง KA บอกให้ตัดออก
      // {
      //   label: 'คุณต้องการหักภาษี ณ ที่จ่ายสำหรับเงินปันผลและค่าขายคืน หรือไม่ ?',
      //   type: 'radioColumn',
      //   init: [{ title: 'ต้องการ หักภาษี ณ ที่จ่าย', active: true }, { title: 'ไม่ต้องการ' }],
      //   field: 'dividendWithHoldingTax',
      //   required: false,
      // },
    ]
  }
  componentDidMount = () => {
    this.setState({
      fields: this.state.fields.map(d => {
        if (d.field === 'investmentSource') {
          const init = d.init.map(k => { return { ...k, active: this.props.user.sourceOfFund.investmentSource.indexOf(k.label) !== -1 ? true : false } })
          return { ...d, init: init }
        } else if (d.field === 'investmentPurpose') {
          const init = d.init.map(k => { return { ...k, active: this.props.user.sourceOfFund.investmentPurpose.includes(k.label) } })
          return { ...d, init: init }
        } else return { ...d }
      })
    })
  }

  handleInput = (props) => {
    const { user } = this.props
    if (props.field === 'investmentSource') {
      const arr = props.data.split(',')
      this.props.updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: arr, investmentSourceOther: props.otherField })
      this.setState({
        fields: this.state.fields.map(d => {
          if (d.field === 'investmentSource') {
            return { ...d, init: props.result }
          } else return { ...d }
        })
      })
    } else if (props.field === 'investmentSourceCountry') {
      this.props.updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value, nationalityCode: props.code })
    }
    // ตรวจสอบความเสี่ยงของประเทศ

    // else if (props.field === 'investmentSourceCountry') {
    //   updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value, nationalityCode: props.code, nationalityRisk: props.risk })
    // } 
    else if (props.field === 'investmentPurpose') {
      this.props.updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.data, investmentPurposeOther: props.otherField })
      this.setState({
        fields: this.state.fields.map(d => {
          if (d.field === 'investmentPurpose') {
            return { ...d, init: props.result }
          } else return { ...d }
        })
      })
    } else {
      this.props.updateUser('sourceOfFund', { ...user.sourceOfFund, [props.field]: props.value })
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

  onNext = () => {
    const { user } = this.props
    this.setState({ PreconditionRequired: [], InvalidArgument: [] })
    const {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry,
      investmentPurpose,
      investmentPurposeOther,
      nationalityCode,
      dividendWithHoldingTax,
    } = user.sourceOfFund

    const data = {
      investmentSource,
      investmentSourceOther,
      investmentSourceCountry: nationalityCode,
      investmentPurpose,
      investmentPurposeOther,
      // dividendWithHoldingTax: !(dividendWithHoldingTax === 'ไม่ต้องการ'), // ทาง KA บอกให้ตัดออก
      dividendWithHoldingTax
    }

    console.log(data)

    if (data.investmentSourceCountry === 'US') {
      const modal = {
        dis: `ขออภัยท่านไม่สามารถเปิดบัญชีกองทุน\nผ่านช่องทาง K-My Funds ได้\nกรุณาติดต่อ KAsset Contact Center\n02 673 3888 กด 1 และ กด 1`,
        visible: true,
        labelBtn: 'ติดต่อ 02 673 3888',
        onPress: () => Linking.openURL(`tel:026733888`),
        onPressClose: () => this.props.updateRoot('modal', { visible: false })
      }
      return this.props.updateRoot('modal', modal)
    } else {
      this.props.saveSourceOfFund({ variables: { input: data } })
        .then(res => {
          if (res.data.saveSourceOfFund.success) {
            this.props.navigateAction({ ...this.props, page: 'addressHome' })
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
                  onPress: () => this.props.updateRoot('modal', { visible: false }),
                  onPressClose: () => this.props.updateRoot('modal', { visible: false })
                }
                return this.props.updateRoot('modal', modal)
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
              labelOther: d.labelOther,
              type: d.type,
              required: d.required,
              init: d.init,
              value: user.sourceOfFund[d.field],
              otherField: (user.sourceOfFund[`${d.field}Other`])
                ? user.sourceOfFund[`${d.field}Other`]
                : null
              ,
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