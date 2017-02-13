// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

import ConvertFromAPI from '../Transforms/ConvertFromAPI'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // Saga Actions
  requestTopPaidAppsList: [''],
  requestPaidAppsRatings: ['entries'],
  requestTopFreeAppsList: [''],
  requestFreeAppsRatings: ['entries'],
  // Reducer Actions
  requestAppListSuccess: ['data'],
  requestAppListFailure: ['response'],
})

export const AppsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  topPaidApps: [],
  topFreeApps: [],
  paidAppsError: false,
  freeAppsError: false,
})

/* ------------- Reducers ------------- */

const appListSuccess = (state: Object, action: Object) => {
  const { nature, entries } = action.data
  const updatedEntries = ConvertFromAPI(entries)
  if (nature === 'paid') {
    return state.set('topPaidApps', updatedEntries)
  }
  if (nature === 'free') {
    return state.set('topFreeApps', updatedEntries)
  }
}

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_APP_LIST_FAILURE]: appListFailure,
  [Types.REQUEST_APP_LIST_SUCCESS]: appListSuccess,
})
