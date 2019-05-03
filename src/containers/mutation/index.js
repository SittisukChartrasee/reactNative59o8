import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const saveSpouse = gql`
  mutation saveSpouse($input: NewSpouse!) {
    saveSpouse(input: $input) {
      success
      message
    }
  }
`

const saveCareer = gql`
  mutation saveCareer($input: NewCareer!) {
    saveCareer(input: $input) {
      success
      message
    }
  }
`

const saveSourceOfFund = gql`
  mutation saveSourceOfFund($input: NewSourceOfFund!) {
    saveSourceOfFund(input: $input) {
      success
      message
    }
  }
`

const saveContact = gql`
  mutation saveContact($input: NewSourceOfFund!) {
    saveContact(input: $input) {
      success
      message
    }
  }
`

// const saveCurrentSameWork = gql`
//   mutation saveCurrentSameWork($input: )
// `

export default compose(
  graphql(saveSpouse, { name: 'saveSpouse' }),
  graphql(saveCareer, { name: 'saveCareer' }),
  graphql(saveSourceOfFund, { name: 'saveSourceOfFund' }),
  graphql(saveContact, { name: 'saveContact'})
)