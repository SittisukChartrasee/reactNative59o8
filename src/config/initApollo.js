import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

// import { beforLogin } from './router'
// import env from './env'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  try {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log('graphQLErrors: ', graphQLErrors)
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      })
    }

    if (networkError) {
      if (networkError.statusCode === 401 && networkError.result.message === 'jwt expired') {
        beforLogin('token-expired')
      }
    }
  } catch (error) {
    console.log('error', error)
  }
})

const handleToken = (otpSubmit, token) => {
  if (token) {
    console.log('=========== ', token, '=========', otpSubmit)
    if (otpSubmit && token) {
      return {
        authorization: otpSubmit ? `Bearer ${otpSubmit}` : '',
      }
    }
    return {
      authorization: token ? `Bearer ${token}` : '',
    }
  }
  return {}
}


const authLink = store => setContext(async (_, { headers }) => {
  const { root } = store.getState()
  return ({
    headers: {
      ...headers,
      ...((otpSubmit, token) => handleToken(otpSubmit, token))(root.otpSubmit, root.access_token),
    },
  })
})

const getAuthLink = (link, store) => new ApolloClient({
  link: ApolloLink.from([errorLink, authLink(store).concat(createUploadLink({ uri: link }))]),
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
    default: return getAuthLink('https://ka-ob-client-dev.codefin.io', store)
  }
}
