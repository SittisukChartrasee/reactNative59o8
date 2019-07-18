import { NavigationActions } from 'react-navigation'
import request from '../../utility/requestApi'
import { CHANGE_ROOT } from '../types'

const handleTimeout = (res, dispatch) => {
  if (!res.success && res.message === 'jwt expired') {
    const modal = {
      dis: `ท่านไม่ได้ทำรายการใดๆ เกินระยะเวลาที่\nกำหนด กรุณาเข้าสู่ระบบใหม่อีกครั้ง`,
      visible: true,
      onPress: () => {
        dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false } })
        dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
      },
      onPressClose: () => {
        dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false } })
        dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
        dispatch(NavigationActions.navigate({ routeName: 'welcome' }))
      },
    }
    return dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

export const requestOtp = (obj, { token = null, currFlowUP }) => async dispatch => {  // Api ใช้สำหรับ OTP register และ accept  
  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/request-otp'
      case 'forgetPasscode': return 'user/forgot-password/request-otp'
      default: return 'auth/otp'
    }
  }

  const res = await request(handleEndPoint(currFlowUP), {
    method: 'POST',
    body: token ? null : JSON.stringify(obj),
  }, token)

  handleTimeout(res, dispatch)

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

  handleTimeout(res, dispatch)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}

export const velidateOtp = (obj, { token = null, currFlowUP }) => async dispatch => { // Api ใช้สำหรับ OTP register และ accept
  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/verify-otp'
      case 'forgetPasscode': return 'user/forgot-password/verify-otp'
      default: return 'auth/token'
    }
  }

  const res = await request(handleEndPoint(currFlowUP), {
    method: 'POST',
    body: JSON.stringify({
      trans_id: obj.trans_id,
      ref_no: obj.ref_no,
      phone_no: obj.phone_no,
      secret: obj.secret,
    }),
  }, token)

  handleTimeout(res, dispatch)

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

export const confirmPasscode = (obj, { token, currFlowUP }) => async dispatch => {
  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/update-passcode'
      case 'forgetPasscode': return 'user/forgot-password/reset-passcode'
      default: return 'user/register'
    }
  }

  const res = await request(handleEndPoint(currFlowUP), {
    method: 'POST',
    body: JSON.stringify({
      password: obj.password,
      ...obj,
    }),
  }, token)

  handleTimeout(res, dispatch)

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

  handleTimeout(res, dispatch)

  if (res && res.result) {
    for (const key in res.result) dispatch({ type: CHANGE_ROOT, key, value: res.result[key] })
    return { ...res }
  }

  for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
  return { ...res }
}

export const forgotPasscode = (obj) => async dispatch => {
  const url = 'user/forgot-password'

  const res = await request(url, {
    method: 'POST',
    body: JSON.stringify({
      user_token: obj.user_token,
      id_card: obj.id_card,
    }),
  })

  handleTimeout(res, dispatch)

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
