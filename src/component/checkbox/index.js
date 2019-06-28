import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import images from '../../config/images';
import colors from '../../config/colors';

export default class extends React.Component {
  static defaultProps = {
    value: false,
    onChange: () => alert('neet function onChange!')
  }
  state = {
    value: this.props.value,
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ value: !this.state.value }, () => {
            this.props.onChange(this.state.value)
          })
          
        }}
        style={{ padding: 16 }}
        activeOpacity={1}
      >
        {
          this.state.value
            ? <Image source={images.iconCheck} style={{ width: 16, height: 16, borderRadius: 5, backgroundColor: 'black' }} />
            : <View style={{ width: 16, height: 16, borderRadius: 5, borderWidth: 1, borderColor: colors.smoky }} />
        }
      </TouchableOpacity>
    )
  }
}