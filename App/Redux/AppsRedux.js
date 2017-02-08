// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestApps: null,
  requestSuccess: ['apps'],
  requestFailure: null
})

export const AppsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  apps: null,
  fetching: null,
  error: null,
})

/* ------------- Reducers ------------- */

// request apps
export const request = (state: Object) =>
  state.merge({ fetching: true, apps: null })

// successful apps
export const success = (state: Object, action: Object) => {
  const { apps } = action
  return state.merge({ fetching: false, error: null, apps })
}

// failed to get the temperature
export const failure = (state: Object) =>
  state.merge({ fetching: false, error: true, apps: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_APPS]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure
})
