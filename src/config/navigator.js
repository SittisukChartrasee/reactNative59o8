import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator, createAppContainer } from "react-navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers"

// import navigation from './appNavigation'

import fatca from '../screen/fatca'
import fraud from '../screen/fraud'

const AppNavigator = createStackNavigator({
  fatca,
  fraud
}, {
  initialRouteName: "fatca",
  headerMode: 'none',
})

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer
})

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
)

export const App = createAppContainer(AppNavigator, "root")

export const store = createStore(appReducer, applyMiddleware(middleware))