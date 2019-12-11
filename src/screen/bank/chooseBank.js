import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native'
import { withApollo } from 'react-apollo'
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
import { getBankList } from '../../containers/query'
import { root, updateUser } from '../../redux/actions/commonAction'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'
import bankDetail from '../../utility/bankList/bankDetail'
import releaseApp from '../../../release/releaseApp.json'

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
@withApollo
export default class extends React.Component {
  state = {
    selected: '',
    card: [],
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

  componentDidMount = async () => {
    try {
      const res = await this.props.client.query({ query: getBankList })
      const bankList = get(res, 'data.getBankList', null) || bankDetail

      this.setState({ card: bankList.map(props => ({ label: props.nameTh, image: images[props.image], type: 'selectCard', selected: props.selected })) })

    } catch (error) {
      this.setState({ card: bankDetail.map(props => ({ label: props.nameTh, image: images[props.image], type: 'selectCard', selected: props.selected })) })
    }
  }

  handleInput = (props) => {
    if (releaseApp.modeDev && props.selected === 'SKIP') {
      return this.props.navigateAction({ ...this.props, page: "suittest" })
    }

    if (props.type === 'selectCard') {
      this.setState({ selected: props.selected })
      this.setState({ card: this.state.card.map((d) => d.label === props.value ? { ...d, active: true } : { ...d, active: false }) })
      this.props.updateUser('bank', { ...this.props.user.bank, bankName: props.value })
    }
  }

  onNext = async () => {

    try {
      const res = await this.props.registerBank({ variables: { input: { bank: this.state.selected } } })
      const success = get(res, 'data.registerBank.success', false)
      const code = get(res, 'data.registerBank.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.registerBank.message', errorMessage.messageIsNull.defaultMessage)
      const url = get(res, 'data.registerBank.url', '')

      if (success) {
        this.props.updateUser('bank', { ...this.props.user.bank, urlbank: url })

        return this.props.navigateAction({ ...this.props, page: "connectBank" })
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
              this.state.card.map(d => {
                if (d.selected === 'SKIP') {
                  if (releaseApp.modeDev) {
                    return (
                      <Input
                        key={d.selected}
                        field={d.field}
                        label={d.label}
                        selected={d.selected}
                        type={d.type}
                        init={d.init}
                        image={d.image}
                        active={d.active}
                        handleInput={(props) => this.handleInput(props)}
                      />
                    )
                  }
                } else {
                  return (
                    <Input
                      key={d.selected}
                      field={d.field}
                      label={d.label}
                      selected={d.selected}
                      type={d.type}
                      init={d.init}
                      image={d.image}
                      active={d.active}
                      handleInput={(props) => this.handleInput(props)}
                    />
                  )
                }
              })
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