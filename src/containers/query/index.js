import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash/debounce'

export const containerQuery = debounce((client, obj, setState) => {
  client.query({ ...obj })
    .then((val) => setState(val))
    .catch(err => console.error(err))
}, 300)

export const getUser = gql`
  query getUser{
    getUser{
      success
      result{
        identity{
          docNo
          isNoDocExpDate
          docExpDate
          genderCode
          titleTH
          firstNameTH
          lastNameTH
          firstNameEN
          lastNameEN
          dayOfBirth
          monthOfBirth
          yearOfBirth
          nationalityCode
          martialStatusCode
          isChild
        }
        spouse{
          nationality
          nationalityCode
          IDCardNo
          isIDCardExpDate
          cardExpiredDate
          title
          fistName
          lastName
          pepFlag
        }
        career{
          isic
          isicCode
          isicOther
          occupation
          occupationCode
          occupationOther
          incomeRangeCode
          countrySourceOfIncome
          countrySourceOfIncomeDetail
        }
        firstChild{
          ChildTitleTH
          ChildFirstNameTH
          ChildLastNameTH
          ChildDayOfBirth
          ChildMonthOfBirth
          ChildYearOfBirth
          ChildDocNo
          ChildIsNoDocExpDate
          ChildDocExpDate
        }
        secondChild{
          ChildTitleTH
          ChildFirstNameTH
          ChildLastNameTH
          ChildDayOfBirth
          ChildMonthOfBirth
          ChildYearOfBirth
          ChildDocNo
          ChildIsNoDocExpDate
          ChildDocExpDate
        }
        sourceOfFund{
          investmentSource
          investmentSourceOther
          investmentSourceCountry
          investmentPurpose
          investmentPurposeOther
          dividendWithHoldingTax
          investmentSourceCountryDetail
        }
        permanentAddress{
          Country
          CountryCode
          AddressNoTH
          Moo
          AddressVillageTH
          FloorNo
          TrokSoiYaek
          Thanon
          District
          DistrictCode
          SubDistrict
          SubDistrictCode
          Province
          ProvinceCode
          ZipCode
          CompanyName
        }
        workAddress{
          Country
          CountryCode
          AddressNoTH
          Moo
          AddressVillageTH
          FloorNo
          TrokSoiYaek
          Thanon
          District
          DistrictCode
          SubDistrict
          SubDistrictCode
          Province
          ProvinceCode
          ZipCode
          CompanyName
        }
        currentAddress{
          Country
          CountryCode
          AddressNoTH
          Moo
          AddressVillageTH
          FloorNo
          TrokSoiYaek
          Thanon
          District
          DistrictCode
          SubDistrict
          SubDistrictCode
          Province
          ProvinceCode
          ZipCode
          CompanyName
        }
        mailingAddress{
          Country
          CountryCode
          AddressNoTH
          Moo
          AddressVillageTH
          FloorNo
          TrokSoiYaek
          Thanon
          District
          DistrictCode
          SubDistrict
          SubDistrictCode
          Province
          ProvinceCode
          ZipCode
          CompanyName
        }
        contact{
          workPhone
          homePhone
          mobilePhone
          email
        }
        suitability{
          suit01
          suit02
          suit03
          suit04
          suit04Array
          suit05
          suit06
          suit07
          suit08
          suit09
          suit10
          suit11
          suit12
        }
        fraud{
          hasLaunderingRecord
          isPolitician
        }
        fatca{
          isUSCitizen
          isHoldingUsCard
          isUSTaxPurposes
          surrenderedUSCitizenship
          transferFundsToAccountInUS
          grantedToPersonWithUSAddress
          mailOrCareOfAddressAccountOpenedKBank
          currentOrMailingAddressAccountOpenedKbank
          isUSPhoneNo
        }
      }
    }
  }
`

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
  query getInvestment {
    getInvestment {
      crrLevel
      riskLevel
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

export const getStatusEditing = gql`
  query getStatusEditing {
    getStatusEditing {
      idCard
      selfie
      checkIDCard
      checkSelfie
    }
  }
`

export const getTermAndCondition = gql`
  query getTermAndCondition {
    getTermAndCondition
  }
`

export const getInvestmentAfterApprove = gql`
  query getInvestmentAfterApprove {
    riskLevel
    crrLevel
    nameTH
    nameEN
    returnText
    descTH
    descEN
    fundCodeKAsset
    assetClass {
      nameTH
      nameEN
      weight
      color
      sortOrder
    }
  }
`

export const checkVerifiedEmailInterval = graphql(checkVerifiedEmail, {
  name: 'checkVerifiedEmailInterval',
  options: {
    pollInterval: 3000,
    fetchPolicy: "no-cache"
  }
})

export default graphql(getRegisterBankStatus, {
  name: 'getRegisterBankStatus',
  options: {
    pollInterval: 3000,
  }
})
