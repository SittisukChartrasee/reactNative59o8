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
import { updateUser } from '../../redux/actions/commonAction'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    fields: [
      {
        label: 'สัญชาติ',
        type: 'radio',
        init: [{ title: 'ไทย', active: true }, { title: 'ชาวต่างชาติ' }],
        field: 'nationFlag',
      }, {
        label: 'หมายเลขบัตรประชาชน',
        type: 'textInput',
        field: 'IDCardNo',
      }, {
        label: 'ประเทศ',
        type: 'search',
        field: 'marryCountry', // ต้อง save ที่ field => nationalityCode
        inVisible: true,
      }, {
        label: 'หมายเลขหนังสือเดินทาง',
        type: 'textInput',
        field: 'marryPassport', // ต้อง save ที่ field => IDCardNo
        inVisible: true,
      }, {
        label: 'วันบัตรหมดอายุ',
        type: 'radio',
        init: [{ title: 'มีวันหมดอายุ', active: true }, { title: 'ไม่มีวันหมดอายุ' }],
        field: 'expireFlag', // ต้อง save ที่ field => isIDCardExpDate
      }, {
        label: 'วันที่หนังสือเดินทางหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'cardExpiredDate', // ต้อง save ที่ field => cardExpiredDate
        inVisible: true,
      }, {
        label: 'วันบัตรหมดอายุ (วัน/เดือน/ปี)',
        type: 'dateExpire',
        field: 'marryExpireDate', // ต้อง save ที่ field => cardExpiredDate
      }, {
        label: 'คำนำหน้า (ตัวย่อ)',    
        type: 'search',
        field: 'title',
      }, {
        label: 'ชื่อ',
        type: 'textInput',
        field: 'fistName',
      }, {
        label: 'นาม-สกุล',
        type: 'textInput',
        field: 'lastName',
      }, {
        label: 'คุณเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        type: 'radioColumn',
        init: [{ title: 'ใช่', active: true }, { title: 'ไม่ใช่' }],
        field: 'pepFlag',
      },
    ]
  }
  handleInput = (props) => {
    const { fields } = this.state
    const { updateUser, user } = this.props

    updateUser('spouse', { ...user.spouse, [props.field]: props.value } )

    if (props.field === 'nationFlag') {
      this.setState({
        fields: fields.map((d) => {
          if (props.value === 'ไทย') {
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: true }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ชาวต่างชาติ') {
            if (d.field === 'marryCountry' || d.field === 'marryPassport' || d.field === 'cardExpiredDate') return { ...d, inVisible: false }
            else if (d.field === 'IDCardNo' || d.field === 'marryExpireDate' || d.field === 'expireFlag') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    } else if (props.field === 'expireFlag') {
      this.setState({
        fields: fields.map((d) => {
          if (props.value === 'มีวันหมดอายุ') {
            if (d.field === 'marryExpireDate') return { ...d, inVisible: false }
            else return d
          } else if (props.value === 'ไม่มีวันหมดอายุ') {
            if (d.field === 'marryExpireDate') return { ...d, inVisible: true }
            else return d
          }
        })
      })
    }
  }

  render() {
    const { navigateAction, user } = this.props
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
              value: user.spouse[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'career' })}/>
      </Screen>
    )
  }
}