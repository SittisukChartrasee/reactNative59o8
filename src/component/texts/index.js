import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

export const TText = styled.Text`
  fontSize: ${props => props.fontSize || 18};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: SukhumvitSet-Text;
`

export const TBold = styled.Text`
  fontSize: ${props => props.fontSize || 18};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: SukhumvitSet-SemiBold;
`