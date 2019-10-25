import throttle from 'lodash/throttle'
import ENV from '../config/env'
import { onStore } from '../redux/store'

export default throttle(async (url, options, verifytoken) => {

  // application version from NativeModules 
  const appVersion = onStore.getState().root.version
  let allOption
  if (options.method !== 'GET') {
    allOption = {
      ...options,
      headers: {
        'app-version': appVersion,
        Accept: 'application/json',
        // 'Content-Type': 'application/json', // ห้ามใช้
        ...(token => ((token) ? ({
          Authorization: token ? `Bearer ${token}` : '',
        }) : {}))(verifytoken),
      },
    }
  } else allOption = { ...options }

  const res = await fetch(`${ENV[onStore.getState().root.env]}/${url}`, allOption)

  return await res.json()

}, 500)
