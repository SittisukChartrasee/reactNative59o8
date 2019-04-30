import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

export const getUserTitle = gql`
  query getUserTitle($text: String!) {
    getUserTitle(text: $text) {
      nameTH
    }
  }
`

export const getCountry = gql`
  query getCountry($text: String!) {
    getCountry(text: $text) {
      nameTH
      risk
      code
    }
  }
`

export default compose(
  graphql(getUserTitle, { name: 'getUserTitle' }),
  // graphql(getCountry, { name: 'getCounty' })
)