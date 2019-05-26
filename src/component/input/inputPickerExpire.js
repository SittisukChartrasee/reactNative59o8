import Picker from 'react-native-picker'
import moment from 'moment'
import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { TBold, TLight } from '../texts';
import images from '../../config/images'
import colors from '../../config/colors'
import fonts from '../../config/fonts'
const m = ['', 'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']

const createDateData = (start=new Date().getFullYear() + 643, end=new Date().getFullYear() + 543) => {
  const date = []
  for (let i = end; i <= start; i += 1) {
    const month = []
    if (i === end) {
      for (let j = 1; j < 13; j += 1) {
        const day = []
        if (j === 2) {
          for (let k = 1; k < 29; k += 1) {
            day.push(`${k}`)
          }
          // Leap day for years that are divisible by 4, such as 2000, 2004
          if (i % 4 === 0) {
            day.push(`${29}`)
          }
        } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
          for (let k = 1; k < 32; k += 1) {
            day.push(`${k}`)
          }
        } else {
          for (let k = 1; k < 31; k += 1) {
            day.push(`${k}`)
          }
        }
        const onmonth = {}
        onmonth[`${m[j]}`] = day
        month.push(onmonth)
      }
    } else {
      for (let j = 1; j < 13; j += 1) {
        const day = []
        if (j === 2) {
          for (let k = 1; k < 29; k += 1) {
            day.push(`${k}`)
          }
          // Leap day for years that are divisible by 4, such as 2000, 2004
          if (i % 4 === 0) {
            day.push(`${29}`)
          }
        } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
          for (let k = 1; k < 32; k += 1) {
            day.push(`${k}`)
          }
        } else {
          for (let k = 1; k < 31; k += 1) {
            day.push(`${k}`)
          }
        }
        const onmonth = {}
        onmonth[`${m[j]}`] = day
        month.push(onmonth)
      }
    }
    const d = {}
    d[`${i}`] = month
    date.push(d)
  }
  return date
}

const renderFormatText = (date) => {
  return `${date[2]} ${date[1]} ${date[0]}`
}


export default class extends React.Component {
  static defaultProps = {
    err: '',
    date: [2562,'มกราคม',1]
  }
  state = {
    date: this.props.date
  }

  onPicker = () => {
    const { handleInput, field, type } = this.props
    const configPicker = {
      pickerTitleText: 'กรุณาเลือก',
      pickerCancelBtnText: 'ยกเลิก',
      pickerConfirmBtnText: 'ตกลง',
      pickerConfirmBtnColor: [0, 170, 73, 1],
      pickerCancelBtnColor: [0, 170, 73, 1],
      pickerFontFamily: fonts.sukhumvitBold,
    }

    Picker.init({
      pickerData: createDateData(),
      selectedValue: this.state.date,
      ...configPicker,
      onPickerConfirm: date => {
        this.setState({ date })
        handleInput({ value: `${date[2]}-${date[1]}-${date[0]}`, type, field })
      }
    });
    Picker.show()
  }
  render() {
    const { err } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => this.onPicker()}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TBold textAlign="left" color={colors.midnight}>{renderFormatText(this.state.date)}</TBold>
            <Image source={images.iconCalenda} style={{ ...(err => err && ({ tintColor: 'rgb(213, 0, 0)' }))(err) }}/>
          </View>
          <View style={{ height: err ? 2 : 1, backgroundColor: err ? 'rgb(213, 0, 0)' : colors.smoky, marginTop: 5 }} />
          <Text style={{ fontSize: 12, color: err ? 'rgb(213, 0, 0)' : undefined, marginTop: 4 }}>{err}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}