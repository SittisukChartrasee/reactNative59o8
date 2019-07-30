import React from 'react'
import {
  NativeModules,
  View,
  Platform
} from 'react-native'
import noneStatic from 'hoist-non-react-statics'

export default (ComponentWrapper) => {
  class Enhance extends React.Component {
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
              this.setState({
                fcm,
                version,
                deviceInfo,
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