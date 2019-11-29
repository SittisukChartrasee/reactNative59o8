import get from 'lodash/get'
import { NativeModules } from 'react-native'
import { errorMessage } from '../../utility/messages'
import request from '../../utility/requestApi'
import typeModal from '../../utility/typeModal'
import { CHANGE_ROOT } from '../types'
import { btoa } from '../../utility/btoa'

const handleTimeout = (res, dispatch) => {
  if (!res.success && res.message === 'jwt expired') {
    const modal = {
      ...typeModal[errorMessage.jwtExpired.code],
      dis: errorMessage.jwtExpired.defaultMessage,
    }
    return dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

// requestOtp :: Api ใช้สำหรับ OTP register และ accept
export const requestOtp = (obj, { token = null, currFlowUP }) => async dispatch => {

  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/request-otp'
      case 'forgetPasscode': return 'user/forgot-password/request-otp'
      default:  obj.tempKey =  btoa(new Date().getTime().toString());
      return 'auth/otp'
    }
  }
  
  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {
    const res = await request(handleEndPoint(currFlowUP), {
      method: 'POST',
      body: token ? null : JSON.stringify(obj),
    }, token)

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)
    if (res) {
      for (const key in result) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: result.code, message: result.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: result[key] })
      }
      if(!res.success){
        const modal = {
          ...typeModal[res.code],
          dis: res.message,
        }
        dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
      }
    } else {
      for (const key in res) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: res[key] })
      }
    }

    return { ...res }

  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

// acceptTerm :: Api ใช้สำหรับ accept ก่อน OTP
export const acceptTerm = token => async dispatch => {
  const url = 'user/accept-term'

  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {
    const res = await request(url, {
      method: 'POST',
    }, token)

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)

    if (result) {
      for (const key in result) dispatch({ type: CHANGE_ROOT, key, value: result[key] })
    } else {
      for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
    }

    return { ...res }
  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

// velidateOtp :: Api ใช้สำหรับ OTP register และ accept
export const velidateOtp = (obj, { token = null, currFlowUP }) => async dispatch => {

  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/verify-otp'
      case 'forgetPasscode': return 'user/forgot-password/verify-otp'
      default: return 'auth/token'
    }
  }

  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {
    const res = await request(handleEndPoint(currFlowUP), {
      method: 'POST',
      body: JSON.stringify({
        trans_id: obj.trans_id,
        ref_no: obj.ref_no,
        phone_no: obj.phone_no,
        secret: obj.secret,
      }),
    }, token)

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)

    if (result) {
      for (const key in result) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: result.code, message: result.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: result[key] })
      }
    } else {
      for (const key in res) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: res[key] })
      }
    }

    return { ...res }
  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

export const confirmPasscode = (obj, { token, currFlowUP }) => async dispatch => {

  const handleEndPoint = currFlow => {
    switch (currFlow) {
      case 'updatePasscode': return 'user/accept-term/update-passcode'
      case 'forgetPasscode': return 'user/forgot-password/reset-passcode'
      default: return 'user/register'
    }
  }

  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {
    const res = await request(handleEndPoint(currFlowUP), {
      method: 'POST',
      body: JSON.stringify({
        password: obj.password,
        ...obj,
      }),
    }, token)

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)

    if (result) {
      for (const key in result) dispatch({ type: CHANGE_ROOT, key, value: result[key] })
    } else {
      for (const key in res) dispatch({ type: CHANGE_ROOT, key, value: res[key] })
    }

    return { ...res }
  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

export const requestLogin = (obj, token) => async dispatch => {
  const url = 'auth/login'

  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {
    const res = await request(url, {
      method: 'POST',
      body: JSON.stringify({
        token: obj.userToken,
        passcode: obj.password,
        ...obj,
      }),
    }, token)

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)

    if (result) {
      for (const key in result) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: result.code, message: result.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: result[key] })
      }
    } else {
      for (const key in res) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: res[key] })
      }
    }

    return { ...res }
  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}

export const forgotPasscode = (obj) => async dispatch => {
  const url = 'user/forgot-password'

  dispatch({ type: CHANGE_ROOT, key: 'loading', value: true })

  try {

    const res = await request(url, {
      method: 'POST',
      body: JSON.stringify({
        user_token: obj.user_token,
        id_card: obj.id_card,
      }),
    })

    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    handleTimeout(res, dispatch)

    const result = get(res, 'result', null)

    if (result) {
      for (const key in result) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: result.code, message: result.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: result[key] })
      }
    } else {
      for (const key in res) {
        if (key === 'code')
          dispatch({ type: CHANGE_ROOT, key, value: { code: res.code, message: res.message } })
        else
          dispatch({ type: CHANGE_ROOT, key, value: res[key] })
      }
    }

    return { ...res }
  } catch (error) {
    dispatch({ type: CHANGE_ROOT, key: 'loading', value: false })

    const modal = {
      ...typeModal[errorMessage.requestError.code],
      dis: errorMessage.requestError.defaultMessage,
    }
    dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }
}
