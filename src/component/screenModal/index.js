import React from 'react'
import { Modal as ModalR } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from '../modal'
import VerifyEmail from './complete/verifyEmail'
import ReviewScore from './risk/reviewScore'
import { root } from '../../redux/actions/commonAction'
import { onStore } from '../../redux/store'

const mapToProps = ({ nav }) => ({ nav })
const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch),
})
@connect(mapToProps, dispatchToProps)
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

  handleCloseModal = async () => {
    if (this.props.page === 'reviewScore') {
      await onStore.dispatch(NavigationActions.navigate({ routeName: 'suittest' }))
      this.props.updateRoot('screenModal', { visible: false, page: 'reviewScore' })
    } else if (this.props.page === 'reviewScoreApprove') {
      this.props.updateRoot('screenModal', { visible: false, page: 'reviewScoreApprove' })
    }
  }

  render() {
    return (
      <ModalR
        visible={this.props.visible}
        onRequestClose={this.handleCloseModal}
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
