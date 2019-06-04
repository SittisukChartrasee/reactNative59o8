import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"
import reducers from './reducers'
import AppRouteConfigs from '../config/appNavigation'
import { handleModal } from '../containers/middleware/modal'

export const AppNavigator = createStackNavigator(AppRouteConfigs,
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  })

const store = createStore(
  combineReducers({
    nav: createNavigationReducer(AppNavigator),
    ...reducers,
  }),
  composeWithDevTools(
    applyMiddleware(
      createReactNavigationReduxMiddleware(state => state.nav),
      thunk,
      handleModal,
    )
  ),
)
 
export const onStore = store