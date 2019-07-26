import { CHANGE_USER } from '../types'
import { tomorrowDate } from '../../utility/helper'

const init = {
  profile: {
    idCard: '',
    jcNumber: '',
    expireDateFlag: 'มีวันหมดอายุ',
    isNoDocExpDate: false,
    docExpDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
    gender: '',
    titleTH: '',
    firstNameTH: '',
    lastNameTH: '',
    firstNameEN: '',
    lastNameEN: '',
    birthDay: `-/-/${tomorrowDate()[0] - 20}`,
    yearOfBirth: `${tomorrowDate()[0] - 20}`,
    monthOfBirth: '4',
    dayOfBirth: '4',
    martialStatus: '',
    isChild: 'ไม่มี',
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
    countryCode: '',
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
    mobilePhone: '',
    email: ''
  },
  career: {
    busType: '',
    busType_other: '',
    isicCode: '',
    occupation: '',
    occupation_other: '',
    occupationCode: '',
    incomeRangeCode: '',
    countrySourceOfIncome: '',
    countyCode: '',
  },
  spouse: {
    nationFlag: 'ไทย',
    IDCardNo: '',
    marryPassport: '',
    marryCountry: '',
    nationalityCode: '',
    nationalityRisk: false,
    expireFlag: '',
    marryIsIDCardExpDate: true,
    isIDCardExpDate: false,
    cardExpiredDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
    marryExpireDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
    title: '',
    fistName: '',
    lastName: '',
    pepFlag: null, // ครั้งแรกที่เข้าหน้า คู่สมรส ปุ่มถัดไปจะไม่สามารถกดได้ เลยใช้ null เป็นค่าเริ่มต้น
  },
  child: {
    firstTitle: '',
    firstFirstName: '',
    firstLastName: '',
    firstBirthDay: `-/-/${tomorrowDate()[0]}`,
    firstDocNo: '',
    firstExpireDateFlag: 'มีวันหมดอายุ',
    firstDocExpDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
    secondTitle: '',
    secondFirstName: '',
    secondLastName: '',
    secondBirthDay: `-/-/${tomorrowDate()[0]}`,
    secondDocNo: '',
    secondExpireDateFlag: 'มีวันหมดอายุ',
    secondDocExpDate: `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
    inVisibleSecond: true,
    inVisible: false,
  },
  sourceOfFund: {
    investmentSource: [],
    investmentSourceOther: '',
    investmentSourceCountry: '',
    investmentPurpose: '',
    investmentPurposeOther: '',
    dividendWithHoldingTax: false,
    nationalityCode: ''
  },
  bank: {
    bankName: '',
    urlbank: '',
  },
  fraud: {
    choice: [
      {
        title: 'ท่านมีประวัติความผิดกฎหมายฟอกเงินย้อนหลังภายใน 3 ปีหรือไม่',
        choice: ['ใช่', 'ไม่ใช่']
      },
      {
        title: 'ท่านเป็นนักการเมือง มีความเกี่ยวข้องกับนักการเมือง หรือบุคคลที่มีสถานภาพทางการเมือง ใช่หรือไม่',
        choice: ['ใช่', 'ไม่ใช่']
      }
    ],
    sumChoice: 0,
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