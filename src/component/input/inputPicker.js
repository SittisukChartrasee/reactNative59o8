import Picker from 'react-native-picker'
import moment from 'moment'
import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
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

const genDate = (y=2539, m=2) => {
  const year = []
  const month = []
  const day = []
  const mL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
  for (let i = +moment().format('YYYY') + 443;i <= +moment().format('YYYY') + 543; i += 1) year.push(i)
  for (let i = 0;i <= 11; i += 1) month.push(mL[i])
  for (let i = 1;i <= new Date(y - 543, mL.indexOf(m) + 1, 0).getDate(); i += 1) day.push(i)

  return {
    year,
    month,
    day,
  }
}


export default class extends React.Component {
  state = {
    day: '-',
    month: '-',
    year: (+moment().format('YYYY') + 543) - 30,
  }

  onPicker = (text) => {
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
        pickerData: [...genDate().year],
        selectedValue: [this.state.year],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ year: data[0], month: '-', day: '-' })
        }
      });
    } else if (text.indexOf('เดือน') > -1) {
      Picker.init({
        pickerData: ['-', ...genDate().month],
        selectedValue: [this.state.month],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ month: data[0], day: '-' })
        }
      });
    } else if (text.indexOf('วัน') > -1) {
      const { year, month } = this.state
      Picker.init({
        pickerData: ['-', ...genDate(year, month).day],
        selectedValue: [this.state.day],
        ...configPicker,
        onPickerConfirm: data => {
          this.setState({ day: data[0] })     
        }
      });
    }

    Picker.show()
  }

  render() {
    const { year, month, day } = this.state
    const { handleInput, field, type } = this.props
    const labelArr = this.props.label.split(',')
    handleInput({ value: `${day}/${month}/${year}`, type, field })

    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {
          labelArr.map((d, i) => (
            <View key={i} style={{ flex: 1, marginLeft: i > 0 ? 16 : 0 }}>
              <TLight fontSize='14' mb='10' mt='10' textAlign='left' color={colors.grey}>{d}</TLight>
              <TouchableOpacity onPress={() => this.onPicker(d)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TBold textAlign='left' color={colors.midnight}>{checkField(d, this.state)}</TBold>
                  <Image source={images.iconNextPageBlack} style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
                <View style={{ height: 1, backgroundColor: colors.smoky, marginTop: 5 }} />
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
    )
  }
}