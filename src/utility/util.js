// This is a simple masked text (normal text and input text) component
import { forEach, find, map, parseInt, last } from 'lodash'

export function cleanNumber(text) {
  return text.replace(/\D/g, '')
}

export function cleanEmail(text) {
  return text.replace(/[^a-zA-Z0-9_@.]/g, '')
}

export function cleanThaiName(text) {
  return text.replace(/[^ก-๙\s\.]/g, '').trim()
}

export function ThaiNameForSort(text) {
  return text.replace(/^[ไใโเแ]/, '')
}

function replaceRealTime(text, format, limit) {
  let replace = ''
  forEach(text, (char, index) => {
    if (index == limit) { return replace }
    let item = find(format, spec => spec.index == index)
    if (item) {
      replace += (item.char + char)
    } else {
      replace += char
    }
  })
  return replace
}

export const maskedFormat = ({ value, format, limit, field }) => {

  const strToNumber = textNumber => {

    let numberToStr = ''
    const checkNumber = map(cleanNumber(textNumber), parseInt)

    if (field === 'mobilePhone' && textNumber.length >= 10) {
      return textNumber.slice(0, 10).trim()
    } else if (field === 'homePhone' && textNumber.length >= 9) {
      return textNumber.slice(0, 9).trim()
    }

    if (textNumber.length >= 13 && !isNaN(last(textNumber))) {
      return textNumber.slice(0, 13).trim()
    }

    checkNumber.map((num, index) => {
      if (isNaN(last(checkNumber))) {
        if (index < checkNumber.length - 1) {
          return numberToStr += num
        }
      } else {
        return numberToStr += num
      }
    })

    return numberToStr
  }

  try {
    const text = value.trim().replace(/\s/g, '')

    if (text.length < 1) {
      return ''
    } else if (field === 'mobilePhone' && text.length === 1) {
      if (text !== '0') return '0'
    } else {
      const ans = strToNumber(text)
      return replaceRealTime(ans, format, limit)
    }
  } catch (error) {
    return ''
  }
}
