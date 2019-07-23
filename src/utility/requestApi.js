import ENV from '../config/env'
import { onStore } from '../redux/store'

export default async (url, options, verifytoken) => {
  let allOption
  if (options.method !== 'GET') {
    allOption = {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token => ((token) ? ({
          Authorization: token ? `Bearer ${token}` : '',
        }) : {}))(verifytoken),
      },
    }
  } else allOption = { ...options }

  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const res = await fetch(`${ENV.API_PATH_SIT}/${url}`, allOption) // SIT
    // const res = await fetch(`${ENV.API_PATH_UAT}/${url}`, allOption) // UAT
=======
    const res = await fetch(`${ENV.API_PATH_UAT}/${url}`, allOption) // SIT
>>>>>>> c9761462894acdb7c33a1fca72bf9d7c52ea9ad2
=======
    // const res = await fetch(`${ENV.API_PATH_SIT}/${url}`, allOption) // SIT
    const res = await fetch(`${ENV[onStore.getState().root.env]}/${url}`, allOption) // UAT
>>>>>>> 8a3d5e12e3e23cba6a3dfd0d19cee1fb4f8e6bbc
    return await res.json()
  } catch (err) {
    throw err
  }
}
