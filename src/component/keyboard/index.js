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

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.defaultKey) {
      this.setState({ number: '', dot: ['', '', '', '', '', ''] })
      nextProps.setNumber({ number: '', dot: ['', '', '', '', '', ''], defaultKey: false })
    }
  }

  ontoggledot = (d) => {
    const { setNumber } = this.props

    if (d === 'del') {
      this.setState(({ number, dot }) => {
        const numberDecrease = number.slice(0, number.length - 1)
        const split = numberDecrease.split('')
        const decrease = dot.map((d, inx) => split[inx] ? split[inx] : false)

        setNumber({ number: numberDecrease, dot: decrease, key: d })

        return { number: numberDecrease.length < 1 ? '' : numberDecrease, dot: decrease, }
      })
    } else if (this.state.number.length < 6) {
      this.setState(({ number, dot }) => {
        const numbers = number.length < 6 ? { number: number + d } : { number: number }
        const split = numbers.number.split('')
        const increase = dot.map((d, inx) => split[inx] ? split[inx] : false)

        setNumber({ number: numbers.number, dot: increase, key: d })

        return { ...numbers, dot: increase }
      })
    }

  }

  render() {
    return <Button onSet={this.ontoggledot} />
  }
}