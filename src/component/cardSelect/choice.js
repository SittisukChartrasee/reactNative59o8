import React from 'react'
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TBold, TLight, TMed, TSemiBold, TText, TThin } from '../texts'
import images from '../../config/images'

const choice = (onSetLayout, onHandleOnpress, disabledChoice, onScroll, layout) => ({
  title="test",
  type="choice-type",
  choice=[],
  answer=undefined,
}, key) => (
  <View key={key} onLayout={(e) => onSetLayout(e.nativeEvent.layout.y, key)}>
    <View style={{ backgroundColor: colors.lightgrey, paddingHorizontal: 24, paddingVertical: 16 }}>
      <TBold fontSize={16} textAlign="left">{title}</TBold>
    </View>
    { 
      type === 'checkbox'
        ? choice.map(checkBox(onHandleOnpress, key, answer, disabledChoice))
        : choice.map(point(onHandleOnpress, key, answer, disabledChoice, onScroll, layout))
    }
  </View>
)

const point = (onHandleOnpress, inx, answer, disabledChoice, onScroll, layout) => (title, key) => (
  <TouchableOpacity
    key={key}
    onPress={() => {
      onHandleOnpress({ title, key: inx, choice: key })
      if (layout[inx + 1] !== undefined) {
        onScroll && onScroll.scrollTo({ y: layout[inx + 1], animated: true })
      }
    }}
    disabled={disabledChoice > -1 ? !!(inx === disabledChoice) : false}
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      minHeight: 57,
      borderBottomColor: colors.smoky,
      borderBottomWidth: 1,
      paddingHorizontal: 24,
      flexWrap: 'wrap'
    }}
  >
    {
      answer === key
        ? <View style={{ backgroundColor: colors.emerald, width: 16, height: 16, borderRadius: 8, marginRight: 24 }} />
        : <View style={{ borderColor: colors.grey, borderWidth: 1, width: 16, height: 16, borderRadius: 8, marginRight: 24 }} />
    }
    <View style={{ flex: 1, marginVertical: 15 }}>
      <TLight fontSize={16} textAlign="left">{title}</TLight>
    </View>
  </TouchableOpacity>
)

const checkBox = (onHandleOnpress, inx, answer, disabledChoice) => (title, key) => (
  <TouchableOpacity
    key={key}
    onPress={() => {
      onHandleOnpress({ title: title.label, key: inx, choice: key, type: 'checkbox' })
    }}
    disabled={disabledChoice > -1 ? !!(inx === disabledChoice) : false}
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      minHeight: 57,
      borderBottomColor: colors.smoky,
      borderBottomWidth: 1,
      paddingHorizontal: 24,
      flexWrap: 'wrap'
    }}
  >
    {
      title.select
        ? <Image source={images.iconCheck} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'red', marginRight: 24 }} />
        : <Image source={{}} style={{ width: 16, height: 16, borderRadius: 5, borderWidth: 1, borderColor: colors.grey, marginRight: 24 }} />
    }
    <View style={{ flex: 1, marginVertical: 15 }}>
      <TLight fontSize={16} textAlign="left">{title.label}</TLight>
    </View>
  </TouchableOpacity>
)

const findMaxItem = data => {
  const result = data.map((d, i) => d.select && d.select && i).filter(d => d !== false)
  return Math.max(...result)
}

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

  onHandleOnpress = ({ title, key, choice, type }) => {
    const { init } = this.props
    if (type === 'checkbox') {
      const result = init.map((initData, initIndex) => 
        (initIndex === key)
          ? {
              ...initData,
                choice: [
                  ...initData.choice.map((d, i) => {
                    if (i === choice && !d.select) {
                      return { ...d, select: true }
                    } else if (i === choice && d.select) {
                      return { ...d, select: false }
                    } else return d
                  })
                ],
                answer: findMaxItem(
                  initData.choice.map((d, i) => {
                    if (i === choice && !d.select) {
                      return { ...d, select: true }
                    } else if (i === choice && d.select) {
                      return { ...d, select: false }
                    } else return d
                  })
                ),
            }
          : initData
        )
      this.props.onPress({ title, key, choice: result })
    } else {
      const result = init.map((curr, i) => (i === key ? { ...curr, answer: choice } : curr))
      this.props.onPress({ title, key, choice: result })
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
        { init.map(choice(this.onSetLayout, this.onHandleOnpress, disabledChoice, this.scroll, this.state.layout)) }
      </ScrollView>
    )
  }
}