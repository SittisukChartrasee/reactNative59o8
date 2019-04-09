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
    modal: false,
    fields: [
      {
        label: 'ประเภทธุรกิจ',
        type: 'search',
        field: 'idcard',
      }, {
        label: 'อาชีพ',
        type: 'search',
        field: 'jcnumber',
      }, {
        label: 'รายได้ต่อเดือน (บาท)',
        type: 'search',
        field: 'expireDateFlag',
      }, {
        label: 'ประเทศของแหล่งที่มารายได้',
        type: 'search',
        field: 'expireDate',
      }
    ]
  }

  handleInput = (props) => {
    if (props.type === 'modal') this.setState({ modal: true })
  }

  render() {
    const { navigateAction } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="การทำงาน"
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
            this.state.fields.map((d, key) => Input({
              field: d.field,
              label: d.label,
              type: d.type,
              init: d.init,
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        {
          modal({
            visible: this.state.modal,
            image: images.iconBackIdcard,
            dis: `ด้านหลังบัตรประชาชน ประกอบด้วยอักษรภาษาอังกฤษ 2 ตัว และตัวเลข 10 ตัว \nตัวอย่างการกรอก : JC1234567890`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={() => navigateAction({ ...this.props, page: 'passcode' })}/>
      </Screen>
    )
  }
}