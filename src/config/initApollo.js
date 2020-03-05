import { useState } from 'react'
import { NativeModules } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { CHANGE_ROOT } from '../redux/types'
import ENV from './env'
import SecureKeyStore from "../utility/keyStore";

// import { beforLogin } from './router'

const errorLink = store => onError(({ graphQLErrors, networkError }) => {
  try {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log('graphQLErrors: ', graphQLErrors)
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      })
    }

    if (networkError) {
      if (networkError.statusCode === 401 && networkError.bodyText.trim() === 'jwt expired') {
        const modal = {
          dis: `ท่านไม่ได้ทำรายการใดๆ เกินระยะเวลาที่\nกำหนด กรุณาเข้าสู่ระบบใหม่อีกครั้ง`,
          visible: true,
          onPress: () => NativeModules.KMyFundOnboarding.finishActivity(),
          onPressClose: () => store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { dis: `ท่านไม่ได้ทำรายการใดๆ เกินระยะเวลาที่\nกำหนด กรุณาเข้าสู่ระบบใหม่อีกครั้ง`, visible: false } }),
        }
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
      }
    }
  } catch (error) {
    console.log('error', error)
  }
})

const handleToken = token => token ? { authorization: `Bearer ${token}` } : {}


const authLink = (_, version) => setContext(async (_, { headers }) => {
  const token = await SecureKeyStore.get("access_token")
  return ({
    headers: {
      ...headers,
      'app-version': version,
      ...((token) => handleToken(token))(token),
    },
  })
})

const getAuthLink = (link, { store, version }) => new ApolloClient({
  link: ApolloLink.from([errorLink(store), authLink(store, version).concat(createUploadLink({ uri: link }))]),
  cache: new InMemoryCache(),
})

export default (store) => {
  const [version, setVersion] = useState('0.0.0')
  NativeModules.KMyFundOnboarding.getVersionAppKMyFunds(v => setVersion(v))
  switch (true) {
    // default: return getAuthLink(`${env.API_PATH_SIT}/query`, store) // SIT
    default: return getAuthLink(`${ENV[store.getState().root.env]}/query`, { store, version })
  }
}
