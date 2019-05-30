import React from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { View, AppState, BackHandler } from 'react-native'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { bindActionCreators } from 'redux'
import { onStore, AppNavigator } from './redux/store'
import provider from './config/provider'
import Modal from './component/modal'
import { root } from './redux/actions/commonAction'

export const store = onStore
const ReactWithState = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))


const mapToProps = ({ root, nav }) => ({ root, nav })
const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch),
  handleActionBack: () => dispatch(NavigationActions.back())
})

@provider
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    appState: AppState.currentState,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
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
    this.props.handleActionBack()
    return true
  }

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
    const { modal } = this.props.root
    return (
      <View style={{ flex: 1 }}>
        <ReactWithState />
        { Modal(modal) }
      </View>
    )
  }
}