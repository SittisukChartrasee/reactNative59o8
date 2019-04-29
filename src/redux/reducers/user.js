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
    birthDay: '',
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
    district: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    province: '',
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
    district: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    province: '',
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
    district: '',
    districtCode: '',
    subDistrict: '',
    subDistrictCode: '',
    province: '',
    provinceCode: '',
    zipCode: '',
  },
  contact: {
    workPhone: '',
    homePhone: '',
    mobilePhone: "0830015610",
    email: "b@b.com"
  },
  spouse: {
    nationFlag: '',
    nationalityCode: '',
    IDCardNo: '',
    marryCountry: '',
    marryPassport: '',
    expireFlag: '',
    isIDCardExpDate: false,
    cardExpiredDate: '',
    marryExpireDate: '',
    title: '',
    fistName: '',
    lastName: '',
    pepFlag: '',
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