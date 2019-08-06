import React from 'react'
import {
  View,
  Modal,
  ActivityIndicator,
} from 'react-native'
import { TText } from '../texts'
import colors from '../../config/colors';

export default class extends React.Component {
  static defaultProps = {
    loading: false,
  }

  render() {
    const { loading } = this.props
    return (
      <Modal
        visible={loading}
        transparent
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000096',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={{ backgroundColor: colors.white, paddingHorizontal: 60, paddingVertical: 40, borderRadius: 10 }}>
            <ActivityIndicator size="large" color={colors.emerald} />
            <TText mt={20}>กำลังโหลด...</TText>
          </View>
        </View>
      </Modal>
    )
  }
}