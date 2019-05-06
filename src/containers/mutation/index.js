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
const saveSourceOfFund = gql`
  mutation saveSourceOfFund($input: NewSourceOfFund!) {
    saveSourceOfFund(input: $input) {
      success
      message
    }
  }
`

const saveCurrentSameWork = gql`
  mutation saveCurrentSameWork {
    saveCurrentSameWork {
      success
      message
    }
  }
`
const SaveCurrentSamePermanent = gql`
  mutation SaveCurrentSamePermanent {
    SaveCurrentSamePermanent {
      success
      message
    }
  }
`

const saveMailingSamePermanent = gql`
  mutation saveMailingSamePermanent {
    saveMailingSamePermanent {
      success
      message
    }
  }
`
const saveMailingSameWork = gql`
  mutation saveMailingSameWork {
    saveMailingSameWork {
      success
      message
    }
  }
`
const saveMailingSameCurrent = gql`
  mutation saveMailingSameCurrent {
    saveMailingSameCurrent {
      success
      message
    }
  }
`

const saveWorkSamePermanent = gql`
  mutation saveWorkSamePermanent {
    saveWorkSamePermanent {
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

const saveMailingAddress = gql`
  mutation saveMailingAddress($input: NewMailingAddress!) {
    saveMailingAddress(input: $input) {
      success
      message
    }
  }
`

const saveSuittest = gql`
  mutation saveSuittest($input: NewSuitTest!) {
    saveSuittest(input: $input) {
      success
      message
    }
  }
`

export default compose(
  graphql(saveSpouse, { name: 'saveSpouse' }),
  graphql(saveCareer, { name: 'saveCareer' }),
  graphql(saveSourceOfFund, { name: 'saveSourceOfFund' }),
  graphql(saveContact, { name: 'saveContact'}),
  graphql(saveCurrentSameWork, { name: 'saveCurrentSameWork' }),
  graphql(SaveCurrentSamePermanent, { name: 'SaveCurrentSamePermanent' }),
  graphql(saveMailingSamePermanent, { name: 'saveMailingSamePermanent' }),
  graphql(saveMailingSameWork, { name: 'saveMailingSameWork' }),
  graphql(saveMailingSameCurrent, { name: 'saveMailingSameCurrent' }),
  graphql(saveWorkSamePermanent, { name: 'saveWorkSamePermanent' }),
  graphql(saveIdentity, { name: 'saveIdentity' }),
  graphql(saveFatca, { name: 'saveFatca' }),
  graphql(saveFraud, { name: 'saveFraud' }),
  graphql(savePermanentAddress, { name: 'savePermanentAddress' }),
  graphql(saveWorkplaceAddress, { name: 'saveWorkplaceAddress' }),
  graphql(saveCurrentAddress, { name: 'saveCurrentAddress' }),
  graphql(saveMailingAddress, { name: 'saveMailingAddress' }),
  graphql(saveSuittest, { name: 'saveSuittest' })
)