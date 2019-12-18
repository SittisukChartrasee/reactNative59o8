import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Text, View, AppState, BackHandler, NativeModules } from 'react-native'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { bindActionCreators } from 'redux'
import { get, last, find } from 'lodash'
import { onStore, AppNavigator } from './redux/store'
import provider from './config/provider'
import Modal from './component/modal'
import Screen from './component/screenComponent'
import ScreenModal from './component/screenModal'
import { root } from './redux/actions/commonAction'
import colors from './config/colors';
import { TBold } from './component/texts';
import Spinner from './component/spinner'
import releaseApp from '../release/releaseApp.json'
import SecureKeyStore from "../src/utility/keyStore"
import { bannedPageList, finishActivityPage } from './utility/handleBackPress'

export const store = onStore
const ReactWithState = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))

const TEST = false // ถ้าจะ TEST ให้ set true : false

const mapToProps = ({ root, nav, bank }) => ({ root, nav, bank })
const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch),
  handleActionBack: () => dispatch(NavigationActions.back()),
  handleActionNavigate: props => dispatch(NavigationActions.navigate(props)),
  handleScreen: (value) => dispatch({ type: 'CHECKSCREEN', value }),
  toggleModal: value => dispatch({ type: 'modal', value })
})

@provider
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  constructor(props) {
    super(props)

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    this.state = {
      appState: AppState.currentState,
      loading: false,
    }

    !TEST &&
      SecureKeyStore.get("user_token")
        .then(async d => {
          const a = await SecureKeyStore.get('userToken')
          console.log(a, d)
          if (d) {
            this.setState({ loading: true })
            this.props.handleScreen('login')
          } else {
            this.setState({ loading: true })
            this.props.handleScreen('firstTerm')
          }
        })
  }



  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    this._handleGetBundleVersion(releaseApp)

    // const nativeEventListener = DeviceEventEmitter.addListener('ActivityStateChange',
    //   (e)=>{
    //       console.log(e.event);
    //       // this.setState({ test: e.event })

    //       if (e.event === 'inactive') return ToastAndroid.show('bye bye', ToastAndroid.SHORT)
    //       else if (e.event === 'active') return ToastAndroid.show('Welcome', ToastAndroid.SHORT)
    // })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  _handleSpecialPage = ({ routeName }) => {
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

  onBackPress = () => {
    const { nav } = this.props

    const lastNav = last(nav.routes)
    let routeName = get(lastNav, 'routeName', '')

    if (routeName === 'branchNDID') {
      const routes = get(lastNav, 'routes', '')
      routeName = get(last(routes), 'routeName', '')
    }

    const checkFinishPage = find(finishActivityPage, ["routeName", routeName])
    const checkBanPage = find(bannedPageList, ["routeName", routeName])

    if (this._handleSpecialPage({ routeName })) {
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

  _handleGetBundleVersion = release => NativeModules.KMyFundOnboarding.getBundleVersion(`${release.nameFile}, ENV: ${release.env}, Build: ${release.build}`)

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    this.setState({ appState: nextAppState });
    this.props.updateRoot('appState', nextAppState)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          !TEST ?
            this.state.loading
              ? <ReactWithState />
              : <Screen />
            : <ReactWithState />
        }

        {
          this.props.root.screenModal.visible ?
            <ScreenModal modal={this.props.root.modal} {...this.props.root.screenModal} /> :
            <Modal {...this.props.root.modal} />
        }

        <Spinner loading={this.props.root.loading} />
      </View>
    )
  }
}