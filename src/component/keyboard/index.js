import React from 'react'
import { 
  View,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TText, TSemiBold, TLight } from '../texts'
import colors from '../../config/colors'
import Button from './button'
import images from '../../config/images'

const NumberWrapper = styled.View`
  flex: 1;
`

const Groupflex = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  borderBottomRightRadius: 8;
  borderBottomLeftRadius: 8;
`
const Header = styled.View`
	flex: 1;
	justifyContent: space-between;
`

const ContainerKeyboard = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${colors.white};
  paddingVertical: 20;
`

const mapToProps = ({ root }) => ({ root })
@connect(mapToProps)
export default class extends React.Component {
  state = {
    Dot: [],
    DotNone: ['', '', '', '', '', ''],
    value: '',
  }

  ontoggledot = (d) => {
    // const { Dot, DotNone, value } = this.state
    // const { maxLength } = this.props
    // if (status === 'set') {
    //   if (Dot.length + 1 <= maxLength) {
    //     this.setState({
    //       Dot: [...Dot, id],
    //       value: value + id,
    //     })
    //     DotNone.pop()
    //     this.props.onSet(value + id, value.length + 1)('set')
    //   }
    // } 
    // else if (DotNone.length <= maxLength) {
    //   if (value.length > 0) {
    //     this.setState({ DotNone: [...DotNone, ''] })
    //     Dot.pop()

    //     this.setState({ value: value.substr(0, (Dot.length + 1) - 1) },
    //       () => this.props.onSet(this.state.value === ''
    //         ? 0
    //         : this.state.value,
    //       value.length - 1)('none'))
    //   }
    // }
  }

  render() {
    console.log(this.props)
    return (
      <NumberWrapper>
        <Groupflex>
          <TSemiBold color={colors.white} fontSize={28}>ตั้งรหัส Passcode</TSemiBold>
          <TLight color={colors.smoky} fontSize={16}>เพื่อเข้าใช้งานในครั้งถัดไป</TLight>
        </Groupflex>

        <ContainerKeyboard>
          <Button onSet={this.ontoggledot} />
        </ContainerKeyboard>
      </NumberWrapper>
    )
  }
}