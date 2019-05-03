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

const saveIdentity = gql`
  mutation saveIdentity($input: NewIdentity!) {
    saveIdentity(input: $input) {
      success
      message
    }
  }
`

const saveFatca = gql`
  mutation saveFatca($input: NewFatca!) {
    saveFatca(input: $input) {
      success
      message
    }
  }
`

const saveFraud = gql`
  mutation saveFraud($input: NewFraud!) {
    saveFraud(input: $input) {
      success
      message
    }
  }
`

const savePermanentAddress = gql`
  mutation savePermanentAddress($input: NewPermanentAddress!) {
    savePermanentAddress(input: $input) {
      success
      message
    }
  }
`

const saveWorkplaceAddress = gql`
  mutation saveWorkplaceAddress($input: NewWorkplaceAddress!) {
    saveWorkplaceAddress(input: $input) {
      success
      message
    }
  }
`

const saveCurrentAddress = gql`
  mutation saveCurrentAddress($input: NewCurrentAddress!) {
    saveCurrentAddress(input: $input) {
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

const saveContact = gql`
  mutation saveContact($input: NewContact!) {
    saveContact(input: $input) {
      success
      message
    }
  }
`

export default compose(
  graphql(saveSpouse, { name: 'saveSpouse' }),
  graphql(saveIdentity, { name: 'saveIdentity' }),
  graphql(saveFatca, { name: 'saveFatca' }),
  graphql(saveFraud, { name: 'saveFraud' }),
  graphql(savePermanentAddress, { name: 'savePermanentAddress' }),
  graphql(saveWorkplaceAddress, { name: 'saveWorkplaceAddress' }),
  graphql(saveCurrentAddress, { name: 'saveCurrentAddress' }),
  graphql(saveCareer, { name: 'saveCareer' }),
  graphql(saveContact, { name: 'saveContact' }),
)