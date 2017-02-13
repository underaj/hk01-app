// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

import ConvertFromAPI from '../Transforms/ConvertFromAPI'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestTopPaidApps: [''],
  requestTopFreeApps: [''],
  // requestAppListSuccess: ['nature'],
  requestAppListFailure: ['response'],
  requestApp: ['app'],
  requestAppSuccess: ['data'],
  requestAppFailure: ['data'],
})

export const AppsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  topPaidApps: [],
  topFreeApps: [],
  paidAppsError: false,
  freeAppsError: false,
  // receivedPaidApps: false,
  // receivedFreeApps: false,
})

/* ------------- Reducers ------------- */

const requestTopPaid = (state: Object, action: Object) =>
  state
    .set('topPaidApps', [])

const requestTopFree = (state: Object, action: Object) =>
  state.set('topFreeApps', [])

// export const appListSuccess = (state: Object, action: Object) => {
//   const { nature, entries } = action.data
//   const substate = ConvertFromAPI(entries)
//   if (nature === 'paid') {
//     return state
//       .set('topPaidApps', substate)
//       .set('paidAppsError', false)
//   }
//   if (nature === 'free') {
//     return state
//       .set('topFreeApps', substate)
//       .set('freeAppsError', false)
//   }
// }

// const appListSuccess = (state: Object, action: Object) => {
//   if (action.nature === 'paid') {
//     return state.set('receivedPaidApps', true)
//   }
//   if (action.nature === 'free') {
//     return state.set('receivedFreeApps', true)
//   }
// }

const appListFailure = (state: Object, action: Object) => {
  const { nature, response } = action.data
  if (nature === 'paid') {
    return state
      .set('paidAppsError', response)
      .set('topPaidApps', [])
  }
  if (nature === 'free') {
    return state
      .set('freeAppsError', response)
      .set('topFreeApps', [])
  }
}

const appSuccess = (state: Object, action: Object) => {
  const { nature, entry } = action.data
  const newApp = ConvertFromAPI(entry)
  if (nature === 'paid') {
    // const appList = state.get('topPaidApps').toArray()
    // appList.push(newApp)
    // return state
    //   .set('topPaidApps', appList)
    return state
      .update('topPaidApps', arr => arr.concat(newApp))
  }
  if (nature === 'free') {
    // const appList = state.get('topFreeApps').toArray()
    // appList.push(newApp)
    // return state
    //   .set('topPaidApps', appList)
    return state
      .update('topFreeApps', arr => arr.concat(newApp))
  }
}

const appFailure = (state: Object, action: Object) => {
  const { nature, key } = action.data
  if (nature === 'paid') {
    return state
      .setIn(['topPaidApps', key, 'rating'], undefined)
      .setIn(['topPaidApps', key, 'ratingCount'], undefined)
  }
  if (nature === 'free') {
    return state
      .setIn(['topFreeApps', key, 'rating'], undefined)
      .setIn(['topFreeApps', key, 'ratingCount'], undefined)
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TOP_PAID_APPS]: requestTopPaid,
  [Types.REQUEST_TOP_FREE_APPS]: requestTopFree,
  [Types.REQUEST_APP_LIST_FAILURE]: appListFailure,
  [Types.REQUEST_APP_SUCCESS]: appSuccess,
  [Types.REQUEST_APP_FAILURE]: appFailure,
})
  // [Types.REQUEST_APP_LIST_SUCCESS]: appListSuccess,
