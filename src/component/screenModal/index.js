import React from 'react'
import { Modal as ModalR } from 'react-native'
import Modal from '../modal'
import VerifyEmail from './complete/verifyEmail'
import ReviewScore from './risk/reviewScore'

class ScreenModal extends React.PureComponent {

  static defaultProps = {
    visible: false,
    page: ''
  }

  onHandleChooseScreen = () => {

    if (this.props.page === 'verifyEmail') {
      return <VerifyEmail />
    } else if (this.props.page === 'reviewScore') {
      return <ReviewScore status="before" />
    }

  }

  render() {
    return (
      <ModalR
        visible={this.props.visible}
        presentationStyle="fullScreen"
        animationType="slide"
        style={{ position: 'absolute', zIndex: 0 }}
      >
        {this.onHandleChooseScreen()}

        <Modal {...this.props.modal} />
      </ModalR>
    )
  }
}

export default ScreenModal
