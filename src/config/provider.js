import React from 'react'
import noneStatis from 'hoist-non-react-statics'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import client from '../config/initApollo'
import Navigator from './navigator'

export const storyBookStore = WrapComponents => {
  const Enhance = (props) => (
    <Provider store={store}>
      <WrapComponents {...props} />
    </Provider>
  )
  noneStatis(Enhance, WrapComponents)
  return <Enhance />
}

export default (WrapComponents) => props => {
  const Enhance = () => (
    <Provider store={store}>
      <ApolloProvider client={client(store)}>
        <WrapComponents {...props} />
      </ApolloProvider>
    </Provider>
  )
  noneStatis(Enhance, WrapComponents)
  return <Enhance />
}