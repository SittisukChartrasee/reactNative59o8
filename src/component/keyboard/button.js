import React from 'react'
import {
  Dimensions, Vibration, Platform, Image,
} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../config/colors'
import { TText } from '../texts'
import images from '../../config/images'

const { width: viewportWidth } = Dimensions.get('window')

const ContainerKeyboard = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${colors.white};
  paddingVertical: 20;
`

const NumberWrapper = styled.View`
  flex: 1;
  width: 280px;
`

const NumberConatiner = styled.View`
  flex: 1;
  flex-direction: row;
  justifyContent: space-around;
  align-content: center;
`

const NumberTouch = styled.TouchableOpacity`
	width: ${viewportWidth <= 350 ? 52 : 65};
	height: ${viewportWidth <= 350 ? 52 : 65};
	borderColor: ${props => (props.disabled || props.del === '' ? colors.white : 'rgb(170, 170, 170)')};
	borderWidth: 1;
  borderRadius: 100;
  backgroundColor: ${props => (props.disabled && props.del === 'del' ? 'white' : colors.white)};
  justifyContent: center;
`

const number = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
]

const styleImg = {
  alignSelf: 'center',
}

const Keyboard = props => (
  <ContainerKeyboard>
    <NumberWrapper>
      {
        number.map(n => (
          <NumberConatiner key={n}>
            {
              n.map((nn, i) => (
                <NumberTouch
                  onPressIn={() => (Platform.OS === 'android' ? Vibration.vibrate(10) : '')}
                  onPress={() => props.onSet(nn)}
                  key={nn.concat(i)}
                  disabled={nn === ''}
                  del={nn}
                >
                  {
                    nn === 'del'
                      ? <Image style={styleImg} source={images.cancel} />
                      : <TText fontSize="26">{nn}</TText>
                  }
                </NumberTouch>
              ))
            }
          </NumberConatiner>
        ))
      }
    </NumberWrapper>
  </ContainerKeyboard>
)

export default Keyboard
