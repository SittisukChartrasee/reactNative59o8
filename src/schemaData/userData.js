import get from 'lodash/get'
import {
  formatDate,
  formatIdCard,
  formatHomeNumber,
  formatPhoneNumber,
  getStatusGender_reverse,
  getStatusMartial_reverse,
  month,
  tomorrowDate
} from '../utility/helper'

export const userDataToProps = ({
  result,
  updateUser,
  updateFatca,
  updateSuittest,
  userProps,
  fatcaProps,
  suittestProps
}) => {

  const identity = get(result, 'identity', null)
  if (identity) {

    updateUser('profile', {
      ...userProps.profile,
      isNoDocExpDate: identity.isNoDocExpDate,
      expireDateFlag: identity.isNoDocExpDate ? 'ไม่มีวันหมดอายุ' : 'มีวันหมดอายุ',
      docExpDate: identity.isNoDocExpDate ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : formatDate(identity.docExpDate),
      genderCode: identity.genderCode,
      gender: getStatusGender_reverse(identity.genderCode),
      titleTH: identity.titleTH,
      titleCode: identity.titleCode,
      titleGender: identity.titleGender,
      titleDetail: identity.titleDetail,
      firstNameTH: identity.firstNameTH,
      lastNameTH: identity.lastNameTH,
      firstNameEN: identity.firstNameEN,
      lastNameEN: identity.lastNameEN,
      birthDay: `${identity.dayOfBirth}/${identity.monthOfBirth !== '-' ? month[parseInt(identity.monthOfBirth) - 1] : '-'}/${identity.yearOfBirth}`,
      dayOfBirth: identity.dayOfBirth,
      monthOfBirth: identity.monthOfBirth,
      yearOfBirth: identity.yearOfBirth,
      nationalityCode: identity.nationalityCode,
      martialStatusCode: identity.martialStatusCode,
      martialStatus: getStatusMartial_reverse(identity.martialStatusCode),
      isChild: identity.isChild ? 'มี' : 'ไม่มี',
    })

  }

  const spouse = get(result, 'spouse', null)
  if (spouse) {

    updateUser('spouse', {
      ...userProps.spouse,
      nationFlag: spouse.nationalityCode === 'TH' ? 'ไทย' : 'ชาวต่างชาติ',
      IDCardNo: spouse.nationalityCode === 'TH' ? formatIdCard(spouse.IDCardNo) : '',
      marryPassport: spouse.nationalityCode === 'TH' ? '' : spouse.IDCardNo,
      marryCountry: spouse.nationality,
      nationalityCode: spouse.nationalityCode,
      isIDCardExpDate: !spouse.isIDCardExpDate,
      cardExpiredDate: spouse.isIDCardExpDate ? formatDate(spouse.cardExpiredDate) : `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
      marryExpireDate: spouse.nationalityCode === 'TH' ? `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}` : formatDate(spouse.cardExpiredDate),
      title: spouse.title,
      titleCode: spouse.titleCode,
      titleDetail: spouse.titleDetail,
      fistName: spouse.fistName,
      lastName: spouse.lastName,
      pepFlag: spouse.pepFlag,
    })

  }

  const firstChild = get(result, 'firstChild', null)
  if (firstChild) {

    const secondChild = get(result, 'secondChild', null)
    let secondC = { inVisibleSecond: true, inVisible: false }

    if (secondChild) {

      secondC = {
        secondTitle: secondChild.ChildTitleTH,
        secondTitleCode: secondChild.ChildTitleCode,
        secondTitleDetail: secondChild.ChildTitleDetail,
        secondFirstName: secondChild.ChildFirstNameTH,
        secondLastName: secondChild.ChildLastNameTH,
        secondBirthDay: `${secondChild.ChildDayOfBirth}/${secondChild.ChildMonthOfBirth !== '-' ? month[parseInt(secondChild.ChildMonthOfBirth) - 1] : '-'}/${secondChild.ChildYearOfBirth}`,
        secondDocNo: formatIdCard(secondChild.ChildDocNo),
        secondExpireDateFlag: !secondChild.ChildIsNoDocExpDate ? 'มีวันหมดอายุ' : 'ไม่มีวันหมดอายุ',
        secondDocExpDate: !secondChild.ChildIsNoDocExpDate ? formatDate(secondChild.ChildDocExpDate) : `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
        inVisibleSecond: false,
        inVisible: true
      }

    }

    updateUser('child', {
      ...userProps.child,
      firstTitle: firstChild.ChildTitleTH,
      firstTitleCode: firstChild.ChildTitleCode,
      firstTitleDetail: firstChild.ChildTitleDetail,
      firstFirstName: firstChild.ChildFirstNameTH,
      firstLastName: firstChild.ChildLastNameTH,
      firstBirthDay: `${firstChild.ChildDayOfBirth}/${firstChild.ChildMonthOfBirth !== '-' ? month[parseInt(firstChild.ChildMonthOfBirth) - 1] : '-'}/${firstChild.ChildYearOfBirth}`,
      firstDocNo: formatIdCard(firstChild.ChildDocNo),
      firstExpireDateFlag: !firstChild.ChildIsNoDocExpDate ? 'มีวันหมดอายุ' : 'ไม่มีวันหมดอายุ',
      firstDocExpDate: !firstChild.ChildIsNoDocExpDate ? formatDate(firstChild.ChildDocExpDate) : `${tomorrowDate()[2]}-${tomorrowDate()[1]}-${tomorrowDate()[0]}`,
      ...secondC
    })

  }

  const fatcas = get(result, 'fatca', null)
  if (fatcas) {

    const { fatca } = fatcaProps

    const data = [
      {
        ...fatca[0],
        answer: fatcas.isUSCitizen ? 0 : 1
      }, {
        ...fatca[1],
        answer: fatcas.isHoldingUsCard ? 0 : 1,
      }, {
        ...fatca[2],
        answer: fatcas.isUSTaxPurposes ? 0 : 1,
      }, {
        ...fatca[3],
        answer: fatcas.surrenderedUSCitizenship ? 0 : 1,
      }, {
        ...fatca[4],
        answer: fatcas.transferFundsToAccountInUS ? 0 : 1,
      }, {
        ...fatca[5],
        answer: fatcas.grantedToPersonWithUSAddress ? 0 : 1,
      }, {
        ...fatca[6],
        answer: fatcas.mailOrCareOfAddressAccountOpenedKBank ? 0 : 1,
      }, {
        ...fatca[7],
        answer: fatcas.currentOrMailingAddressAccountOpenedKbank ? 0 : 1,
      }, {
        ...fatca[8],
        answer: fatcas.isUSPhoneNo ? 0 : 1,
      }
    ]

    updateFatca('fatca', data)
  }

  const frauds = get(result, 'fraud', null)
  if (frauds) {

    const { fraud } = userProps
    const data = [
      {
        ...fraud.choice[0],
        answer: frauds.hasLaunderingRecord ? 0 : 1,
      }, {
        ...fraud.choice[1],
        answer: frauds.isPolitician ? 0 : 1,
      },
    ]

    updateUser('fraud', { choice: data })
  }

  const contact = get(result, 'contact', null)
  if (contact) {

    const data = {
      workPhone: contact.workPhone,
      homePhone: formatHomeNumber(contact.homePhone).homePhone || userProps.contact.homePhone,
      homePhoneExt: formatHomeNumber(contact.homePhone).homePhoneExt,
      mobilePhone: formatPhoneNumber(contact.mobilePhone),
      email: contact.email
    }

    updateUser('contact', data)
  }

  const suitabilitys = get(result, 'suitability', null)
  if (suitabilitys) {

    const { suittest } = suittestProps

    const suitability = [
      {
        ...suittest[0],
        answer: suitabilitys.suit01 - 1,
      }, {
        ...suittest[1],
        answer: suitabilitys.suit02 - 1,
      }, {
        ...suittest[2],
        answer: suitabilitys.suit03 - 1,
      }, {
        ...suittest[3],
        choice: [
          { ...suittest[3].choice[0], select: suitabilitys.suit04Array[0] },
          { ...suittest[3].choice[1], select: suitabilitys.suit04Array[1] },
          { ...suittest[3].choice[2], select: suitabilitys.suit04Array[2] },
          { ...suittest[3].choice[3], select: suitabilitys.suit04Array[3] },
          { ...suittest[3].choice[4], select: suitabilitys.suit04Array[4] },
        ]
      }, {
        ...suittest[4],
        answer: suitabilitys.suit05 - 1,
      }, {
        ...suittest[5],
        answer: suitabilitys.suit06 - 1,
      }, {
        ...suittest[6],
        answer: suitabilitys.suit07 - 1,
      }, {
        ...suittest[7],
        answer: suitabilitys.suit08 - 1,
      }, {
        ...suittest[8],
        answer: suitabilitys.suit09 - 1,
      }, {
        ...suittest[9],
        answer: suitabilitys.suit10 - 1,
      }, {
        ...suittest[10],
        answer: suitabilitys.suit11 - 1,
      }, {
        ...suittest[11],
        answer: suitabilitys.suit12 - 1,
      }]

    updateSuittest('suittest', suitability)
  }

  const mailingAddress = get(result, 'mailingAddress', null)
  if (mailingAddress) {

    const mailingAddressData = {
      country: mailingAddress.Country,
      countryCode: mailingAddress.CountryCode,
      addressNoTH: mailingAddress.AddressNoTH,
      moo: mailingAddress.Moo,
      addressVillageTH: mailingAddress.AddressVillageTH,
      floorNo: mailingAddress.FloorNo,
      trokSoiYaek: mailingAddress.TrokSoiYaek,
      thanon: mailingAddress.Thanon,
      districtNameTH: mailingAddress.District,
      districtCode: mailingAddress.DistrictCode,
      subDistrict: mailingAddress.SubDistrict,
      subDistrictCode: mailingAddress.SubDistrictCode,
      provinceNameTH: mailingAddress.Province,
      provinceCode: mailingAddress.ProvinceCode,
      zipCode: mailingAddress.ZipCode,
    }

    updateUser('addressDoc', mailingAddressData)
  }

  const currentAddress = get(result, 'currentAddress', null)
  if (currentAddress) {

    const currentAddressData = {
      country: currentAddress.Country,
      countryCode: currentAddress.CountryCode,
      addressNoTH: currentAddress.AddressNoTH,
      moo: currentAddress.Moo,
      addressVillageTH: currentAddress.AddressVillageTH,
      floorNo: currentAddress.FloorNo,
      trokSoiYaek: currentAddress.TrokSoiYaek,
      thanon: currentAddress.Thanon,
      districtNameTH: currentAddress.District,
      districtCode: currentAddress.DistrictCode,
      subDistrict: currentAddress.SubDistrict,
      subDistrictCode: currentAddress.SubDistrictCode,
      provinceNameTH: currentAddress.Province,
      provinceCode: currentAddress.ProvinceCode,
      zipCode: currentAddress.ZipCode,
    }
    updateUser('addressCurr', currentAddressData)
  }

  const workAddress = get(result, 'workAddress', null)
  if (workAddress) {

    const workAddressData = {
      country: workAddress.Country,
      countryCode: workAddress.CountryCode,
      addressNoTH: workAddress.AddressNoTH,
      moo: workAddress.Moo,
      addressVillageTH: workAddress.AddressVillageTH,
      floorNo: workAddress.FloorNo,
      trokSoiYaek: workAddress.TrokSoiYaek,
      thanon: workAddress.Thanon,
      districtNameTH: workAddress.District,
      districtCode: workAddress.DistrictCode,
      subDistrict: workAddress.SubDistrict,
      subDistrictCode: workAddress.SubDistrictCode,
      provinceNameTH: workAddress.Province,
      provinceCode: workAddress.ProvinceCode,
      zipCode: workAddress.ZipCode,
      companyName: workAddress.CompanyName,
    }

    updateUser('addressWork', workAddressData)
  }

  const permanentAddress = get(result, 'permanentAddress', null)
  if (permanentAddress) {

    const permanentAddressData = {
      country: permanentAddress.Country,
      countryCode: permanentAddress.CountryCode,
      addressNoTH: permanentAddress.AddressNoTH,
      moo: permanentAddress.Moo,
      addressVillageTH: permanentAddress.AddressVillageTH,
      floorNo: permanentAddress.FloorNo,
      trokSoiYaek: permanentAddress.TrokSoiYaek,
      thanon: permanentAddress.Thanon,
      districtNameTH: permanentAddress.District,
      districtCode: permanentAddress.DistrictCode,
      subDistrict: permanentAddress.SubDistrict,
      subDistrictCode: permanentAddress.SubDistrictCode,
      provinceNameTH: permanentAddress.Province,
      provinceCode: permanentAddress.ProvinceCode,
      zipCode: permanentAddress.ZipCode,
    }

    updateUser('addressHome', permanentAddressData)
  }

  const sourceOfFund = get(result, 'sourceOfFund', null)
  if (sourceOfFund) {

    const sourceOfFundData = {
      investmentSource: sourceOfFund.investmentSource,
      investmentSourceOther: sourceOfFund.investmentSourceOther,
      investmentSourceCountry: sourceOfFund.investmentSourceCountryDetail,
      investmentPurpose: sourceOfFund.investmentPurpose,
      investmentPurposeOther: sourceOfFund.investmentPurposeOther,
      dividendWithHoldingTax: sourceOfFund.dividendWithHoldingTax,
      nationalityCode: sourceOfFund.investmentSourceCountry
    }

    updateUser('sourceOfFund', sourceOfFundData)
  }

  const career = get(result, 'career', null)
  if (career) {

    const careerData = {
      busType: career.isic,
      busType_other: career.isicOther,
      isicCode: career.isicCode,
      occupation: career.occupation,
      occupation_other: career.occupationOther,
      occupationCode: career.occupationCode,
      incomeRangeCode: career.incomeRangeCode,
      countrySourceOfIncome: career.countrySourceOfIncomeDetail,
      countyCode: career.countrySourceOfIncome,
    }

    updateUser('career', careerData)
  }
}
