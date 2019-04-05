import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { NextButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    fields: [
      {
        label: 'สัญชาติ',
        type: 'radio',
        init: [{ title: 'ไทย', active: true }, { title: 'ชาวต่างชาติ' }],
        field: 'marryNation',
      }, {
        label: 'ประเทศ',
        type: 'search',
        field: 'marryCountry',
        inVisible: true,
      }, {
        label: 'หมายเลขบัตรประชาชน',
        type: 'textInput',
        field: 'marryIdCard',
      }, {
        label: 'หมายเลขหนังสือเดินทาง',
        type: 'textInput',
        field: 'marryPassport',
        inVisible: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'marryExpireFlag',
      }, {
        label: 'วันบัตรหมดอายุ (ปี/เดือน/วัน)',
        type: 'dateExpire',
        field: 'marryExpireDate',
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',    
        type: 'dropdown',
        init: [{ value: 'นาย' }, { value: 'นางสาว' }],
        field: 'marryTitle',
      }, {
        label: 'ชื่อ',
        type: 'textInput',
        field: 'marryName',
      }, {
        label: 'นาม-สกุล',
        type: 'textInput',
        field: 'marryLastName',
      }, {
        label: 'คุณเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        type: 'radioColumn',
        init: [{ title: 'ใช่', active: true }, { title: 'ไม่ใช่' }],
        field: 'marryFlagPep',
      },
    ]
  }
  handleInput = (props) => {
    const { fields } = this.state
    if (props.field === 'marryNation') {
      let a = []
      if (props.value === 'ไทย') {
        a = fields.map((d) => {
          if (d.field === 'marryCountry' || d.field === 'marryPassport') return { ...d, inVisible: true }
          else if (d.field === 'marryIdCard') return { ...d, inVisible: false }
          else return d
        })
      } else if (props.value === 'ชาวต่างชาติ') {
        a = fields.map((d) => {
          if (d.field === 'marryCountry' || d.field === 'marryPassport') return { ...d, inVisible: false }
          else if (d.field === 'marryIdCard') return { ...d, inVisible: true }
          else return d
        })        
      }
      this.setState({ fields: a })
    }

    // console.log(props)

  }

  render() {
    const { navigateAction } = this.props
    const { fields } = this.state
    return (
      <Screen color="transparent">
        <NavBar
          title="ข้อมูลคู่สมรส"
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
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {
            fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              init: d.init,
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}