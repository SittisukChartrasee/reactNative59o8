import React from 'react'
import {
  NativeModules,
  View,
} from 'react-native'
import noneStatic from 'hoist-non-react-statics'

export default (ComponentWrapper) => {
  class Enhance extends React.Component {
    state = {
      fcm: '',
      version: '',
    }
    componentDidMount = () => {
      const {
        getFCMToken,
        getVersionAppKMyFunds
      } = NativeModules.KMyFundOnboarding

      getFCMToken(fcm => {
        getVersionAppKMyFunds(version => {
          this.setState({
            fcm,
            version
          })
        })
      })
    }

    render() {
      const { fcm, version } = this.state
      return <ComponentWrapper {...this.props} fcm={fcm} version={version}/>
    }
  }

  noneStatic(Enhance, ComponentWrapper)
  return Enhance
}