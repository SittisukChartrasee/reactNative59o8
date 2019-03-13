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
import { connect } from 'react-redux'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongPositionButton, NextButton } from '../component/button'
import Modal from '../component/modal'

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
  {
    type: 'mask',
    label: 'หมายเลขโทรศัพท์มือถือ',
    field: 'phone',
    option: '099 999 9999',
  }
]

class Welcome extends React.Component {
  state = {
    value: '',
    modal: false,
  }

  onChangeText = (id) => (value) => {
    this.setState({ [id]: value })
  }

  render() {
    const { navigation } = this.props
    const { value, modal } = this.state
    const sizing = widthScreen <= 320 ? { width: 160, height: 110 } : {}
    return (
      <Screen>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image source={images.kmyfundLogo} style={sizing} resizeMode="contain" />
          <TBold fontSize={20} color={colors.white} mt="10" mb="40">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 }}>

          {
            fields.map(
              (setField, key) => Input({
                ...setField,
                value: this.state[setField.field] ? this.state[setField.field] : value,
                onChangeText: this.onChangeText(setField.field),
              }, key)
            )
          }
        
        </View>
          <LongPositionButton label="ถัดไป" onPress={() => navigation.navigate('passcode')} />
        </ScrollView>

        <Modal
          visible={modal}
          dis={`อีเมลหรือหมายเลขโทรศัพท์นี้ \nได้ทำการสมัครเปิดบัญชีแล้ว  `}
          onPress={() => this.setState({ modal: false })}
        />
      </Screen> 
    )
  }
}

const mapToProps = ({ root }) => ({ root })
export default connect(mapToProps)(Welcome)
