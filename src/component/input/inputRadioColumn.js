import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TText, TMed, TLight, TBold } from '../texts'

const ActiveCycle = ({
  condition
}) => (
  <View 
    style={{
      width: 16,
      height: 16,
      borderRadius: 8,
      ...((act) => act
        ? { backgroundColor: colors.emerald }
        : { borderColor: colors.smoky, borderWidth: 1, opacity: .6 }
      )(condition)
    }}
  />
)

export default class extends React.Component {
  static defaultProps = {
    init: [
      {
        title: 'item1',
        active: true,
      }, {
        title: 'item2',
        active: false,
      }
    ],
    label: 'labelRadio',
    field: 'fieldName',
    handleInput: () => {},
  }

  state = { data: this.props.init }

  handleRadio = (key) => {
    const { data } = this.state
    const { handleInput, field } = this.props
    const maping = data.map((dd, inx) => inx === key
      ? { ...dd, active: true, output: handleInput({ value: dd.title, type: 'radio', field }) }
      : { ...dd, active: false })
    this.setState({ data: maping })
  }

  render() {
    const { data } = this.state
    const { label } = this.props
    return (
      <View>
        <View style={{ backgroundColor: colors.lightgrey, paddingHorizontal: 24, paddingVertical: 16 }}>
          <TBold textAlign="left">{label}</TBold>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          {
            data.map((d, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => this.handleRadio(key)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: 57,
                  borderBottomColor: colors.smoky,
                  borderBottomWidth: 1,
                }}
              >
                { d.active ? <View style={{ backgroundColor: colors.emerald, width: 16, height: 16, borderRadius: 16 / 2 }} /> : <ActiveCycle /> }
                <TLight ml="16" textAlign="left" fontSize="16" color={colors.midnight}>{d.title}</TLight>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}