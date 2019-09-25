import {
  tomorrowDate,
  convertDate,
  formatDate,
  getOfBirth,
  getStatusGender,
  getStatusGender_reverse,
  getStatusMartial,
  getStatusMartial_reverse,
  getStatusChild,
  getStatusChild_reverse,
  formatIdCard,
  formatPhoneNumber,
  replaceSpace,
  fontToLower,
  replaceJsCard,
  handleSizing
} from '../helper'
import MockDate from 'mockdate'

it('tomorrowDate test', () => {
  MockDate.set('2019-09-17')
  expect(tomorrowDate()).toEqual([2562, 'กันยายน', 18])
})

it('convertDate test', () => {
  MockDate.set('2019-09-17')
  expect(convertDate('17-กันยายน-2562')).toEqual(new Date('2562-09-17T00:00:00.000Z'))
})

it('formatDate test', () => {
  MockDate.set('2019-09-17')
  expect(formatDate('2562-09-17')).toEqual('17-กันยายน-2562')
})

it('getOfBirth test', () => {
  expect(getOfBirth('17/กันยายน/2562', 'day')).toEqual('17')
  expect(getOfBirth('17/กันยายน/2562', 'month')).toEqual('9')
  expect(getOfBirth('17/กันยายน/2562', 'year')).toEqual('2562')
  expect(getOfBirth('17/กันยายน/2562', '')).toEqual(null)
  expect(getOfBirth('17/9/2562', 'month')).toEqual('-')
})

it('getStatusGender test', () => {
  expect(getStatusGender('ชาย')).toEqual('M')
  expect(getStatusGender('หญิง')).toEqual('F')
  expect(getStatusGender()).toEqual('O')
})

it('getStatusGender_reverse test', () => {
  expect(getStatusGender_reverse('M')).toEqual('ชาย')
  expect(getStatusGender_reverse('F')).toEqual('หญิง')
  expect(getStatusGender_reverse()).toEqual('O')  
})

it('getStatusMartial test', () => {
  expect(getStatusMartial('หย่าร้าง')).toEqual('D')
  expect(getStatusMartial('สมรส')).toEqual('M')
  expect(getStatusMartial('สมรสไม่จดทะเบียน')).toEqual('N')
  expect(getStatusMartial('สมรสจดทะเบียน')).toEqual('R')
  expect(getStatusMartial('แยกกันอยู่')).toEqual('S')
  expect(getStatusMartial('โสด')).toEqual('U')
  expect(getStatusMartial('หม้าย')).toEqual('W')
  expect(getStatusMartial()).toEqual('O')  
})

it('getStatusMartial_reverse test', () => {
  expect(getStatusMartial_reverse('D')).toEqual('หย่าร้าง')
  expect(getStatusMartial_reverse('M')).toEqual('สมรส')
  expect(getStatusMartial_reverse('N')).toEqual('สมรสไม่จดทะเบียน')
  expect(getStatusMartial_reverse('O')).toEqual('อื่นๆ')
  expect(getStatusMartial_reverse('R')).toEqual('สมรสจดทะเบียน')
  expect(getStatusMartial_reverse('S')).toEqual('แยกกันอยู่')
  expect(getStatusMartial_reverse('U')).toEqual('โสด')
  expect(getStatusMartial_reverse('W')).toEqual('หม้าย')
  expect(getStatusMartial_reverse()).toEqual('-')  
})

it('getStatusChild test', () => {
  expect(getStatusChild('มี')).toEqual(true)
  expect(getStatusChild('ไม่มี')).toEqual(false)
  expect(getStatusChild()).toEqual(false)  
})

it('getStatusChild_reverse test', () => {
  expect(getStatusChild_reverse('มี')).toEqual(true)
  expect(getStatusChild_reverse('ไม่มี')).toEqual(false)
  expect(getStatusChild_reverse()).toEqual(false)  
})

it('formatIdCard test', () => {
  expect(formatIdCard('2145543845389')).toEqual('2 1455 43845 38 9')
  expect(formatIdCard()).toEqual(null)
})

it('formatPhoneNumber test', () => {
  expect(formatPhoneNumber('0801112222')).toEqual('080 111 2222')
  expect(formatPhoneNumber()).toEqual(null)
})

it('replaceSpace test', () => {
  expect(replaceSpace('  data  ')).toEqual('data')
  expect(replaceSpace('')).toEqual('')
})

it('fontToLower test', () => {
  expect(fontToLower('DATA')).toEqual('data')
  expect(fontToLower('daTA')).toEqual('data')
  expect(fontToLower('data')).toEqual('data')
  expect(fontToLower('')).toEqual('')
})

it('replaceJsCard test', () => {
  expect(replaceJsCard('  data  ')).toEqual('DATA')
  expect(replaceJsCard('  DATA  ')).toEqual('DATA')
  expect(replaceJsCard('')).toEqual('')
})

it('handleSizing test', () => {
  expect(handleSizing(568)).toEqual({ width: 128, height: 93 })
  expect(handleSizing(667)).toEqual({ width: 176, height: 128 })
  expect(handleSizing()).toEqual({})
})
