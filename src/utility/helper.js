const month = [
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

export const getOfBirth = (date, type) => {
  const splitDate = date.split('/')
  switch (type) {
    case 'day': return splitDate[0]
    case 'month': return `${month.indexOf(splitDate[1]) + 1}`
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

export const replaceSpace = (data) => data.trim().replace(/\s/g, '')

export const fontToLower = (data) => data.trim().toLowerCase()

export const replaceJsCard = (data) => data ? data.trim().replace(/\-/g, '').toUpperCase() : ''
