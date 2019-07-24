import ENV from '../config/env'
import { onStore } from '../redux/store'

export default async (url, options, verifytoken) => {
  let allOption
  if (options.method !== 'GET') {
    allOption = {
      ...options,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        ...(token => ((token) ? ({
          Authorization: token ? `Bearer ${token}` : '',
        }) : {}))(verifytoken),
      },
    }
  } else allOption = { ...options }

  try {
    // const res = await fetch(`${ENV.API_PATH_SIT}/${url}`, allOption) // SIT
    const res = await fetch(`${ENV[onStore.getState().root.env]}/${url}`, allOption) // UAT
    return await res.json()
  } catch (err) {
    throw err
  }
}
