import React from 'react'
import { 
  View,
  Image,
} from 'react-native'
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

export default class extends React.Component {
  state = {

  }

  ontoggledot = (d) => {
    console.log(d)
  }

  render() {
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