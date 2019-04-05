import React from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'

const choice = (onSetLayout, onHandleOnpress, disabledChoice) => ({
  title="test",
  choice=[],
  answer=undefined,
}, key) => (
  <View key={key} onLayout={(e) => onSetLayout(e.nativeEvent.layout.y, key)}>
    <View style={{ backgroundColor: colors.lightgrey, paddingHorizontal: 24, paddingVertical: 16 }}>
      <TBold fontSize={16} textAlign="left">{title}</TBold>
    </View>
    { choice.map(point(onHandleOnpress, key, answer, disabledChoice)) }
  </View>
)

const point = (onHandleOnpress, inx, answer, disabledChoice) => (title, key) => (
  <TouchableOpacity
    key={key}
    onPress={() => onHandleOnpress({ title, key: inx, choice: key })}
    disabled={disabledChoice > -1 ? !!(inx === disabledChoice) : false}
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 57,
      borderBottomColor: colors.smoky,
      borderBottomWidth: 1,
      paddingHorizontal: 24,
    }}
  >
    {
      answer === key
        ? <View style={{ backgroundColor: colors.emerald, width: 16, height: 16, borderRadius: 8, marginRight: 24 }} />
        : <View style={{ borderColor: colors.grey, borderWidth: 1, width: 16, height: 16, borderRadius: 8, marginRight: 24 }} />
    }
    <TLight fontSize={16}>{title}</TLight>
  </TouchableOpacity>
)

export default class extends React.Component {
  static defaultProps = {
    init: [
      {
        title: 'ท่านเป็นพลเมืองอเมริกัน ใช่หรือไม่',
        choice: ['ใช่', 'ไม่'],
      }
    ],
    disabledChoice: undefined,
    paddingBottom: 0,
    onPress: () => {},
  }
  state = {
    layout: [],
  }

  onSetLayout = (layoutY, index) => {
    const { layout } = this.state
    const newArray = layout
    newArray[index] = layoutY
    this.setState({ layout: [...newArray] })
  }

  onHandleOnpress = ({ title, key, choice }) => {
    this.props.onPress({ title, key, choice })
    if (this.state.layout[key + 1] !== undefined) {
      this.scroll && this.scroll.scrollTo({ y: this.state.layout[key + 1], animated: true })
    }
  }

  render() {
    const { init, disabledChoice, paddingBottom } = this.props
    return (
      <ScrollView
        ref={(ref) => { this.scroll = ref }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: paddingBottom }}
      >
        { init.map(choice(this.onSetLayout, this.onHandleOnpress, disabledChoice)) }
      </ScrollView>
    )
  }
}