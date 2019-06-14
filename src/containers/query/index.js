import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'

export const containerQuery = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

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

export const getSubDistrict = gql`
  query getSubDistrict($text: String!) {
    getSubDistrict(text: $text) {
      nameTH
      displayName
      postcode
      code
    }
  }
`

export const getAddressCode = gql`
  query getAddressCode($code: String!) {
    getAddressCode(code: $code){
      provinceCode
      provinceNameTH
      districtCode
      districtNameTH
    }
  }
`

export const getBusinessType = gql`
  query getBusinessType($text: String!) {
    getBusinessType(text: $text) {
      nameTH
      code
    }
  }
`

export const getOccupation = gql`
  query getOccupation($text: String!) {
    getOccupation(text: $text) {
      nameTH
      code
    }
  }
`

export const getInvestment = gql`
  query getInvestment($point: String!) {
    getInvestment(point: $point) {
      crrLevel
      nameTH
      nameEN
      returnText
      descTH
      descEN
      fundCodeKAsset
      assetClass{
        nameTH
        nameEN
        color
        sortOrder
        weight
      }
    }
  }
`

export const getRegisterBankStatus = gql`
  query getRegisterBankStatus {
    getRegisterBankStatus {
      status
      message
    }
  }
`

export const checkVerifiedEmail = gql`
  query checkVerifiedEmail {
    checkVerifiedEmail
  }
`

export const getStatus = gql`
  query getStatus {
    getStatus
  }
`

export const getStatusInProgress = gql`
  query getStatusInProgress {
    getStatusInProgress
  }
`

export default graphql(getRegisterBankStatus, {
  name: 'getRegisterBankStatus',
  options: {
    pollInterval: 5000,
  }
})