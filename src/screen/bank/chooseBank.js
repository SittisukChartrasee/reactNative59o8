import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { LongPositionButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import { navigateAction } from '../../redux/actions'
import colors from '../../config/colors';
import lockout from '../../containers/hoc/lockout'
import setMutation from '../../containers/mutation'
import { root, updateUser } from '../../redux/actions/commonAction'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const handleDisabled = arr => arr && arr.find(d => d.active) !== undefined && arr.find(d => d.active)

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
export default class extends React.Component {
  state = {
    selected: '',
    card: [
      // {
      //   label: 'ธนาคารกรุงเทพ',
      //   image: images.iconBbl,
      //   type: 'selectCard',
      // },
      {
        label: 'ธนาคารกสิกรไทย',
        image: images.iconkbank,
        type: 'selectCard',
      },
      {
        label: 'ธนาคารไทยพาณิชย์',
        image: images.iconscb,
        type: 'selectCard',
      },
      // {
      //   label: 'ข้าม',
      //   type: 'selectCard',
      //   link: 'suittest',
      // }
    ],
    fields: [
      {
        label: 'สาขาบัญชีธนาคาร',
        type: 'search',
      }, {
        label: 'เลขที่บัญชี',
        type: 'textInput',
      }
    ]
  }

  handleInput = (props) => {
    if (props.type === 'selectCard') {
      this.setState({ selected: props.value })
      this.setState({ card: this.state.card.map((d) => d.label === props.value ? { ...d, active: true } : { ...d, active: false }) })
      this.props.updateUser('bank', { bankName: props.value })
    }
  }

  onNext = async () => {
    const data = { bank: this.state.selected === 'ธนาคารไทยพาณิชย์' ? 'SCB' : 'KASIKORN' }

    try {
      const res = await this.props.registerBank({ variables: { input: data } })
      const success = get(res, 'data.registerBank.success', false)
      const code = get(res, 'data.registerBank.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.registerBank.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        this.props.updateUser('bank', {
          ...this.props.user.bank,
          urlbank: res.data.registerBank.url,
        })

        return this.props.navigateAction({
          ...this.props,
          page: "connectBank",
          params: {
            bankName: this.state.selected,
            url: res.data.registerBank.url
          }
        })
      } else {
        this.props.toggleModal({
          ...typeModal[code],
          dis: message
        })
      }

    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="เลือกธนาคาร"
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
          style={{ backgroundColor: colors.lightgrey }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: colors.white, paddingBottom: 24 }}>
            {
              this.state.card.map((d, key) => Input({
                field: d.field,
                label: d.label,
                type: d.type,
                init: d.init,
                image: d.image,
                active: d.active,
                handleInput: (props) => this.handleInput(props),
              }, key))
            }
          </View>

          {/* {
            handleDisabled(this.state.card).active && (
              <View style={{ backgroundColor: colors.white, paddingBottom: 24, marginTop: 8 }}>
                {
                  this.state.fields.map((d, key) => Input({
                    field: d.field,
                    label: d.label+handleDisabled(this.state.card).label,
                    type: d.type,
                    handleInput: (props) => this.handleInput(props),
                  }, key))
                }
              </View>
            )
          } */}
        </KeyboardAwareScrollView>

        <LongPositionButton onPress={this.onNext} disabled={!handleDisabled(this.state.card).active} bg={colors.lightgrey} label="ยืนยัน" />
      </Screen>
    )
  }
}