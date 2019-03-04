import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import noneStatis from 'hoist-non-react-statics'
import reducer from './reducers'

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
      <WrapComponents {...props} />
    </Provider>
  )
  noneStatis(Enhance, WrapComponents)
  return <Enhance />
}