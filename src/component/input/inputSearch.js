import React from 'react'
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native'
import {
  TBold,
  TLight,
  TMed,
  TSemiBold,
  TText,
  TThin
} from '../texts'
import { LongButton } from '../button'
import images from '../../config/images'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

export default class extends React.Component {
  state = {
    open: false,
    text: '',
    confirmText: '',
  }

  render() {
    const { open, confirmText } = this.state
    const { onChangeText, field } = this.props
    StatusBar.setBarStyle(open ? "dark-content" : "light-content")

    onChangeText({ type: 'SEARCH', field, value: confirmText })
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ open: true })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          { confirmText 
              ? <TBold textAlign="left" color={colors.midnight}>{confirmText}</TBold>
              : <TBold textAlign="left" color={colors.smoky}>กรุณาเลือกข้อมูล</TBold>
          }
            <Image source={images.iconNextPageBlack} />
          </View>
          <View style={{ height: 1, backgroundColor: colors.smoky, marginTop: 5 }} />
        </TouchableOpacity>

        <Modal visible={open} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

            <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
              <TouchableOpacity onPress={() => this.setState({ open: false })}>
                <Image source={images.iconback} style={{ tintColor: 'rgb(80, 87, 89)' }} />
              </TouchableOpacity>
              <TLight fontSize={14} textAlign="left" color={colors.grey} mt={16}>ค้นหาตำบลของคุณ</TLight>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontSize: 28, fontFamily: fonts.sukhumvitBold }}
                  autoFocus
                  value={this.state.text}
                  onChangeText={(text) => this.setState({ text })}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ text: '', confirmText: '' })}
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Image source={images.iconRemove} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={{ flex: 1, backgroundColor: colors.lightgrey }} contentContainerStyle={{ paddingBottom: 30  }}>
                <TouchableOpacity onPress={() => this.setState({ open: false, confirmText: 'บางกระทึก', text: 'บางกระทึก' })}>
                  <View style={{ marginVertical: 16 }}>
                    <TBold textAlign="left" ml={24} mr={24}>บางกระทึก</TBold>
                  </View>
                  <View style={{ height: 1, backgroundColor: colors.smoky, marginLeft: 24 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({ open: false, confirmText: 'บางกระทาก', text: 'บางกระทาก' })}>
                  <View style={{ marginVertical: 16 }}>
                    <TBold textAlign="left" ml={24} mr={24}>บางกระทาก</TBold>
                  </View>
                  <View style={{ height: 1, backgroundColor: colors.smoky, marginLeft: 24 }} />
                </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}