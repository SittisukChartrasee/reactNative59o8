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

const AppNavigator = createStackNavigator(AppRouteConfigs, { headerMode: 'none' })
const WithNaviga = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))
 

const store = createStore(
  combineReducers({
    nav: createNavigationReducer(AppNavigator),
    ...Reducers,
  }),
  composeWithDevTools(
    applyMiddleware(
      createReactNavigationReduxMiddleware(state => state.nav),
      thunk
    )
  ),
)
 
export const testStore = store

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client(store)}>
          <WithNaviga />
        </ApolloProvider>
      </Provider>
    );
  }
}