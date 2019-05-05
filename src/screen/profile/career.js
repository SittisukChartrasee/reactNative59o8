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
import setMutation from '../../containers/mutation'
import { updateUser } from '../../redux/actions/commonAction'

const mapToProps = ({ user }) => ({ user })
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateUser: bindActionCreators(updateUser, dispatch)
})

@connect(mapToProps, dispatchToProps)
@setMutation
export default class extends React.Component {
  state = {
    modal: false,
    fields: [
      {
        label: 'ประเภทธุรกิจ',
        type: 'search',
        field: 'busType', // isicCode
      }, {
        label: 'อาชีพ',
        type: 'search',
        field: 'occupation', // occupationCode
      }, {
        label: 'รายได้ต่อเดือน (บาท)',
        type: 'dropdown',
        init: [
          { value: 'ไม่เกิน 10,000 บาท' },
          { value: '10,001 - 20,000 บาท' },
          { value: '20,001 - 30,000 บาท' },
          { value: '30,001 - 50,000 บาท' },
          { value: '50,001 - 100,000 บาท' },
          { value: '100,001 - 200,000 บาท' },
          { value: 'มากกว่า 200,000 บาท' },
          { value: 'ไม่มีรายได้' }
        ],
        field: 'incomeRange', //incomeRangeCode
      }, {
        label: 'ประเทศของแหล่งที่มารายได้',
        type: 'search',
        field: 'countrySourceOfIncome',
      }
    ]
  }

  handleInput = (props) => {
    const { updateUser, user } = this.props
    console.log(props)
    if (props.type === 'modal') this.setState({ modal: true })
    else if (props.field === 'busType') {
      updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code }) 
    } else if (props.field === 'busType') {
      updateUser('career', { ...user.career, [props.field]: props.value, isicCode: props.code }) 
    } else if (props.field === 'occupation') {
      updateUser('career', { ...user.career, [props.field]: props.value, occupationCode: props.code })
    } else if (props.field === 'incomeRange') {
      updateUser('career', { ...user.career, [props.field]: props.value })
    } if (props.field === 'countrySourceOfIncome') {
      updateUser('career', { ...user.career, [props.field]: props.value, countyCode: props.code, countryRisk: props.risk })
    }
  }

  onNext = async () => {
    const { navigateAction, user } = this.props
    const {
      isicCode,
      occupationCode,
      incomeRange,
      incomeRangeCode,
      countrySourceOfIncome,
    } = user.career


    const data = {
      isicCode,
      occupationCode,
      incomeRangeCode: incomeRange,
      countrySourceOfIncome
    }

    this.props.saveCareer({ variables: { input: data } })
      .then(res => {
        if (user.career.countryRisk) {
          return this.setState({ modal: true })
        } else if (res.data.saveCareer.success) {
          navigateAction({ ...this.props, page: 'sourceOfFund' })
        }
      })
      .catch(err => {
        console.log(err)
      })
    
  }

  render() {
    const { navigateAction, user } = this.props
    return (
      <Screen color="transparent">
        <NavBar
          title="การทำงาน"
          navLeft={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
              value: user.career[d.field],
              inVisible: d.inVisible,
              handleInput: (props) => this.handleInput(props),
            }, key))
          }
        </ScrollView>

        {
          modal({
            visible: this.state.modal,
            dis: `ประเทศของท่าน\nมีความเสี่ยงไม่สามารถสมัครต่อได้`,
            onPress: () => this.setState({ modal: false })
          })
        }

        <NextButton onPress={this.onNext}/>
      </Screen>
    )
  }
}