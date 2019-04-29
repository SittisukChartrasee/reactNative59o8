import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongPositionButton, NextButton } from '../component/button'
import Modal from '../component/modal'
import { navigateAction } from '../redux/actions'

const { width: widthScreen } = Dimensions.get('window')

const fields = [
  {
    type: 'mask',
    label: 'หมายเลขบัตรประชาชน',
    field: 'idCard',
    option: '999 999 999 999',
  },
  {
    type: 'textInput',
    label: 'อีเมล',
    field: 'email',
  },
  // {
  //   type: 'mask',
  //   label: 'หมายเลขโทรศัพท์มือถือ',
  //   field: 'phone',
  //   option: '099 999 9999',
  // }
]

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    value: '',
    modal: false,
  }

  // handleInput = (id) => (value) => {
  //   console.log(id, value)
  //   this.setState({ [id]: value })
  // }

  handleInput = (obj) => {
    console.log(obj)
  }

  onNext = () => {
    const { navigateAction } = this.props
    navigateAction({ ...this.props, page: 'otp' })
  }

  render() {
    const { value, modal } = this.state
    const sizing = widthScreen <= 320 ? { width: 160, height: 110 } : {}
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
          <TBold fontSize={20} color={colors.white} mt="10" mb="40">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 }}>

          {
            fields.map((setField, key) => Input({
                ...setField,
                // value: this.state[setField.field] ? this.state[setField.field] : value,
                // handleInput: this.handleInput(setField.field),
                handleInput: value => this.handleInput(value),
              }, key)
            )
          }
        
        </View>
        <LongPositionButton label="ถัดไป" onPress={this.onNext} />

        {
          Modal({
            visible: modal,
            dis: `อีเมลหรือหมายเลขโทรศัพท์นี้ \nได้ทำการสมัครเปิดบัญชีแล้ว`,
            onPress: () => this.setState({ modal: false })
          })
        }
      </Screen> 
    )
  }
}


