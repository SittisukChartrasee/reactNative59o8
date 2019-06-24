import request from '../../utility/requestApi'
import { CHANGE_ROOT } from '../types'

export const requestOtp = (obj, token = null, accept = null) => async dispatch => { // Api ใช้สำหรับ OTP register และ accept
  const url = token ? 'user/accept-term' : 'auth/otp'
  const data = accept && accept.accept_term !== null ? accept : obj
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}

export const velidateOtp = (obj, token = null) => async dispatch => { // Api ใช้สำหรับ OTP register และ accept
  const url = token ? 'user/accept-term/verify-otp' : 'auth/token'
  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      trans_id: obj.trans_id,
      ref_no: obj.ref_no,
      phone_no: obj.phone_no,
      secret: obj.secret,
    }),
  }, token)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}

export const requestRegister = (obj, token) => async dispatch => {
  const url = 'user/register'

  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      password: obj.password,
    }),
  }, token)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
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
