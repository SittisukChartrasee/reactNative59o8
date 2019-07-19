import { AsyncStorage, NativeModules } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { CHANGE_ROOT } from '../redux/types'
import env from './env'

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
          onPressClose: () => {
            store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false } })
            store.dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
          },
        }
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
      }
    }
  } catch (error) {
    console.log('error', error)
  }
})

const handleToken = token => token ? { authorization: `Bearer ${token}` } : {}


const authLink = store => setContext(async (_, { headers }) => {
  const { root } = store.getState()
  const token = await AsyncStorage.getItem('access_token')

  return ({
    headers: {
      ...headers,
      ...((token) => handleToken(token))(token),
    },
  })
})

const getAuthLink = (link, store) => new ApolloClient({
  link: ApolloLink.from([errorLink(store), authLink(store).concat(createUploadLink({ uri: link }))]),
  cache: new InMemoryCache(),
})

export default (store) => {
  // const { scbENV } = store.getState().root

  switch (true) {
    // case 'PRO': return getAuthLink(`${env.API_PATH}/graphql`, store)
    // case 'DEV': return getAuthLink(`${env.API_PATH_DEV}/graphql`, store)
    // case 'UAT': return getAuthLink(`${env.API_PATH_UAT}/graphql`, store)
    // case 'SIT': return getAuthLink(`${env.API_PATH_SIT}/graphql`, store)
    // default: return getAuthLink(`${env.API_PATH}/graphql`, store)
    // default: return getAuthLink('https://ka-ob-client-dev.codefin.io/query', store) // DEV
    default: return getAuthLink(`${env.API_PATH_UAT}/query`, store) // SIT
  }
}
