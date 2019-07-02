import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const saveSpouse = gql`
  mutation saveSpouse($input: NewSpouse!) {
    saveSpouse(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`
const saveSourceOfFund = gql`
  mutation saveSourceOfFund($input: NewSourceOfFund!) {
    saveSourceOfFund(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveCurrentSameWork = gql`
  mutation saveCurrentSameWork {
    saveCurrentSameWork {
      success
      message
      details{
        field
        description
      }
    }
  }
`
const SaveCurrentSamePermanent = gql`
  mutation SaveCurrentSamePermanent {
    SaveCurrentSamePermanent {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveMailingSamePermanent = gql`
  mutation saveMailingSamePermanent {
    saveMailingSamePermanent {
      success
      message
      details{
        field
        description
      }
    }
  }
`
const saveMailingSameWork = gql`
  mutation saveMailingSameWork {
    saveMailingSameWork {
      success
      message
      details{
        field
        description
      }
    }
  }
`
const saveMailingSameCurrent = gql`
  mutation saveMailingSameCurrent {
    saveMailingSameCurrent {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveWorkSamePermanent = gql`
  mutation saveWorkSamePermanent {
    saveWorkSamePermanent {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveIdentity = gql`
  mutation saveIdentity($input: NewIdentity!) {
    saveIdentity(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveChild = gql`
  mutation saveChild($input: NewChild!) {
    saveChild(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveFatca = gql`
  mutation saveFatca($input: NewFatca!) {
    saveFatca(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveFraud = gql`
  mutation saveFraud($input: NewFraud!) {
    saveFraud(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const savePermanentAddress = gql`
  mutation savePermanentAddress($input: NewPermanentAddress!) {
    savePermanentAddress(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveWorkplaceAddress = gql`
  mutation saveWorkplaceAddress($input: NewWorkplaceAddress!) {
    saveWorkplaceAddress(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveCurrentAddress = gql`
  mutation saveCurrentAddress($input: NewCurrentAddress!) {
    saveCurrentAddress(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveCareer = gql`
  mutation saveCareer($input: NewCareer!) {
    saveCareer(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveContact = gql`
  mutation saveContact($input: NewContact!) {
    saveContact(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveMailingAddress = gql`
  mutation saveMailingAddress($input: NewMailingAddress!) {
    saveMailingAddress(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveSuittest = gql`
  mutation saveSuittest($input: NewSuitTest!) {
    saveSuittest(input: $input) {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const acceptTerm = gql`
  mutation acceptTerm {
    acceptTerm {
      success
      message
      details{
        field
        description
      }
    }
  }
`

const resendEmail = gql`
  mutation resendEmail {
    resendEmail {
      success
      message
      code
      details{
        field
        description
      }
    }
  }
`

const registerBank = gql`
  mutation registerBank($input: NewRegisterBank!) {
    registerBank(input: $input) {
      success
      url
      message
    }
  }
`

const saveSanction = gql`
  mutation saveSanction {
    saveSanction{
      success
      message
    }
  }
`

const updateRegisterBankStatus = gql`
  mutation updateRegisterBankStatus {
    updateRegisterBankStatus{
      success
      message
      details{
        field
        description
      }
    }
  }
`

const saveWaitingApprove = gql`
  mutation saveWaitingApprove {
    saveWaitingApprove{
      success
      message
      details{
        field
        description
      }
    }
  }
`

export default compose(
  graphql(saveSpouse, { name: 'saveSpouse' }),
  graphql(saveCareer, { name: 'saveCareer' }),
  graphql(saveSourceOfFund, { name: 'saveSourceOfFund' }),
  graphql(saveContact, { name: 'saveContact' }),
  graphql(saveCurrentSameWork, { name: 'saveCurrentSameWork' }),
  graphql(SaveCurrentSamePermanent, { name: 'SaveCurrentSamePermanent' }),
  graphql(saveMailingSamePermanent, { name: 'saveMailingSamePermanent' }),
  graphql(saveMailingSameWork, { name: 'saveMailingSameWork' }),
  graphql(saveMailingSameCurrent, { name: 'saveMailingSameCurrent' }),
  graphql(saveWorkSamePermanent, { name: 'saveWorkSamePermanent' }),
  graphql(saveIdentity, { name: 'saveIdentity' }),
  graphql(saveChild, { name: 'saveChild' }),
  graphql(saveFatca, { name: 'saveFatca' }),
  graphql(saveFraud, { name: 'saveFraud' }),
  graphql(savePermanentAddress, { name: 'savePermanentAddress' }),
  graphql(saveWorkplaceAddress, { name: 'saveWorkplaceAddress' }),
  graphql(saveCurrentAddress, { name: 'saveCurrentAddress' }),
  graphql(saveMailingAddress, { name: 'saveMailingAddress' }),
  graphql(saveSuittest, { name: 'saveSuittest' }),
  graphql(acceptTerm, { name: 'acceptTerm' }),
  graphql(registerBank, { name: 'registerBank' }, {
    options: { fetchPolicy: 'no-cache' },
  }),
  graphql(saveSanction, { name: 'saveSanction' }),
  graphql(updateRegisterBankStatus, { name: 'updateRegisterBankStatus' }),
  graphql(saveWaitingApprove, { name: 'saveWaitingApprove' }),
  graphql(resendEmail, { name: 'resendEmail' }),
)