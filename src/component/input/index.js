import React from 'react'
import { View } from 'react-native'
import Imaterial from './inputDefaultMatiral'
import Imask from './inputDefaultMask'
import Idown from './inputDefaultDropdown'

export default class extends React.Component {
  render() {
    return (
      <Idown />
      // <Imask />
      // <Imaterial />
    )
  }
}