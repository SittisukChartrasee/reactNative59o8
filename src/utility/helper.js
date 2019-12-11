import { Dimensions, PixelRatio, Platform } from 'react-native'
import isEmpty from 'lodash/isEmpty'

export const month = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
]

export const tomorrowDate = () => {
  const day = new Date()
  const nextDay = new Date()
  nextDay.setDate(day.getDate() + 1)
  const defaultDate = [
    nextDay.getFullYear() + 543,
    month[nextDay.getMonth()],
    nextDay.getDate(),
  ]
  return defaultDate
}

export const convertDate = (date) => {
  const splitDate = date.split('-')
  const convert = `${splitDate[2]}-${(month.indexOf(splitDate[1]) + 1).toString().padStart(2, '00')}-${splitDate[0].toString().padStart(2, '00')}`
  return new Date(convert)
}

export const formatDate = date => {
  const prvDate = new Date(date)
  const convert = `${prvDate.getDate()}-${month[prvDate.getMonth()]}-${prvDate.getFullYear()}`
  return convert
}

export const getOfBirth = (date, type) => {
  const splitDate = date.split('/')
  switch (type) {
    case 'day': return splitDate[0]
    case 'month': return month.indexOf(splitDate[1]) !== -1 ? `${month.indexOf(splitDate[1]) + 1}` : '-'
    case 'year': return splitDate[2]
    default: return null
  }
}

export const getStatusGender = (data) => {
  switch (data) {
    case 'ชาย': return 'M'
    case 'หญิง': return 'F'
    default: return 'O'
  }
}

export const getStatusGender_reverse = (data) => {
  switch (data) {
    case 'M': return 'ชาย'
    case 'F': return 'หญิง'
    default: return 'O'
  }
}

export const getStatusMartial = (data) => {
  switch (data) {
    case 'หย่าร้าง': return 'D'
    case 'สมรส': return 'M'
    case 'สมรสไม่จดทะเบียน': return 'N'
    case 'สมรสจดทะเบียน': return 'R'
    case 'แยกกันอยู่': return 'S'
    case 'โสด': return 'U'
    case 'หม้าย': return 'W'
    default: return 'O'
  }
}

export const getStatusMartial_reverse = (data) => {
  if (data === 'D') return 'หย่าร้าง'
  else if (data === 'M') return 'สมรส' /* สมรส (ไม่ระบุ) **/
  else if (data === 'N') return 'สมรสไม่จดทะเบียน'
  else if (data === 'O') return 'อื่นๆ'
  else if (data === 'R') return 'สมรสจดทะเบียน'
  else if (data === 'S') return 'แยกกันอยู่'
  else if (data === 'U') return 'โสด'
  else if (data === 'W') return 'หม้าย'
  else return '-'
}

export const getStatusChild = (data) => {
  switch (data) {
    case 'มี': return true
    case 'ไม่มี': return false
    default: return false
  }
}

export const getStatusChild_reverse = (data) => {
  switch (data) {
    case 'มี': return true
    case 'ไม่มี': return false
    default: return false
  }
}

export const formatIdCard = (idCard) => {
  const cleaned = ('' + idCard).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})$/)
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}` : null
}

export const formatHomeNumber = (homeNumberString) => {
  const number = homeNumberString.split('#')

  if (number.length === 2) {
    const cleaned = ('' + number[0]).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/)
    if (!isEmpty(number[0])) {
      return { homePhone: match ? `${match[1]} ${match[2]} ${match[3]}` : '', homePhoneExt: number[1] }
    } else {
      return { homePhone: '', homePhoneExt: '' }
    }
  } else if (number.length === 1) {
    const cleaned = ('' + number[0]).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/)
    return { homePhone: match ? `${match[1]} ${match[2]} ${match[3]}` : '', homePhoneExt: '' }
  }
}


export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `${match[1]} ${match[2]} ${match[3]}` : null
}

export const replaceSpace = (data) => data.trim().replace(/\s/g, '')

export const fontToLower = (data) => data.trim().toLowerCase()

export const replaceJsCard = (data) => data ? data.trim().replace(/\-/g, '').toUpperCase() : ''

export const handleSizing = heightScreen => {
  let sizing = {}
  if (heightScreen <= 568) {
    sizing = { width: 128, height: 93 }
  } else if (heightScreen <= 667) { // iphone 6, 6s, 7, 7s
    sizing = { width: 176, height: 128 }
  }
  return sizing
}

export const handleFontSize = heightScreen => {
  if (heightScreen <= 568) {
    return 12
  } else if (heightScreen <= 667) { // iphone 6, 6s, 7, 7s
    return 14
  }
  return 18
}