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

export const convertDate = (date) => {
  const splitDate = date.split('-')
  const convert = `${splitDate[0]}-${month.indexOf(splitDate[1]) + 1}-${splitDate[2]}`
  return new Date(convert)
}

export const getOfBirth = (date, type) => {
  const splitDate = date.split('/')
  switch (type) {
    case 'day':
      return splitDate[0]
    case 'month':
      return `${month.indexOf(splitDate[1]) + 1}`
    case 'year':
      return splitDate[2]
    default:
      return null
  }
}