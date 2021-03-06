import styled from 'styled-components/native'
import fonts from '../../config/fonts'

export const TThin = styled.Text`
  fontSize: ${props => props.fontSize || '18'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitThin};
`

export const TText = styled.Text`
  fontSize: ${props => props.fontSize || '18'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitText};
`

export const TMed = styled.Text`
  fontSize: ${props => props.fontSize || '18'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitMed};
`

export const TLight = styled.Text`
  fontSize: ${props => props.fontSize || '16'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitLight};
`

export const TBold = styled.Text`
  fontSize: ${props => props.fontSize || '18'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitBold};
`

export const TSemiBold = styled.Text`
  fontSize: ${props => props.fontSize || '18'};
  textAlign: ${props => props.textAlign || 'center'};
  color: ${props => props.color || 'black'};
  marginTop: ${props => props.mt || '0'};
  marginBottom: ${props => props.mb || '0'};
  marginLeft: ${props => props.ml || '0'};
  marginRight: ${props => props.mr || '0'};
  fontFamily: ${fonts.sukhumvitSemiBold};
`