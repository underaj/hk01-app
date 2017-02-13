// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (url, baseURL='https://itunes.apple.com/hk/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    }
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.

  const getApps = () => api.get(url)
  const getApp = () => api.get(url)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //

  return {
    getApps,
    getApp
  }
}

// let's return back our create method as the default.
export default {
  create
}
