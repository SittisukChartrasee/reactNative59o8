import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { bindActionCreators } from 'redux'
import { onStore, AppNavigator } from './redux/store'
import provider from './config/provider'
import Modal from './component/modal'
import { root } from './redux/actions/commonAction'

export const store = onStore
const ReactWithState = connect(({ nav }) => ({ state: nav }))(createReduxContainer(AppNavigator, 'root'))

const mapToProps = ({ root }) => ({ root })

@provider
@connect(mapToProps)
export default class extends React.Component {
  render() {
    const { modal } = this.props.root
    return (
      <View style={{ flex: 1 }}>
        <ReactWithState />
        { Modal(modal) }
      </View>
    )
  }
}