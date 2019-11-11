import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Text, View, AppState, BackHandler, AsyncStorage, NativeModules } from 'react-native'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { bindActionCreators } from 'redux'
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

export const store = onStore
const ReactWithState = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))

const TEST = false // ถ้าจะ TEST ให้ set true : false

const mapToProps = ({ root, nav }) => ({ root, nav })
const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch),
  handleActionBack: () => dispatch(NavigationActions.back()),
  handleScreen: (value) => dispatch({ type: 'CHECKSCREEN', value })
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
      AsyncStorage.getItem('user_token')
        .then(async d => {
          const a = await AsyncStorage.getItem('userToken')
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

  onBackPress = () => {
    const { nav } = this.props
    if (nav.index === 0) {
      return false
    }
    // this.props.handleActionBack()
    return true
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