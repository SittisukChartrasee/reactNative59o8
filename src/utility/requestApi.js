import ENV from '../config/env'

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
    const res = await fetch(`${ENV.API_PATH_SIT}/${url}`, allOption) // SIT
    // const res = await fetch(`${ENV.API_PATH_UAT}/${url}`, allOption) // UAT
=======
    const res = await fetch(`${ENV.API_PATH_UAT}/${url}`, allOption) // SIT
>>>>>>> c9761462894acdb7c33a1fca72bf9d7c52ea9ad2
    return await res.json()
  } catch (err) {
    throw err
  }
}
