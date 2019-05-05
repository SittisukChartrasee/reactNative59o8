import { CHANGE_USER } from '../types'

const init = {
  profile: {
    idCard: '1840100464891',
    jcNumber: 'ME1122454670',
    expireDateFlag: 'Fri Jan 01 2562 00:00:00 GMT+0700 (+07)',
    isNoDocExpDate: false,
    docExpDate: '1-มกราคม-2562',
    gender: 'ชาย',
    // genderCode: 'M',
    titleTH: 'นาย',
    firstNameTH: 'หกด',
    lastNameTH: 'หกด',
    firstNameEN: 'asdf',
    lastNameEN: 'fa',
    birthDay: '-/-/2532',
    yearOfBirth: '2532',
    monthOfBirth: '4',
    dayOfBirth: '4',
    martialStatus: 'โสด',
    // martialStatusCode: 'U',
    nationality: 'ไทย',
    nationalityCode: 'TH',
  },
  addressDoc: {
    country: '',
    countryCode: '',
    addressNoTH: '',
    moo: '',
    addressVillageTH: '',
    floorNo: '',
    trokSoiYaek: '',
    thanon: '',
    districtNameTH: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    provinceNameTH: '',
    provinceCode: '',
    zipCode: '',
  },
  addressHome: {
    country: '',
    countryCode: 'TH',
    countryRisk: false,
    addressNoTH: '',
    moo: '',
    addressVillageTH: '',
    floorNo: '',
    trokSoiYaek: '',
    thanon: '',
    districtNameTH: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    provinceNameTH: '',
    provinceCode: '',
    zipCode: '',
  },
  addressCurr: {
    country: '',
    countryCode: 'TH',
    addressNoTH: '',
    moo: '',
    addressVillageTH: '',
    floorNo: '',
    trokSoiYaek: '',
    thanon: '',
    districtNameTH: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    provinceNameTH: '',
    provinceCode: '',
    zipCode: '',
  },
  addressWork: {
    countryCode: 'TH',
    companyName: '',
    addressNoTH: '',
    addressVillageTH: '',
    floorNo: '',
    moo: '',
    trokSoiYaek: '',
    thanon: '',
    districtNameTH: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    provinceNameTH: '',
    provinceCode: '',
    zipCode: '',
  },
  contact: {
    workPhone: '',
    homePhone: '',
    mobilePhone: "0830015610",
    email: "b@b.com"
  },
  career: {
    busType: '',
    isicCode: '',
    occupation: '',
    occupationCode: '',
    incomeRange: '',
    incomeRangeCode: '',
    countrySourceOfIncome: '',
  },
  spouse: {
    nationFlag: '',
    IDCardNo: '1111',
    marryPassport: 'cccc',
    marryCountry: 'อังกฤษ',
    nationalityCode: 'TH',
    nationalityRisk: false,
    expireFlag: '',
    isIDCardExpDate: false,
    cardExpiredDate: '1-มกราคม-2562',
    marryExpireDate: '1-มกราคม-2562',
    title: 'rrr',
    fistName: 'ttt',
    lastName: 'yyy',
    pepFlag: false,
  },
  sourceOfFund: {
    investmentSource: ['gf', 'dd'],
    investmentSourceOther: 'a',
    investmentSourceCountry: 'b',
    investmentPurpose: 'c',
    dividendWithHoldingTax: false,
  }
}

export default (state = init, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}