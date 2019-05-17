import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"
import reducer from './reducers'

import fatca from '../screen/fatca'
import fraud from '../screen/fraud'

const AppNavigator = createStackNavigator({
  fatca,
  fraud
}, {
  initialRouteName: "fatca",
  headerMode: 'none'
})

const appReducer = combineReducers({
  nav: createNavigationReducer(AppNavigator),
  ...reducer,
})

const middlewareRouter = createReactNavigationReduxMiddleware(
  state => state.nav
)

export const App = createAppContainer(AppNavigator)

export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk, middlewareRouter)))
