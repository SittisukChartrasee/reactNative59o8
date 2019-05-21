import React from 'react'
import {
  View,
  Image,
} from 'react-native'
import Button from './button'


export default class extends React.Component {
  state = {
    dot: ['', '', '', '', '', ''],
    number: '',
  }

  ontoggledot = (d) => {
    const { setNumber, defaultKey } = this.props
    if (d === 'del') {
      this.setState(({ number, dot }) => {
        const numberDecrease = number.slice(0, number.length - 1)
        const split = numberDecrease.split('')
        const decrease = dot.map((d, inx) => split[inx] ? split[inx] : false)

        setNumber({ number: numberDecrease, dot: decrease, key: d })
        return {
          number: numberDecrease < 1 ? '' : numberDecrease,
          dot: decrease,
        }
      })
    } else if (defaultKey) {
      this.setState({ number: d, dot: [d, '', '', '', '', ''] })
      setNumber({ number: d, dot: [d, '', '', '', '', ''], defaultKey: false })
    } else {
      this.setState(({ number, dot }) => {
        const numbers = number.length < 6 ? { number: number + d } : { number: number }
        const split = numbers.number.split('')
        const increase = dot.map((d, inx) => split[inx] ? split[inx] : false)

        setNumber({ number: numbers.number, dot: increase, key: d })
        return {
          ...numbers,
          dot: increase,
        }
      })
    }
  }

  render() {
    const { dot, number } = this.state
    return <Button onSet={this.ontoggledot} />
  }
}