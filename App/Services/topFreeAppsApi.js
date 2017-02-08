// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (url, params, baseURL='https://itunes.apple.com/hk/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getApps = () => api.get(url, params)

  return {
    getApps
  }
}

// let's return back our create method as the default.
export default {
  create
}
