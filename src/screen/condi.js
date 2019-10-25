import React from 'react'
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { withApollo } from 'react-apollo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import colors from '../config/colors'
import images from '../config/images'
import { isIphoneX } from '../config/helper'
import { TLight } from '../component/texts'
import { NavBar } from '../component/gradient'
import { navigateAction } from '../redux/actions'
import { root } from '../redux/actions/commonAction'
import setMutation from '../containers/mutation'
import { containerQuery, getTermAndCondition } from '../containers/query'
import { LongButton } from '../component/button'
import lockout from '../containers/hoc/lockout'
import typeModal from '../utility/typeModal'
import { errorMessage } from '../utility/messages'
import fonts from '../config/fonts';

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch),
  updateRoot: bindActionCreators(root, dispatch),
  toggleModal: value => dispatch({ type: 'modal', value })
})
@connect(mapToProps, dispatchToProps)
@setMutation
@lockout
@withApollo
export default class extends React.Component {
  state = {
    agree: false,
    text: ''
  }

  componentDidMount = async () => {
    this.props.updateRoot('loading', true)

    try {
      const res = await this.props.client.query({ query: getTermAndCondition })

      this.props.updateRoot('loading', false)

      const text = get(res, 'data.getTermAndCondition', '')

      this.setState({ text })

    } catch (error) {
      this.props.updateRoot('loading', false)

      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  onNext = async () => {
    try {
      const res = await this.props.acceptTerm()

      const success = get(res, 'data.acceptTerm.success', false)

      if (success) {
        this.props.navigateAction({ ...this.props, page: 'tutorialBackCamera' })
      }

    } catch (error) {
      this.props.toggleModal({
        ...typeModal[errorMessage.requestError.code],
        dis: errorMessage.requestError.defaultMessage,
      })
    }
  }

  render() {
    const { agree } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white', marginBottom: isIphoneX() ? '7%' : 16 }}>
        <NavBar
          title="เงื่อนไขการเปิดบัญชี"
          navRight={
            <TouchableOpacity onPress={() => this.props.lockout()}>
              <Image source={images.iconlogoOff} />
            </TouchableOpacity>
          }
        />
        <ScrollView contentContainerStyle={{ marginHorizontal: 16, paddingTop: '5%' }} showsVerticalScrollIndicator={false}>
          <TLight color={colors.grey} fontSize={16} textAlign="left">
            {this.state.text}
          </TLight>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ agree: !agree })}
            style={{
              backgroundColor: colors.lightgrey,
              padding: 16,
              flexDirection: 'row',
              marginHorizontal: 24,
              marginTop: 16,
              borderRadius: 12,
            }}
          >
            <View style={{ marginRight: 16, marginTop: 5 }}>
              {
                agree
                  ? <Image
                    source={images.iconCheck}
                    style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red' }}
                  />
                  : <View style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.grey }} />
              }
            </View>
            <View style={{ flex: 1 }}>
              <TLight color={colors.midnight} fontSize={16} textAlign="left">ฉันได้อ่านและทำความเข้าใจในข้อความทั้งหมดโดยที่ฉันได้ยอมรับและเห็นด้วย  </TLight>
            </View>
          </TouchableOpacity>
          <LongButton
            label="ยืนยัน"
            onPress={this.onNext}
            style={{ marginHorizontal: 24 }}
            disabled={!agree}
          />
        </View>
      </View>
    )
  }
}
