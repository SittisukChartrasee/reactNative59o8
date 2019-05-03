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

export default compose(
  graphql(saveSpouse, { name: 'saveSpouse' })
)