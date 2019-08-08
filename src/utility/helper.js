import { Dimensions, PixelRatio, Platform } from 'react-native'

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

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `${match[1]} ${match[2]} ${match[3]}` : null
}

export const replaceSpace = (data) => data.trim().replace(/\s/g, '')

export const fontToLower = (data) => data.trim().toLowerCase()

export const replaceJsCard = (data) => data ? data.trim().replace(/\-/g, '').toUpperCase() : ''

export const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width
  const elemWidth = parseFloat(widthPercent)
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100)
}

export const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height
  const elemHeight = parseFloat(heightPercent)
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100)
}

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
  let sizeFont = { TLight: 16, TBold: 16, navBar: 28, margin: 16, }
  if (heightScreen <= 568) {
    sizeFont = { TLight: 12, TBold: 12, navBar: 20, margin: 6, }
  } else if (heightScreen <= 667) {
    sizeFont = { TLight: 14, TBold: 14, navBar: 24, margin: 10, }
  } else {
    sizeFont = { TLight: 16, TBold: 16, navBar: 28, margin: 16, }
  }
  return sizeFont
}
