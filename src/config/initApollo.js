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


// const otherToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjhlMzZmNGEwYmUxNjg4NmIzMGUwNzE3MGIyN2M4NDdlNWQ5NDE5YTZhZTU2NTQzODU0ZmU0ZDViMWIzZjM1NDZjMzRjMjYyMzY3YmI5MjEiLCJ0eXBlIjoiOGFjMTVhMmUyOGI0ZDkzN2QyMTQ1ZGM3YTg5MGEzNTM0ZDI1ZTAyNjM2IiwiaWF0IjoxNTQ1NjM4NzQwLCJleHAiOjE1NDU2NDA1NDB9.RBKNgaudNX_ux9cd4EHebZtAEexipKBKk5di9TDd7_fwuO1ekB8rsq8ZiVBthqgZ06LWdF6hSlAnZcmf6xEzQQU1amVMNbkz6MVTTfUmUhH4qoxm6jEV6hAMwZJ6HdD4PTijVswsNw2L025sC2lzrLRseqR5kxbWavqm8TsYJepDcyqLenwEhil9sln4sU1xDp5w-A710Eq6RWeQn09TiUBaTqNAeaBZns_ke_dSH8Y4e5eBTZmdBN_ZU6OoMhk2vR-VlHsGq83Ic8XMwBO7H44buaAjUW83GHHH0Q4-UXpvQLsTO5hKykpNKLs469h_mikma7PnF_hH4hKX4JPltA'
const authLink = store => setContext(async (_, { headers }) => {
  const { root } = store.getState()
  return ({
    headers: {
      ...headers,
      ...((otpSubmit, token) => handleToken(otpSubmit, token))(root.otpSubmit, root.token),
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
