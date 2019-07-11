import request from '../../utility/requestApi'
import { CHANGE_ROOT } from '../types'

export const requestOtp = (obj, token = null) => async dispatch => {  // Api ใช้สำหรับ OTP register และ accept  
  const url = token ? 'user/accept-term/request-otp' : 'auth/otp'
  const res = await request(url, {
    method: 'POST',
    body: token ? null : JSON.stringify(obj),
  }, token)

  if (res && res.result) {
    for (const key in res.result) {
      if (key === 'code')
        dispatch({ type: CHANGE_ROOT, key, value: { code: res.result.code, message: res.result.message } })
      else
        dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    }
    return { ...res }
  }

  for (const key in res) {
    if (key === 'code')
      dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
    else
      dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  }
  return { ...res }
}

export const acceptTerm = token => async dispatch => { // Api ใช้สำหรับ accept ก่อน OTP
  const url = 'user/accept-term'
  const res = await request(url, {
    method: 'POST',
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
  console.log(url)
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
    for (const key in res.result) {
      if (key === 'code')
        dispatch({ type: CHANGE_ROOT, key, value: { code: res.result.code, message: res.result.message } })
      else
        dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    }
    return { ...res }
  }

  for (const key in res) {
    if (key === 'code')
      dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
    else
      dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  }
  return { ...res }
}

export const requestRegister = (obj, token) => async dispatch => {
  const url = 'user/register'

  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      password: obj.password,
      ...obj,
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
      ...obj,
    }),
  }, token)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}
