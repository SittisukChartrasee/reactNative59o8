import React, { PureComponent } from 'react'
import { NavigationActions } from 'react-navigation'
import { NativeModules, BackHandler } from 'react-native'
import noneStatic from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, last, find } from 'lodash'
import { root } from '../../redux/actions/commonAction'
import { bannedPageList, finishActivityPage } from '../../utility/handleBackPress'

export default WrapperComponent => {
  class Enhance extends PureComponent {

    componentDidMount = () => BackHandler.addEventListener("hardwareBackPress", this._onBackPress)

    componentWillUnmount = () => BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)

    _handleSpecialPage = ({ routeName, previousRouteName, beforeLastRoute }) => {
      if (routeName === 'connectBank') {
        this.props.toggleModal({
          dis: 'ท่านต้องการออกจากหน้าเชื่อมบัญชี\nใช่หรือไม่',
          visible: true,
          type: 'row',
          onPress: () => this.props.toggleModal({ ...this.props.root.modal, visible: false }),
          onConfirm: async () => {
            await this.props.toggleModal({ ...this.props.root.modal, visible: false })
            await this.props.handleActionBack()
          },
          onPressClose: () => this.props.toggleModal({ ...this.props.root.modal, visible: false }),
        })
        return true
      } else if (routeName === 'complete') {
        if (this.props.root.screenModal.page === 'reviewScore') {
          this.props.updateRoot('screenModal', { visible: true, page: 'reviewScore' })
          return true
        } else {
          return false
        }
      } else if (routeName === 'autoCheck') {
        const isShow = get(this.props, 'bank.isShowSkipPage', false)

        if (isShow) {
          this.props.handleActionBack()
        } else {
          this.props.handleActionNavigate({ routeName: 'condi' })
        }
        return true
      } else if (routeName === 'idpList') {
        if (previousRouteName === 'checkpoint') {
          this.props.handleActionNavigate({ routeName: 'checkpoint' })
          return true
        } else if (beforeLastRoute !== 'skipNdid') {
          this.props.handleActionBack()
          return true
        } else {
          this.props.handleActionNavigate({ routeName: 'autoCheck' })
          return true
        }
      } else if (routeName === 'info') {
        if (this.props.root.screenModal.page === 'idpStatus') {
          this.props.updateRoot('screenModal', { visible: true, page: 'idpStatus' })
          return true
        } else {
          this.props.handleActionNavigate({ routeName: 'checkpoint' })
          return true
        }
      }

      return false
    }

    _onBackPress = () => {
      const { nav } = this.props

      const lastNav = last(nav.routes)
      const beforeLastNav = nav.routes[nav.routes.length - 2]
      let beforeLastRoute = ''
      let routeName = get(lastNav, 'routeName', '')
      const previousRouteName = get(beforeLastNav, 'routeName', '')

      if (routeName === 'branchNDID') {
        const routes = get(lastNav, 'routes', '')
        beforeLastRoute = routes[routes.length - 2].routeName
        routeName = get(last(routes), 'routeName', '')
      }

      const checkFinishPage = find(finishActivityPage, ["routeName", routeName])
      const checkBanPage = find(bannedPageList, ["routeName", routeName])

      if (this._handleSpecialPage({ routeName, previousRouteName, beforeLastRoute })) {
        return true
      }

      if (checkFinishPage) {
        NativeModules.KMyFundOnboarding.finishActivity()
        return true
      } else if (checkBanPage) {
        return true
      } else {
        this.props.handleActionBack()
        return true
      }
    }

    render() {
      return <WrapperComponent {...this.props} />
    }
  }

  noneStatic(Enhance, WrapperComponent)

  const mapToProps = ({ root, nav, bank }) => ({ root, nav, bank })
  const dispatchToProps = dispatch => ({
    updateRoot: bindActionCreators(root, dispatch),
    handleActionBack: () => dispatch(NavigationActions.back()),
    handleActionNavigate: props => dispatch(NavigationActions.navigate(props)),
    handleScreen: (value) => dispatch({ type: 'CHECKSCREEN', value }),
    toggleModal: value => dispatch({ type: 'modal', value })
  })

  return connect(mapToProps, dispatchToProps)(Enhance)
}