import React from 'react'
import { 
  View,
} from 'react-native'
import styled from 'styled-components'
import { TText } from '../texts'
import colors from '../../config/colors'
import Button from './button'

const NumberWrapper = styled.View`
  flex: 1;
`

const Groupflex = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
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

const KeyboardComponent = props => (
  <NumberWrapper>
    <Groupflex>
    </Groupflex>

    <ContainerKeyboard>
      <Button onSet={props.ontoggledot} />
    </ContainerKeyboard>
  </NumberWrapper>
)

export default KeyboardComponent