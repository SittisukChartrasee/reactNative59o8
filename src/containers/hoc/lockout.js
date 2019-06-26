import React from 'react'
import { NativeModules } from 'react-native'
import noneStatic from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { root } from '../../redux/actions/commonAction'


export default WrapperComponent => {
  const Enhance = props => {
    const modal = {
      type: 'LOGOUT',
      dis: 'คุณต้องการออกไปหน้า Login ใช่หรือไม่',
      visible: true,
      swap: true,
      onChange: val => console.log(val),
      onPress: () => props.updateRoot('modal', { visible: false }),
      onConfirm: () => NativeModules.KMyFundOnboarding.finishActivity(),
      onPressClose: () => props.updateRoot('modal', { visible: false })
    }
    return <WrapperComponent lockout={() => props.updateRoot('modal', modal)} {...props}/>
  }
  noneStatic(Enhance, WrapperComponent)

  const mapToProps = () => ({  })
  const dispatchToProps = dispatch => ({
    updateRoot: bindActionCreators(root, dispatch)
  })
  return connect(mapToProps, dispatchToProps)(Enhance)
}