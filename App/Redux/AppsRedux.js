// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestTopPaidApps: [''],
  requestTopFreeApps: [''],
  requestSuccess: ['data'],
  requestFailure: ['data'],
})

export const AppsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  topPaidApps: [],
  topFreeApps: [],
  paidAppsError: false,
  freeAppsError: false,
  fetching: false,
})

/* ------------- Reducers ------------- */

const requestTopPaid = (state: Object, action: Object) =>
  // StartupSaga gets paidApps first, then freeApps last
  state
    .set('fetching', true)
    .set('topPaidApps', [])

const requestTopFree = (state: Object, action: Object) =>
  state.set('topFreeApps', [])

const success = (state: Object, action: Object) => {

  const { nature, entries } = action.data

  if (nature === 'paid') {
    return state
      .set('topPaidApps', entries)
      .set('paidAppsError', false)
  }
  if (nature === 'free') {
    return state
      .set('topFreeApps', entries)
      .set('freeAppsError', false)
      .set('fetching', false)
  }
}

const failure = (state: Object, action: Object) => {

  const { nature, entries } = action.data

  if (nature === 'paid') {
    return state
      .set('paidAppsError', entries)
      .set('topPaidApps', [])
  }
  if (nature === 'free') {
    return state
      .set('freeAppsError', entries)
      .set('topFreeApps', [])
      .set('fetching', false)
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TOP_PAID_APPS]: requestTopPaid,
  [Types.REQUEST_TOP_FREE_APPS]: requestTopFree,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
