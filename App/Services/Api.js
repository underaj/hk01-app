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

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).

  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

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
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.

  return {
    getApps,
    getApp
  }
}

// let's return back our create method as the default.
export default {
  create
}
