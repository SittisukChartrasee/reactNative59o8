import { Platform } from 'react-native'

export const chkModel = () => {
  // console.log('chkModel: ', Constants)
  return (
    Platform.ios &&
    Platform.ios.model.slice(0, 8) === 'iPhone X'
  )
}