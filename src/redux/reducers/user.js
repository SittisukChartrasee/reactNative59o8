import { CHANGE_USER } from '../types'

const init = {
  profile: {
    idCard: "1111111111111",
    jcNumber: '',
    expireDateFlag: '',
    isNoDocExpDate: false,
    docExpDate: '',
    gender: '',
    genderCode: '',
    titleTH: '',
    firstNameTH: '',
    lastNameTH: '',
    firstNameEN: '',
    lastNameEN: '',
    birthDay: '-/-/2532',
    yearOfBirth: '',
    monthOfBirth: '',
    dayOfBirth: '',
    martialStatus: '',
    martialStatusCode: '',
    nationality: '',
    nationalityCode: '',
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
  addressCurr: {
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
  addressWork: {
    countryCode: '',
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
    nationalityCode: 'M',
    IDCardNo: '1111',
    marryCountry: 'bbbb',
    marryPassport: 'cccc',
    expireFlag: '',
    isIDCardExpDate: false,
    cardExpiredDate: 'bbb',
    marryExpireDate: 'eee',
    title: 'rrr',
    fistName: 'ttt',
    lastName: 'yyy',
    pepFlag: false,
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