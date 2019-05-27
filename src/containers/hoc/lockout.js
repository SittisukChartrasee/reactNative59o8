import React from 'react'
import noneStatic from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { root } from '../../redux/actions/commonAction'


export default WrapperComponent => {
  const Enhance = props => {
    const modal = {
      type: 'LOGOUT',
      dis: 'คุณต้องการออกจากหน้าเชื่อมบัญชี\nใช่หรือไม่ ?',
      visible: true,
      onPress: () => props.updateRoot('modal', { visible: false }),
      onPressClose: () => this.props.updateRoot('modal', { visible: false })
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