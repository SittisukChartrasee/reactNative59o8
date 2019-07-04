export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const validateIdentityCard = text => {
  const re = /^[0-9]{13}$/
  return re.test(String(text))
}

export const validateIdentityJcNumber = text => {
  const re = /^[a-zA-z0-9]{12}$/
  return re.test(String(text))
}

export const validateIdentityEngLanguage = text => {
  const re = /^[a-z]+$/
  return re.test(String(text))
}

export const validateIdentityThaiLanguage = text => {
  const re = /^[ก-๙]+$/
  return re.test(String(text))
}

export const validatePhoneNumber = text => {
  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  return re.test(String(text))
}

export const RequiredFields = val => {
  return val !== '' && val !== null && val !== undefined
}

