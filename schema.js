
type Career {
  isicCode: String!
  occupationCode: String!
  incomeRangeCode: String!
  countrySourceOfIncome: String!
}

type Contact {
  workPhone: String
  homePhone: String
  mobilePhone: String
  email: String
}

type CurrentAddress {
  countryCode: String!
  addressNoTH: String!
  moo: String
  addressVillageTH: String
  trokSoiYaek: String
  thanon: String!
  district: String!
  districtCode: String!
  subDistrict: String!
  subDistrictCode: String!
  province: String!
  provinceCode: String!
  zipCode: String!
}

type Fatca {
  isUSCitizen: Boolean!
  isHoldingUsCard: Boolean!
}

type Fraud {
  hasLaunderingRecord: Boolean!
  isPolitician: Boolean!
}

type Identity {
  docNo: String!
  isNoDocExpDate: Boolean!
  docExpDate: String!
  genderCode: String!
  titleTH: String!
  firstNameTH: String!
  lastNameTH: String!
  firstNameEN: String!
  lastNameEN: String!
  dayOfBirth: String!
  monthOfBirth: String!
  yearOfBirth: String!
  nationalityCode: String!
  martialStatusCode: String!
}

type MailingAddress {
  countryCode: String!
  addressNoTH: String!
  moo: String
  addressVillageTH: String
  trokSoiYaek: String
  thanon: String!
  district: String!
  districtCode: String!
  subDistrict: String!
  subDistrictCode: String!
  province: String!
  provinceCode: String!
  zipCode: String!
}

type Mutation {
  acceptTerm: Response!
  saveFatca(input: NewFatca!): Response!
  saveFraud(input: NewFraud!): Response!
  saveIdentity(input: NewIdentity!): Response!
  saveSpouse(input: NewSpouse!): Response!
  saveCareer(input: NewCareer!): Response!
  saveSourceOfFund(input: NewSourceOfFund!): Response!
  savePermanentAddress(input: NewPermanentAddress!): Response!
  saveWorkSamePermanent: Response!
  saveWorkplaceAddress(input: NewWorkplaceAddress!): Response!
  SaveCurrentSamePermanent: Response!
  saveCurrentSameWork: Response!
  saveCurrentAddress(input: NewCurrentAddress!): Response!
  saveMailingSamePermanent: Response!
  saveMailingSameWork: Response!
  saveMailingSameCurrent: Response!
  saveMailingAddress(input: NewMailingAddress!): Response!
  saveContact(input: NewContact!): Response!
}

input NewCareer {
  isicCode: String!
  occupationCode: String!
  incomeRangeCode: String!
  countrySourceOfIncome: String!
}

// input NewContact {
//   workPhone: String
//   homePhone: String
//   mobilePhone: String
//   email: String
// }

// input NewCurrentAddress {
//   countryCode: String!
//   addressNoTH: String!
//   moo: String
//   addressVillageTH: String
//   trokSoiYaek: String
//   thanon: String!
//   district: String!
//   districtCode: String!
//   subDistrict: String!
//   subDistrictCode: String!
//   province: String!
//   provinceCode: String!
//   zipCode: String!
// }

input NewFatca {
  isUSCitizen: Boolean!
  isHoldingUsCard: Boolean!
}

input NewFraud {
  hasLaunderingRecord: Boolean! // 
  isPolitician: Boolean!
}

// input NewIdentity {
//   docNo: String!
//   jcNumber: String!
//   isNoDocExpDate: Boolean!
//   docExpDate: String!
//   genderCode: String!
//   titleTH: String!
//   firstNameTH: String!
//   lastNameTH: String!
//   firstNameEN: String!
//   lastNameEN: String!
//   dayOfBirth: String!
//   monthOfBirth: String!
//   yearOfBirth: String!
//   nationalityCode: String!
//   martialStatusCode: String!
// }

// input NewMailingAddress {
//   countryCode: String!
//   addressNoTH: String!
//   moo: String
//   addressVillageTH: String
//   trokSoiYaek: String
//   thanon: String!
//   district: String!
//   districtCode: String!
//   subDistrict: String!
//   subDistrictCode: String!
//   province: String!
//   provinceCode: String!
//   zipCode: String!
// }

// input NewPermanentAddress {
//   countryCode: String!
//   addressNoTH: String!
//   moo: String
//   addressVillageTH: String
//   trokSoiYaek: String
//   thanon: String!
//   district: String!
//   districtCode: String!
//   subDistrict: String!
//   subDistrictCode: String!
//   province: String!
//   provinceCode: String!
//   zipCode: String!
// }

input NewSourceOfFund {
  investmentSource: [String!]!
  investmentSourceOther: String
  investmentSourceCountry: String!
  investmentPurpose: String!
  dividendWithHoldingTax: Boolean!
}

// input NewSpouse {
//   nationalityCode: String!
//   IDCardNo: String!
//   isIDCardExpDate: Boolean!
//   cardExpiredDate: String!
//   title: String!
//   fistName: String!
//   lastName: String!
//   pepFlag: Boolean!
// }

input NewTodo {
  text: String!
  userId: String!
}

// input NewWorkplaceAddress {
//   countryCode: String!
//   companyName: String!
//   addressNoTH: String!
//   addressVillageTH: String
//   floorNo: String
//   unitNo: String
//   moo: String
//   trokSoiYaek: String
//   thanon: String!
//   district: String!
//   districtCode: String!
//   subDistrict: String!
//   subDistrictCode: String!
//   province: String!
//   provinceCode: String!
//   zipCode: String!
// }

type PermanentAddress {
  countryCode: String!
  addressNoTH: String!
  moo: String
  addressVillageTH: String
  trokSoiYaek: String
  thanon: String!
  district: String!
  districtCode: String!
  subDistrict: String!
  subDistrictCode: String!
  province: String!
  provinceCode: String!
  zipCode: String!
}

type Query {
  todos: [Todo!]!
  users: [User!]!
  getFatca: Fatca
  getFraud: Fraud!
  getIdentity: Identity!
  getSpouse: Spouse!
  getCareer: Career!
  getSourceOfFund: SourceOfFund!
  getPermanentAddress: PermanentAddress!
  getWorkplaceAddress: WorkplaceAddress!
  getCurrentAddress: CurrentAddress!
  getMailingAddress: MailingAddress!
  getContact: Contact!
}

type Response {
  success: Boolean!
  message: String
  results: [ResultResponse]
}

type ResultResponse {
  code: String
  message: String
}

enum Role {
  SUPERADMIN
  OPERATION
  REVIEWER
  CLIENT
  ANONYMOUS
  ADMIN
}

type SourceOfFund {
  investmentSource: [String!]!
  investmentSourceOther: String
  investmentSourceCountry: String!
  investmentPurpose: String!
  dividendWithHoldingTax: Boolean!
}

type Spouse {
  nationalityCode: String!
  IDCardNo: String!
  isIDCardExpDate: Boolean!
  cardExpiredDate: String!
  title: String!
  fistName: String!
  lastName: String!
  pepFlag: Boolean!
}

type Todo {
  id: ID!
  text: String!
  name: String!
  done: Boolean!
  user: User!
}

type User {
  id: ID!
  name: String!
  title: String
}

type WorkplaceAddress {
  countryCode: String!
  companyName: String!
  addressNoTH: String!
  addressVillageTH: String
  floorNo: String
  unitNo: String
  moo: String
  trokSoiYaek: String
  thanon: String!
  district: String!
  districtCode: String!
  subDistrict: String!
  subDistrictCode: String!
  province: String!
  provinceCode: String!
  zipCode: String!
}


