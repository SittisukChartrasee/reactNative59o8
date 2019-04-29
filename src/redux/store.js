import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import noneStatis from 'hoist-non-react-statics'
import reducer from './reducers'
import client from '../config/initApollo'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

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