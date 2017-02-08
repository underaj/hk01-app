// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestApps: ['nature'],
  requestSuccess: ['nature', 'apps'],
  requestFailure: ['nature'],
})

export const AppsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  topPaidApps: null,
  topFreeApps: null,
  paidAppsError: null,
  freeAppsError: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

const request = (state: Object, action: Object) => {
  if (action.nature === 'paid')
  // StartupSaga gets paidApps first, then freeApps last
    return state.merge({ fetching: true, topPaidApps: null })
  if (action.nature === 'free')
    return state.merge({ topFreeApps: null })
}

const success = (state: Object, action: Object) => {
  if (action.nature === 'paid')
    return state.merge({
      paidAppsError: null,
      topPaidApps: action.apps
    })
  if (action.nature === 'free')
    return state.merge({
      fetching: false,
      freeAppsError: null,
      topFreeApps: action.apps
    })
}

const failure = (state: Object, action: Object) => {
  if (action.nature === 'paid')
    return state.merge({
      paidAppsError: true,
      topPaidApps: null
    })
  if (action.nature === 'free')
    return state.merge({
      fetching: false,
      freeAppsError: true,
      topFreeApps: null
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_APPS]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
