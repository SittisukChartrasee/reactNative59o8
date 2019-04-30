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