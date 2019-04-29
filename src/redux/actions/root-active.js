import request from '../../utility/requestApi'
import { CHANGE_ROOT } from '../types'

export const requestOtp = (obj) => async dispatch => {
  const url = 'auth/otp'
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      id_card: obj.idCard,
      phone_no: obj.mobilePhone,
      email: obj.email,
    }),
  })

  if (res.success) {
    const {
      phone_no,
      ref_no,
      trans_id
    } = res.result
    dispatch({ type: CHANGE_ROOT, key: 'phone_no', value: phone_no })
    dispatch({ type: CHANGE_ROOT, key: 'ref_no', value: ref_no })
    dispatch({ type: CHANGE_ROOT, key: 'trans_id', value: trans_id })
    return res
  }
  return res
}

export const velidateOtp = (obj) => async dispatch => {
  const url = 'auth/token'
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      trans_id: obj.trans_id,
      ref_no: obj.ref_no,
      phone_no: obj.phone_no,
      secret: obj.secret,
    }),
  })

  console.log('objobjobj', obj)

  // if (res.success) {
  //   const {
  //     phone_no,
  //     ref_no,
  //     trans_id
  //   } = res.result
  //   // dispatch({ type: CHANGE_ROOT, key: 'phone_no', value: phone_no })
  //   // dispatch({ type: CHANGE_ROOT, key: 'ref_no', value: ref_no })
  //   // dispatch({ type: CHANGE_ROOT, key: 'trans_id', value: trans_id })
  //   return res
  // }
  return res
}