import React, { PureComponent } from 'react'
import {
  NativeModules,
  View,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import noneStatic from 'hoist-non-react-statics'
import { root } from '../../redux/actions/commonAction'

const dispatchToProps = dispatch => ({
  updateRoot: bindActionCreators(root, dispatch),
})

export default (ComponentWrapper) => {
  @connect(null, dispatchToProps)
  class Enhance extends PureComponent {
    state = {
      fcm: '',
      version: '',
      deviceInfo: '',
    }
    componentDidMount = () => {
      if (NativeModules.KMyFundOnboarding) {
        NativeModules.KMyFundOnboarding.getFCMToken(fcm => {
          NativeModules.KMyFundOnboarding.getVersionAppKMyFunds(version => {
            NativeModules.KMyFundOnboarding.getDeviceInfo(deviceInfo => {
              NativeModules.KMyFundOnboarding.getDeviceId(deviceId => {
                this.setState({
                  fcm,
                  version,
                  deviceId,
                  deviceInfo,
                })
              })
            })
          })
        })
      }
    }

    render() {
      const { fcm, version, deviceInfo } = this.state
      return <ComponentWrapper {...this.props} fcm={fcm} version={version} deviceInfo={deviceInfo} />
    }
  }

  noneStatic(Enhance, ComponentWrapper)
  return Enhance
}