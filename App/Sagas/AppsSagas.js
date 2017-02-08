import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
// import convertFromKelvin from '../Transforms/ConvertFromKelvin'

export function * getTopFreeApps (api) {
  // make the call to the api
  const response = yield call(api.getApps)

  // success?
  if (response.ok) {
    console.tron.log({response})
    yield put(AppsActions.requestSuccess(response))
  } else {
    yield put(AppsActions.requestFailure())
  }
}
