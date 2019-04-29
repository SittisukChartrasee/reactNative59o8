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
import { NavBar } from '../../component/gradient'
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
import { Select } from '../../component/cardSelect'

export default class extends React.Component {
  state = {
    open: false,
    fields: [
      {
        label: 'เงินเดือน',
        type: 'select',
      }, {
        label: 'มรดก',
        type: 'select',
      }, {
        label: 'การขายหลักทรัพย์',
        type: 'select',
      }, {
        label: 'ผลตอบแทนจากการลงทุน',
        type: 'select',
      }, {
        label: 'การดำเนินการทางธุรกิจ',
        type: 'select',
      }, {
        label: 'ค่านายหน้า',
        type: 'select',
      }, {
        label: 'ค่าตอบแทนการให้บริการ',
        type: 'select',
      }, {
        label: 'อื่นๆ',
        type: 'select',
        field: 'investmentSourceOther',
      }
    ],
    data: '',
    otherField: '',
  }

  handleOnpress = (val) => {
    const { fields } = this.state
    const result = fields.map((d) => {
      if (d.label === val.label && !val.active) {
        return { ...d, active: true }
      } else if (d.label === val.label && val.active) {
        if (d.label === 'อื่นๆ') this.setState({ otherField: '' })
        return { ...d, active: false }
      } else {
        return { ...d }
      }
    })
    const data = result.map((d) => d.active && d.label).filter(d => d !== undefined && d !== false)
    this.setState({ fields: result, data: data.toString() })
  }

  render() {
    const { open, data, otherField } = this.state
    const { onChangeText, field } = this.props

    onChangeText({ field, otherField, data, type: 'MODAL' })
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ open: true })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}>
          { data 
              ? <TBold textAlign="left" color={colors.midnight}>{data}</TBold>
              : <TBold textAlign="left" color={colors.smoky}>กรุณาเลือกข้อมูล</TBold>
          }
            <Image source={images.iconNextPageBlack} />
          </View>
          <View style={{ height: 1, backgroundColor: colors.smoky, marginTop: 5 }} />
        </TouchableOpacity>

        <Modal visible={open} animationType="slide">
          <View style={{ flex: 1 }}>
            <NavBar
              title="ได้รับเงินทุนจากแหล่งใด"
              navLeft={
                <TouchableOpacity onPress={() => this.setState({ open: false })}>
                  <Image source={images.iconback} />
                </TouchableOpacity>
              }
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
              <ScrollView
                style={{ backgroundColor: colors.lightgrey }}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                  { 
                    this.state.fields.map(
                      (d, k) => Select({
                        ...d,
                        onPress: this.handleOnpress,
                        onChangeText: (v) => this.setState({ otherField: v.value }),
                        value: this.state.otherField
                      }, k)
                    )
                  }
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    )
  }
}