import {
  validateEmail,
  validateIdentityCard,
  validateIdentityJcNumber,
  validateIdentityEngLanguage,
  validateIdentityThaiLanguage,
  validatePhoneNumber,
  RequiredFields,
} from '../validation'

describe('validateEmail', () => {
  it('validateEmail success', () => {
    expect(validateEmail('test@test.com')).toEqual(true)
  })
  it('validateEmail fail', () => {
    expect(validateEmail()).toEqual(false)
  })
})

describe('validateIdentityCard', () => {
  it('validateIdentityCard success', () => {
    expect(validateIdentityCard('2145543845389')).toEqual(true)
  })
  it('validateIdentityCard fail', () => {
    expect(validateIdentityCard('214554384538')).toEqual(false)
  })
  it('case null', () => {
    expect(validateIdentityCard()).toEqual(false)    
  })
})


describe('validateIdentityJcNumber', () => {
  it('validateIdentityJcNumber success', () => {
    expect(validateIdentityJcNumber('me1122454670')).toEqual(true)
  })
  it('validateIdentityJcNumber wrong fomat', () => {
    expect(validateIdentityJcNumber('me112245467')).toEqual(false)
  })
  it('validateIdentityJcNumber fail', () => {
    expect(validateIdentityJcNumber()).toEqual(false)
  })
})

describe('validateIdentityEngLanguage', () => {
  it('validateIdentityEngLanguage success', () => {
    expect(validateIdentityEngLanguage('abcdefg')).toEqual(true)
  })
  it('validateIdentityEngLanguage fail', () => {
    expect(validateIdentityEngLanguage('กขคง')).toEqual(false)
  })
  it('validateIdentityEngLanguage null', () => {
    expect(validateIdentityEngLanguage()).toEqual(true)
  })
})

describe('validateIdentityThaiLanguage', () => {
  it('validateIdentityThaiLanguage success', () => {
    expect(validateIdentityThaiLanguage('กขคง')).toEqual(true)    
  })
  it('validateIdentityThaiLanguage fail', () => {
    expect(validateIdentityThaiLanguage('abcdefg')).toEqual(false)
  })
  it('validateIdentityThaiLanguage null', () => {
    expect(validateIdentityThaiLanguage()).toEqual(false)
  })
})

describe('validatePhoneNumber', () => {
  it('validatePhoneNumber success', () => {
    expect(validatePhoneNumber('0801112222')).toEqual(true)
  })
  it('validatePhoneNumber fail', () => {
    expect(validatePhoneNumber('080111')).toEqual(false)
  })
  it('validatePhoneNumber null', () => {
    expect(validatePhoneNumber()).toEqual(false)
  })
})

describe('RequiredFields', () => {
  it('RequiredFields success', () => {
    expect(RequiredFields('asdfghjklqwer')).toEqual(true)
  })
  it('RequiredFields fail', () => {
    expect(RequiredFields(undefined)).toEqual(false)
    expect(RequiredFields(null)).toEqual(false)
    expect(RequiredFields()).toEqual(false)
  })
})