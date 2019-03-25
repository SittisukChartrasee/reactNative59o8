import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'

const choice = (onSetLayout, onHandleOnpress, disabledChoice) => ({
  title="test",
  choice=[],
  answer=undefined,
}, key) => (
  <View key={key} style={{ marginVertical: 16 }} onLayout={(e) => onSetLayout(e.nativeEvent.layout.y, key)}>
    <TBold fontSize={16} textAlign="left">{title}</TBold>
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
      this.props.scroll && this.props.scroll.scrollTo({ y: this.state.layout[key + 1], animated: true })
    }
  }

  render() {
    const { data, disabledChoice } = this.props
    return (
      <View style={{ marginVertical: 16 }}>
        { data.map(choice(this.onSetLayout, this.onHandleOnpress, disabledChoice)) }
      </View>
    )
  }
}