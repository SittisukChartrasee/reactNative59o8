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
      fcm2: '',
      version: '',
    }
    componentDidMount = () => {
      if (NativeModules.KMyFundOnboarding) {
        NativeModules.KMyFundOnboarding.getFCMToken((fcm, fcm2) => {
          NativeModules.KMyFundOnboarding.getVersionAppKMyFunds((version, version2) => {
            this.setState({
              fcm,
              fcm2,
              version,
              version2
            })
          })
        })
      }
    }

    render() {
      const { fcm, fcm2, version, version2 } = this.state
      const FCMtoken2 = 'Test for FCM IOS'
      alert(FCMtoken2)
      return <ComponentWrapper
        {...this.props}
        fcm={Platform === 'android' ? fcm : FCMtoken2}
        version={Platform === 'android' ? version : version2}

      />
    }
  }

  noneStatic(Enhance, ComponentWrapper)
  return Enhance
}