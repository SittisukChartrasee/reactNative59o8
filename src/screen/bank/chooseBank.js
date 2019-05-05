import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  Image,
  View,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Screen from '../../component/screenComponent'
import { NavBar } from '../../component/gradient'
import { LongPositionButton } from '../../component/button'
import images from '../../config/images'
import Input from '../../component/input'
import modal from '../../component/modal'
import { navigateAction } from '../../redux/actions'
import colors from '../../config/colors';

const handleDisabled = arr => arr && arr.find(d => d.active) !== undefined && arr.find(d => d.active)

const mapToProps = () => ({})
const dispatchToProps = dispatch => ({
  navigateAction: bindActionCreators(navigateAction, dispatch)
})

@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    card: [
      {
        label: 'ธนาคารกรุงเทพ',
        image: images.iconBbl,
        type: 'selectCard',
      }, {
        label: 'ธนาคารกสิกรไทย',
        image: images.iconkbank,
        type: 'selectCard',
      }, {
        label: 'ธนาคารไทยพาณิชย์',
        image: images.iconscb,
        type: 'selectCard',
      }
    ],
    fields: [
      {
        label: 'สาขาบัญชีธนาคาร',
        type: 'search',
      }, {
        label: 'เลขที่บัญชี',
        type: 'textInput',
      }
    ]
  }

  handleInput = (props) => {
    if (props.type === 'selectCard') {
      this.setState({ card: this.state.card.map((d) => d.label === props.value ? { ...d, active: true } : { ...d, active: false }) })
    }
  }

  onNext = () => {
    const { navigateAction } = this.props
    navigateAction({ ...this.props, page: 'connectBank' })
  }

  render() {
    return (
      <Screen color="transparent">
        <NavBar
          title="เลือกธนาคาร"
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
          style={{ backgroundColor: colors.lightgrey }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: colors.white, paddingBottom: 24 }}>
            {
              this.state.card.map((d, key) => Input({
                field: d.field,
                label: d.label,
                type: d.type,
                init: d.init,
                image: d.image,
                active: d.active,
                handleInput: (props) => this.handleInput(props),
              }, key))
            }
          </View>

          {
            handleDisabled(this.state.card).active && (
              <View style={{ backgroundColor: colors.white, paddingBottom: 24, marginTop: 8 }}>
                {
                  this.state.fields.map((d, key) => Input({
                    field: d.field,
                    label: d.label+handleDisabled(this.state.card).label,
                    type: d.type,
                    handleInput: (props) => this.handleInput(props),
                  }, key))
                }
              </View>
            )
          }
        </ScrollView>

        <LongPositionButton onPress={this.onNext} disabled={!handleDisabled(this.state.card).active} bg={colors.lightgrey} label="ยืนยัน"/>
      </Screen>
    )
  }
}