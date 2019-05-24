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
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import debounce from 'lodash/debounce'
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

const checkTitle = (field = '') => {
  if (field.toLowerCase().search('title') > -1) return 'ค้นหาคำนำหน้า (ตัวย่อ)'
  if (field.toLowerCase().search('country') > -1) return 'ค้นหาประเทศ'
  if (field.toLowerCase().search('bustype') > -1) return 'ค้นหาประเภทธุรกิจ'
  if (field.toLowerCase().search('occupation') > -1) return 'ค้นหาอาชีพ'
  return 'ค้นหาตำบลของคุณ'
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
    confirmText: '',
    result: [],
  }

  onHandleSetText = ({ text = '', field }) => {
    this.setState({ text })
    if (field.toLowerCase().search('title') > -1) {
      query(this.props.client, {
        query: getUserTitle,
        variables: { text: text.trim() }
      }, val => this.setState({ result: val.data.getUserTitle })
      )
    } else if (field.toLowerCase().search('country') > -1) {
      query(this.props.client, {
        query: getCountry,
        variables: { text: text.trim() }
      }, val => this.setState({ result: val.data.getCountry })
      )
    } else if (field.toLowerCase().search('district') > -1) {
      query(this.props.client, {
        query: getSubDistrict,
        variables: { text: text.trim() }
      }, val => {
        this.setState({ result: val.data.getSubDistrict })
      }
      )
    } else if (field.toLowerCase().search('bustype') > -1) {
      query(this.props.client, {
        query: getBusinessType,
        variables: { text: text.trim() }
      }, val => {
        this.setState({ result: val.data.getBusinessType })
      }
      )
    } else if (field.toLowerCase().search('occupation') > -1) {
      query(this.props.client, {
        query: getOccupation,
        variables: { text: text.trim() }
      }, val => {
        this.setState({ result: val.data.getOccupation })
      }
      )
    }
  }

  onHandleOnPress = data => {
    const { field, user, onHandleDistrict } = this.props
    this.setState({ open: false, confirmText: data.nameTH, text: data.nameTH })
    this.props.handleInput && this.props.handleInput({ type: 'SEARCH', field, value: data.nameTH, ...(code => code ? ({ code, risk: data.risk }) : {})(data.code) })

    if (data.displayName) {
      query(this.props.client, {
        query: getAddressCode,
        variables: { code: data.code }
      }, val => {
        onHandleDistrict({ data, val })
      }
      )
    }
  }

  render() {
    const { open, confirmText } = this.state
    const { field, value, err } = this.props
    StatusBar.setBarStyle(open ? "dark-content" : "light-content")
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.onHandleSetText({ text: this.state.text, field })
          this.setState({ open: true })
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {confirmText || value
              ? <TBold textAlign="left" color={colors.midnight}>{value || confirmText}</TBold>
              : <TBold textAlign="left" color={colors.smoky}>กรุณาเลือกข้อมูล</TBold>
            }
            <Image source={images.iconNextPageBlack} />
          </View>
          <View style={{ height: err ? 2 : 1, backgroundColor: err ? 'rgb(213, 0, 0)' : colors.smoky, marginTop: 5 }} />
          <Text style={{ fontSize: 12, color: err ? 'rgb(213, 0, 0)' : undefined, marginTop: 4 }}>{err}</Text>
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

            <ScrollView style={{ flex: 1, backgroundColor: colors.lightgrey }} contentContainerStyle={{ paddingBottom: 30 }}>
              {
                this.state.result.map((d, key) => (
                  <TouchableOpacity key={key} onPress={() => this.onHandleOnPress(d)}>
                    <View style={{ marginVertical: 16 }}>
                      <TBold textAlign="left" ml={24} mr={24}>{d.displayName || d.nameTH}</TBold>
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