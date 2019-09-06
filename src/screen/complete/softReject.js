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
import { containerQuery, getStatusEditing } from '../../containers/query'
import setMutation from '../../containers/mutation'
import typeModal from '../../utility/typeModal'

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

  componentDidMount = () => {
    containerQuery(
      this.props.client,
      { query: getStatusEditing, fetchPolicy: "no-cache" },
      this.onHandleCard
    )
  }

  onHandleCard = val => {
    let status = false
    let statusText = ''
    if (val.data.getStatusEditing.idCard) {
      if (val.data.getStatusEditing.selfie) {
        statusText = `ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
        if (!val.data.getStatusEditing.checkIDCard ||
          !val.data.getStatusEditing.checkSelfie) status = true
      } else {
        statusText = `ถ่ายรูปบัตรประชาชนไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
        if (!val.data.getStatusEditing.checkIDCard) status = true
      }
    } else if (val.data.getStatusEditing.selfie) {
      statusText = `ถ่ายรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่อีกครั้ง`
      if (!val.data.getStatusEditing.checkSelfie) status = true
    } else { status = false }

    this.setState({
      statusText,
      statusEdit: status,
      card: this.state.card.map(d => {
        if (d.label === 'ถ่ายบัตรประชาชน') {
          return {
            ...d,
            active: val.data.getStatusEditing.checkIDCard,
            inVisible: !val.data.getStatusEditing.idCard
          }
        }
        if (d.label === 'ถ่ายบัตรประชาชนคู่ใบหน้า') {
          return {
            ...d,
            active: val.data.getStatusEditing.checkSelfie,
            inVisible: !val.data.getStatusEditing.selfie
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

  onNext = () => {
    this.props.saveWaitingApprove()
      .then(res => {
        console.log(res)
        if (res.data.saveWaitingApprove.success) {
          this.props.navigateAction({ ...this.props, page: 'waiting' })
        } else if (!res.data.saveWaitingApprove.success) {
          return this.props.toggleModal({
            ...typeModal[res.data.saveWaitingApprove.code],
            dis: res.data.saveWaitingApprove.message
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { statusEdit, statusText } = this.state
    console.log(statusEdit)
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