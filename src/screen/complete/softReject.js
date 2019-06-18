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
import lockout from '../../containers/hoc/lockout'
import { containerQuery, getStatusEditing } from '../../containers/query'

const { width: widthView } = Dimensions.get('window')

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})
@connect(mapToProps, dispatchToProps)
@withApollo
@lockout
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
  }

  componentDidMount = () => {
    containerQuery(
      this.props.client,
      { query: getStatusEditing, fetchPolicy: "no-cache" },
      this.onHandleCard
    )
  }

  onHandleCard = val => {
    console.log(val)
    this.setState({
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
    const status = this.props.navigation.getParam('status', '')
    if (props.value === 'ถ่ายบัตรประชาชน') {
      this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera', params: { status } })
    } else if (props.value === 'ถ่ายบัตรประชาชนคู่ใบหน้า') {
      this.props.navigateAction({ ...this.props, page: 'tutorialFrontCamera', params: { status } })
    }
  }

  render() {
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
              <TLight color={colors.white}>{`ถ่ายรูปบัตรประชาชน และรูปคู่กับใบหน้าไม่ชัด\nกรุณาถ่ายใหม่ด้วยนะคะ`}</TLight>
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
            label="ส่งข้อมูลอีกครั้ง"
            style={{ marginHorizontal: 24 }}
            onPress={() => this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera' })}
          />
        </View>
      </Screen>
    )
  }
}