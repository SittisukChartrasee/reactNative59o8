import React from 'react'
import thunk from 'redux-thunk'
import { ApolloProvider } from 'react-apollo'
import { Provider, connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import AppRouteConfigs from './config/appNavigation'
import Reducers from './redux/reducers'
import client from './config/initApollo'
import { onStore, AppNavigator } from './redux/store'

const WithNaviga = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))
export const store = onStore

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={onStore}>
        <ApolloProvider client={client(onStore)}>
          <WithNaviga />
        </ApolloProvider>
      </Provider>
    );
  }
}