import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'


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

  render() {
    const { data, onPress, disabledChoice } = this.props
    return (
      <View style={{ marginVertical: 16 }}>
        { data.map(choice(this.onSetLayout, onPress, disabledChoice)) }
      </View>
    )
  }
}

const choice = (onSetLayout, onPress, disabledChoice) => ({
  title="test",
  choice=[],
  answer=0,
}, key) => (
  <View key={key} style={{ marginVertical: 16 }} onLayout={(e) => onSetLayout(e.nativeEvent.layout.y, key)}>
    <TBold fontSize={16} textAlign="left">{title}</TBold>
    { choice.map(point(onPress, key, answer, disabledChoice)) }
  </View>
)

const point = (onPress, inx, answer, disabledChoice) => (title, key) => (
  <TouchableOpacity
    key={key}
    onPress={() => onPress({ title, key: inx, choice: key })}
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