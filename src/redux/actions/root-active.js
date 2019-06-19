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

  if (res) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }
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

  if (res) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }
}

export const requestRegister = (obj, token) => async dispatch => {
  const url = 'user/register'

  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      password: obj.password,
    }),
  }, token)

  if (res) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }
}

export const requestLogin = (obj, token) => async dispatch => {
  const url = 'auth/login'

  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      token: obj.userToken,
      passcode: obj.password,
    }),
  }, token)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}

export const requestOtpAccept = (obj, token) => async dispatch => {
  const url = 'user/accept-term'
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      accept_term: obj.accept_term
    }),
  }, token)

  if (res) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }
}

export const velidateOtpAccept = (obj, token) => async dispatch => {
  const url = 'user/accept-term/verify-otp'
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      trans_id: obj.trans_id,
      ref_no: obj.ref_no,
      phone_no: obj.phone_no,
      secret: obj.secret,
    }),
  }, token)

  if (res) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }
}