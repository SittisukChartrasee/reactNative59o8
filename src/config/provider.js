import React from 'react'
import noneStatis from 'hoist-non-react-statics'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { onStore } from '../redux/store'
import client from '../config/initApollo'

export const storyBookStore = WrapComponents => {
  const Enhance = (props) => (
    <Provider store={onStore}>
      <WrapComponents {...props} />
    </Provider>
  )
  noneStatis(Enhance, WrapComponents)
  return <Enhance />
}

export default (WrapComponents) => props => {
  const Enhance = () => (
    <Provider store={onStore}>
      <ApolloProvider client={client(onStore)}>
        <WrapComponents />
      </ApolloProvider>
    </Provider>
  )
  noneStatis(Enhance, WrapComponents)
  return <Enhance />
}