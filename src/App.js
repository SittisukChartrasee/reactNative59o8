import React from 'react'
import thunk from 'redux-thunk'
import { ApolloProvider } from 'react-apollo'
import { Provider, connect } from 'react-redux'
import {
  createReduxContainer,
} from 'react-navigation-redux-helpers'
import client from './config/initApollo'
import { onStore, AppNavigator } from './redux/store'
import pro from './config/provider'

const WithNaviga = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))
export const store = onStore

export default pro(WithNaviga)