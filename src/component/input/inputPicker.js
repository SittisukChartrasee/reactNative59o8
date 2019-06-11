import Picker from 'react-native-picker'
import moment from 'moment'
import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import { TBold, TLight } from '../texts';
import images from '../../config/images'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

const checkField = (data, value) => {
  if (data.indexOf('ปี') > -1) return value.year
  if (data.indexOf('เดือน') > -1) return value.month
  if (data.indexOf('วัน') > -1) return value.day
}

const genDate = ({ y = 2539, m = 2, a = 0 }) => {
  const year = []
  const month = []
  const day = []
  const mL = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
  for (let i = +moment().format('YYYY') + 443; i <= +moment().format('YYYY') + 543 - a; i += 1) year.push(i)
  for (let i = 0; i <= 11; i += 1) month.push(mL[i])
  for (let i = 1; i <= new Date(y - 543, mL.indexOf(m) + 1, 0).getDate(); i += 1) day.push(i)

  return {
    year,
    month,
    day,
  }
}


export default class extends React.Component {
  static defaultProps = {
    value: '-/-/2532',
    date: 0
  }

  state = {
    day: '-',
    month: '-',
    year: (+moment().format('YYYY') + 543) - 30,
    err: '',
  }

  componentDidMount = () => {
    const { value } = this.props
    const splitText = value.split('/')
    this.setState({
      day: splitText[0],
      month: splitText[1],
      year: splitText[2],
    })
  }

  onPicker = (text) => {
    const { handleInput, field, type, date } = this.props
    const { year, month, day } = this.state
    const configPicker = {
      pickerTitleText: 'กรุณาเลือก',
      pickerCancelBtnText: 'ยกเลิก',
      pickerConfirmBtnText: 'ตกลง',
      pickerConfirmBtnColor: [0, 170, 73, 1],
      pickerCancelBtnColor: [0, 170, 73, 1],
      pickerFontFamily: fonts.sukhumvitBold,
    }
    if (text.indexOf('ปี') > -1) {
      Picker.init({
        pickerData: [...genDate({ a: date }).year],
        selectedValue: [this.state.year],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ year: data[0], month: '-', day: '-' })
          handleInput({ value: `-/-/${data[0]}`, type, field })
        }
      });
    } else if (text.indexOf('เดือน') > -1) {
      Picker.init({
        pickerData: ['-', ...genDate({ a: date }).month],
        selectedValue: [this.state.month],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ month: data[0], day: '-' })
          handleInput({ value: `${day}/${data[0]}/${year}`, type, field })
        }
      });
    } else if (text.indexOf('วัน') > -1) {
      const { year, month } = this.state
      Picker.init({
        pickerData: ['-', ...genDate({ y: year, m: month, a: date }).day],
        selectedValue: [this.state.day],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ day: data[0] })
          handleInput({ value: `${data[0]}/${month}/${year}`, type, field })
        }
      });
    }

    Picker.show()
  }

  render() {
    const labelArr = this.props.label.split(',')
    const { err } = this.props
    return (
      <View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {
            labelArr.map((d, i) => (
              <View key={i} style={{ flex: 1, marginLeft: i > 0 ? 16 : 0 }}>
                <TLight fontSize='14' mb='10' mt='10' textAlign='left' color={err ? 'rgb(213, 0, 0)' : colors.grey}>{d}</TLight>
                <TouchableOpacity onPress={() => this.onPicker(d)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TBold textAlign='left' color={colors.midnight}>{checkField(d, this.state)}</TBold>
                    <Image source={images.iconNextPageBlack} style={{ transform: [{ rotate: '90deg' }], ...(err => err && ({ tintColor: 'rgb(213, 0, 0)' }))(err) }} />
                  </View>
                  <View style={{ height: err ? 2 : 1, backgroundColor: err ? 'rgb(213, 0, 0)' : colors.smoky, marginTop: 5 }} />
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
        <Text style={{ fontSize: 12, color: err ? 'rgb(213, 0, 0)' : undefined, marginTop: 4 }}>{err}</Text>
      </View>
    )
  }
}