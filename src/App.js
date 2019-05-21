import React from 'react'
import { connect } from 'react-redux'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { onStore, AppNavigator } from './redux/store'
import pro from './config/provider'

export const store = onStore

export default pro(
  connect(
    ({ nav }) => ({ state: nav })
  )(createReduxContainer(AppNavigator, 'root'))
)