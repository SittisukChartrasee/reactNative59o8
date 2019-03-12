import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { TBold } from '../component/texts'
import Screen from '../component/screenComponent'
import colors from '../config/colors'
import images from '../config/images'
import Input from '../component/input'
import { LongButton, NextButton } from '../component/button'

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
  }

  onChangeText = (id) => (value) => {
    this.setState({ [id]: value })
  }

  render() {
    const { value } = this.state
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={images.kmyfundLogo} />
          <TBold fontSize={20} color={colors.white} mt="30">{`ลงทะเบียนเปิดบัญชีลงทุน\nผ่านแอปพลิเคชั่น`}</TBold>
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 24 }}>

          {
            fields.map(
              (setField, key) => Input({
                ...setField,
                value: this.state[setField.field] ? this.state[setField.field] : value,
                onChangeText: this.onChangeText(setField.field),
              }, key)
            )
          }
        


          <LongButton label="ถัดไป" />
        </View>
      </Screen> 
    )
  }
}

const mapToProps = ({ root }) => ({ root })
export default connect(mapToProps)(Welcome)
