import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { TText, TBold, TSemiBold, TLight } from '../../component/texts'
import colors from '../../config/colors'
import { LongButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'

const fields = [
  {
    label: 'เลขบัตรประชาชน',
    field: 'idcard',
  }, {
    label: 'หมายเลขบัตรประชาชน ( ดย. JT9-9999999-99 )',
    // type: 'Icustom',
    type: 'Icustom',
    field: 'jcnumber',
  }, {
    label: 'วันบัตรหมดอายุ',
    type: 'radio',
    field: 'birthday',
  }, {
    label: 'เพศ',
    type: 'dropdown',
    field: 'sex',
  }, {
    label: 'คำนำหน้า (ตัวย่อ)',
    field: 'title',
  }, {
    label: 'ชื่อ (ภาษาไทย)',
    field: 'nameTh',
  }, {
    label: 'นามสกุล (ภาษาไทย)',
    field: 'lastTh'
  }, {
    label: 'ชื่อ (ภาษาอังกฤษ)',
    field: 'nameEn',
  }, {
    label: 'นามสกุล (ภาษาอังกฤษ)',
    field: 'lastEn',
  }, {
    label: 'สถานภาพสมรส',
    field: 'maritalstatus',
  }, {
    label: 'สัญชาติ',
    field: 'nationality',
  }
]

export default class extends React.Component {
  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลส่วนตัว"
          navLeft={
            <TouchableOpacity onPress={() => {}}>
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
          navRight={
            <TouchableOpacity>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={{ marginHorizontal: 24, marginBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {
            fields.map((d, key) => Input({
              label: d.label,
              type: d.type,
            }, key))
          }
        </ScrollView>
      </Screen>
    )
  }
}