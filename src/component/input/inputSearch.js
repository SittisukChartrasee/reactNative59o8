import React from 'react'
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Text,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
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
import {
  getUserTitle,
  getCountry,
  getSubDistrict,
  getAddressCode,
  getBusinessType,
  getOccupation
} from '../../containers/query'
import { updateUser } from '../../redux/actions/commonAction'
import Input from '../input'
import { errorMessage } from '../../utility/messages'


const checkTitle = (field = '') => {
  if (field.toLowerCase().search('title') > -1) return 'ค้นหาคำนำหน้า'
  if (field.toLowerCase().search('country') > -1) return 'ค้นหาประเทศ'
  if (field.toLowerCase().search('bustype') > -1) return 'ค้นหาประเภทธุรกิจ'
  if (field.toLowerCase().search('occupation') > -1) return 'ค้นหาอาชีพ'
  return 'ระบุตำบล'
}

const query = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
@withApollo
export default class extends React.Component {
  static defaultProps = {
    value: '',
    handleInput: () => console.log('required this func "handleInput"'),
    onHandleDistrict: () => console.log('required this func "onHandleDistrict"')
  }

  state = {
    open: false,
    text: '',
    confirmText: this.props.value,
    result: [],
    errorMessage: ''
  }

  onHandleSetText = async ({ text = '', field }) => {
    this.setState({ text })
    if (field.toLowerCase().search('title') > -1) {
      try {
        const res = await this.props.client.query({ query: getUserTitle, variables: { text: text.trim() } })
        const result = get(res, 'data.getUserTitle', [])

        return this.setState({ result, errorMessage: '' })
      } catch (error) {
        this.setState({ errorMessage: errorMessage.requestError.defaultMessage })
      }
    } else if (field.toLowerCase().search('country') > -1) {
      try {
        const res = await this.props.client.query({ query: getCountry, variables: { text: text.trim() } })
        const result = get(res, 'data.getCountry', [])

        return this.setState({ result, errorMessage: '' })
      } catch (error) {
        this.setState({ errorMessage: errorMessage.requestError.defaultMessage })
      }
    } else if (field.toLowerCase().search('district') > -1) {
      try {
        const res = await this.props.client.query({ query: getSubDistrict, variables: { text: text.trim() } })
        const result = get(res, 'data.getSubDistrict', [])

        return this.setState({ result, errorMessage: '' })
      } catch (error) {
        this.setState({ errorMessage: errorMessage.requestError.defaultMessage })
      }
    } else if (field.toLowerCase().search('bustype') > -1) {
      try {
        const res = await this.props.client.query({ query: getBusinessType, variables: { text: text.trim() } })
        const result = get(res, 'data.getBusinessType', [])

        return this.setState({ result, errorMessage: '' })
      } catch (error) {
        this.setState({ errorMessage: errorMessage.requestError.defaultMessage })
      }
    } else if (field.toLowerCase().search('occupation') > -1) {
      try {
        const res = await this.props.client.query({ query: getOccupation, variables: { text: text.trim() } })
        const result = get(res, 'data.getOccupation', [])

        return this.setState({ result, errorMessage: '' })
      } catch (error) {
        this.setState({ errorMessage: errorMessage.requestError.defaultMessage })
      }
    }
  }

  onHandleOnPress = async data => {
    const { field, user, onHandleDistrict } = this.props
    this.setState({
      open: false,
      confirmText: data.nameDetail ? data.nameDetail : data.nameTH,
      text: data.nameDetail ? data.nameDetail : data.nameTH
    })

    await this.props.handleInput && this.props.handleInput({
      type: 'SEARCH',
      field,
      value: data.nameTH,
      ...(code => code ? ({ code, risk: data.risk }) : {})(data.code),
      ...(nameDetail => nameDetail ? ({ nameDetail: nameDetail, titleGender: data.gender }) : { titleGender: null })(data.nameDetail)
    })

    if (data.displayName) {
      query(this.props.client, {
        query: getAddressCode,
        variables: { code: data.code }
      }, val => {
        onHandleDistrict({ data, val })
      }
      )
    }

    if (data.nameTH.indexOf('อื่นๆ') > -1) { // check ผิดรึปล่าว
      this.props.handleInput && this.props.handleInput({
        type: 'textInput',
        field: `${field}_other`,
        value: ''
      })
    }
  }

  render() {
    const { open, confirmText } = this.state
    const { field, value, err, handleInput } = this.props
    StatusBar.setBarStyle(open ? "dark-content" : "light-content")
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.handleInput({ type: 'onFocus' })
            this.onHandleSetText({ text: this.state.text, field })
            this.setState({ open: true })
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {
              (value === '' || value)
                ? <TBold textAlign="left" color={value === '' ? colors.smoky : colors.midnight}>{value === '' ? 'กรุณาเลือกข้อมูล' : value}</TBold>
                : <TBold textAlign="left" color={colors.midnight}>{confirmText}</TBold>
            }
            <Image source={images.iconNextPageBlack} />
          </View>
          <View style={{
            height: (err && (value.indexOf('อื่นๆ') === -1 || this.state.text.indexOf('อื่นๆ') === -1)) ? 2 : 1,
            backgroundColor: (err && (value.indexOf('อื่นๆ') === -1 || this.state.text.indexOf('อื่นๆ') === -1)) ? 'rgb(213, 0, 0)' : colors.smoky,
            marginTop: 5
          }} />
          <Text style={{
            fontFamily: fonts.sukhumvitLight,
            fontSize: 12,
            color: (err && (value.indexOf('อื่นๆ') === -1 || this.state.text.indexOf('อื่นๆ') === -1)) ? 'rgb(213, 0, 0)' : undefined,
            marginTop: 4
          }}>{err}</Text>
        </TouchableOpacity>

        {
          (value.indexOf('อื่นๆ') > -1 || this.state.text.indexOf('อื่นๆ') > -1) &&
          Input({
            label: 'อื่นๆ (โปรดระบุ)',
            type: 'textInput',
            field: `${field}_other`,
            value: this.props.valueOther,
            handleInput: value => handleInput({ value, type: 'textInput', field: `${field}_other` }),
            err: this.props.err,
            style: { paddingHorizontal: 0, marginTop: -20 },
          })
        }

        <Modal visible={open} onRequestClose={() => this.setState({ open: false })} animationType="slide">
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

            <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
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
                  style={{
                    ...((p) => p === 'android' ? ({ fontWeight: '400' }) : ({}))(Platform.OS),
                    flex: 1,
                    fontSize: 28,
                    fontFamily: fonts.sukhumvitBold
                  }}
                  autoFocus
                  value={this.state.text}
                  onChangeText={text => this.onHandleSetText({ text, field })}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ text: '', confirmText: '' })
                    this.onHandleSetText({ text: '', field })
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={images.iconRemove} />
                </TouchableOpacity>
              </View>
            </View>

            {
              this.state.errorMessage
                ? <View style={{ flex: 1, backgroundColor: colors.lightgrey, paddingTop: 24, paddingHorizontal: 24 }}>
                  <TBold fontSize={14} color={colors.shadow}>{this.state.errorMessage}</TBold>
                </View>
                : <FlatList
                  keyboardShouldPersistTaps="handled"
                  data={this.state.result}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.onHandleOnPress(item)}>
                      <View style={{ marginVertical: 16 }}>
                        <TBold textAlign="left" ml={24} mr={24}>{item.nameDetail ? item.nameDetail : (item.displayName || item.nameTH)}</TBold>
                      </View>
                      <View style={{ height: 1, backgroundColor: colors.smoky, marginLeft: 24 }} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(i, key) => `${key}`}
                />
            }
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}