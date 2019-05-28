import React from 'react'
import { connect } from 'react-redux'
import { View, AppState } from 'react-native'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { bindActionCreators } from 'redux'
import { onStore, AppNavigator } from './redux/store'
import provider from './config/provider'
import Modal from './component/modal'
import { root } from './redux/actions/commonAction'

export const store = onStore
const ReactWithState = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))

const mapToProps = ({ root }) => ({ root })
const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch)
})

@provider
@connect(mapToProps, dispatchToProps)
export default class extends React.Component {
  state = {
    appState: AppState.currentState,
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
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