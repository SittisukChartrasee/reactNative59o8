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
import _ from 'lodash'
import { withApollo } from 'react-apollo'
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
import { getUserTitle, getCountry } from '../../containers/query'

const checkTitle = (field) => {
  if (field.toLowerCase().search('title') > -1) return 'ค้นหาคำนำหน้า (ตัวย่อ)'
  if (field.toLowerCase().search('country') > -1) return 'ค้นหาประเทศ'
  return 'ค้นหาตำบลของคุณ'
}

@withApollo
export default class extends React.Component {
  state = {
    open: false,
    text: '',
    confirmText: '',
    result: [],
  }

  queryTitle = _.debounce((value) => {
    this.props.client.query({
      query: getUserTitle,
      variables: {
        text: value,
      },
    })
      .then((val) => {
        this.setState({ result: val.data.getUserTitle })
      })
      .catch(err => console.error(err))
  }, 300)

  queryCountry = _.debounce((value) => {
    this.props.client.query({
      query: getCountry,
      variables: {
        text: value,
      },
    })
      .then((val) => {
        this.setState({ result: val.data.getCountry })
      })
      .catch(err => console.error(err))
  }, 300)

  onHandleSetText = ({ text, field }) => {
    this.setState({ text })

    if (field.toLowerCase().search('title') > -1) this.queryTitle(text.trim())
    else if (field.toLowerCase().search('country') > -1) this.queryCountry(text.trim())
  }

  render() {
    const { open, confirmText } = this.state
    const { handleInput, field } = this.props
    StatusBar.setBarStyle(open ? "dark-content" : "light-content")
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
              <TLight fontSize={14} textAlign="left" color={colors.grey} mt={16}>{checkTitle(field)}</TLight>
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
                  onChangeText={text => this.onHandleSetText({ text, field })}
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
              {
                this.state.result.map((d, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={
                      () => {
                        this.setState({ open: false, confirmText: d.nameTH, text: d.nameTH })
                        handleInput({ type: 'SEARCH', field, value: confirmText })
                      }}
                  >
                    <View style={{ marginVertical: 16 }}>
                      <TBold textAlign="left" ml={24} mr={24}>{d.nameTH}</TBold>
                    </View>
                    <View style={{ height: 1, backgroundColor: colors.smoky, marginLeft: 24 }} />
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}