import React from 'react'
import { NativeModules } from 'react-native'
import noneStatic from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { root } from '../../redux/actions/commonAction'
import { onStore } from '../../redux/store'
import SecureKeyStore from '../../utility/keyStore'

export default WrapperComponent => {
  const Enhance = props => {
    const detailModal = {
      type: 'LOGOUT',
      dis: 'ท่านต้องการออกไปหน้า Login ใช่หรือไม่',
      visible: true,
      swap: true,
    }
    const modal = {
      ...detailModal,
      onPress: () => props.updateRoot('modal', { ...onStore.getState().root.modal, visible: false }),
      onConfirm: () => {
        SecureKeyStore.clear()
        NativeModules.KMyFundOnboarding.finishActivity()
      },
      onPressClose: () => props.updateRoot('modal', { ...onStore.getState().root.modal, visible: false })
    }
    return <WrapperComponent lockout={() => props.updateRoot('modal', modal)} {...props} />
  }
  noneStatic(Enhance, WrapperComponent)

  const mapToProps = ({ root }) => ({ root })
  const dispatchToProps = dispatch => ({
    updateRoot: bindActionCreators(root, dispatch),
  })
  return connect(mapToProps, dispatchToProps)(Enhance)
}