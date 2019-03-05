import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import colors from '../../config/colors'
import { TText, TMed, TLight } from '../texts'

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
            : { borderColor: colors.brownGrey, borderWidth: 1 }
          )(condition)
    }}
  />
)

export default class extends React.Component {
  static defaultProps = {
    data: ['อาคาร', 'หมู่บ้าน']
  }

  render() {
    const { data } = this.props
    return (
      <View>
        <TLight mb="8" textAlign="left" fontSize="14" color={colors.brownGrey}>สถานที่ทำงาน</TLight>
        <View style={{ flexDirection: 'row' }}>
          {
            data.map((d, key) => (
              <TouchableOpacity
                key={key}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
              >
                <ActiveCycle condition />
                <TLight ml="24" textAlign="left" fontSize="16" color={colors.greyishBrown}>{d}</TLight>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}