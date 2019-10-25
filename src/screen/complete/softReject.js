import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native'
import { withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import Input from '../../component/input'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import { navigateAction } from '../../redux/actions'
import { root } from '../../redux/actions/commonAction'
import lockout from '../../containers/hoc/lockout'
import { getStatusEditing } from '../../containers/query'
import setMutation from '../../containers/mutation'
import typeModal from '../../utility/typeModal'
import { errorMessage } from '../../utility/messages'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
@setMutation
export default class extends React.Component {
  state = {
    card: [
      {
        label: 'ถ่ายบัตรประชาชน',
        type: 'linkCard',
        active: true,
        inVisible: true,
      }, {
        label: 'ถ่ายบัตรประชาชนคู่ใบหน้า',
        type: 'linkCard',
        active: true,
        inVisible: true,
      }
    ],
    statusEdit: true,
    statusText: ''
  }

  componentDidMount = async () => {
    try {
      const res = await this.props.client.query({ query: getStatusEditing, fetchPolicy: "no-cache" })
      const idCard = get(res, 'data.getStatusEditing.idCard', false)
      const selfie = get(res, 'data.getStatusEditing.selfie', false)
      const checkIDCard = get(res, 'data.getStatusEditing.checkIDCard', false)
      const checkSelfie = get(res, 'data.getStatusEditing.checkSelfie', false)

      this.onHandleCard({ idCard, selfie, checkIDCard, checkSelfie })
    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  onHandleCard = ({ idCard, selfie, checkIDCard, checkSelfie }) => {
    let status = false
    let statusText = ''

    if (idCard) {
      if (selfie) {
        statusText = `ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
        if (!checkIDCard || !checkSelfie) status = true
      } else {
        statusText = `ถ่ายรูปบัตรประชาชนไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
        if (!checkIDCard) status = true
      }
    } else if (selfie) {
      statusText = `ถ่ายรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
      if (!checkSelfie) status = true
    } else {
      status = false
    }

    this.setState({
      statusText,
      statusEdit: status,
      card: this.state.card.map(d => {
        if (d.label === 'ถ่ายบัตรประชาชน') {
          return {
            ...d,
            active: checkIDCard,
            inVisible: !idCard
          }
        }
        if (d.label === 'ถ่ายบัตรประชาชนคู่ใบหน้า') {
          return {
            ...d,
            active: checkSelfie,
            inVisible: !selfie
          }
        }
      })
    })
  }

  handleInput = (props) => {
    if (props.value === 'ถ่ายบัตรประชาชน') {
      this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera', params: { status: 'Editing' } })
    } else if (props.value === 'ถ่ายบัตรประชาชนคู่ใบหน้า') {
      this.props.navigateAction({ ...this.props, page: 'tutorialFrontCamera', params: { status: 'Editing' } })
    }
  }

  onNext = async () => {
    try {
      const res = await this.props.saveWaitingApprove()
      const success = get(res, 'data.saveWaitingApprove.success', false)
      const code = get(res, 'data.saveWaitingApprove.code', errorMessage.messageIsNull.code)
      const message = get(res, 'data.saveWaitingApprove.message', errorMessage.messageIsNull.defaultMessage)

      if (success) {
        this.props.navigateAction({ ...this.props, page: 'waiting' })
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
    const { statusEdit, statusText } = this.state
    return (
      <Screen>
        <NavBar
          color="transparent"
          title="กรุณาแก้ไขข้อมูล"
          navRight={
            <TouchableOpacity
              onPress={() => this.props.lockout()}
              style={{ paddingLeft: 30 }}
            >
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingTop: 40 }}>
            <View style={{ alignItems: 'center' }}>
              <Image source={images.iconEdit} style={{ width: widthView * .6, marginBottom: 53 }} resizeMode="contain" />
              <TLight color={colors.white}>{statusText}</TLight>
            </View>
            {
              this.state.card.map((d, key) => Input({
                field: d.field,
                label: d.label,
                type: d.type,
                init: d.init,
                image: d.image,
                active: d.active,
                inVisible: d.inVisible,
                handleInput: (props) => this.handleInput(props),
              }, key))
            }
          </View>
        </ScrollView>

        <View style={{ paddingBottom: 44 }}>
          <LongButton
            label="ส่งข้อมูล"
            style={{ marginHorizontal: 24 }}
            disabled={statusEdit}
            onPress={this.onNext}
          />
        </View>
      </Screen>
    )
  }
}