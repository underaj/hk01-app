// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestTopPaidApps: [''],
  requestTopFreeApps: [''],
  requestAppListSuccess: ['data'],
  requestAppListFailure: ['response'],
  requestApp: ['data'],
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

const appListSuccess = (state: Object, action: Object) => {
  const { nature, entries } = action.data
  const substate = entries.map((entry, i) => ({
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    image: entry['im:image'][2].label,
    category: entry.category.attributes.label,
    link: entry.link.attributes.href,
    rating: null,
    ratingCount: null
  }))
  if (nature === 'paid') {
    return state
      .set('topPaidApps', substate)
      .set('paidAppsError', false)
  }
  if (nature === 'free') {
    return state
      .set('topFreeApps', substate)
      .set('freeAppsError', false)
      .set('fetching', false)
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
      .set('fetching', false)
  }
}

const appSuccess = (state: Object, action: Object) => {
  const { nature, key, rating, ratingCount } = action.data
  if (nature === 'paid') {
    return state
      .setIn(['topPaidApps', key, 'rating'], rating)
      .setIn(['topPaidApps', key, 'ratingCount'], ratingCount)
  }
  if (nature === 'free') {
    return state
      .setIn(['topFreeApps', key, 'rating'], rating)
      .setIn(['topFreeApps', key, 'ratingCount'], ratingCount)
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
  [Types.REQUEST_APP_LIST_SUCCESS]: appListSuccess,
  [Types.REQUEST_APP_LIST_FAILURE]: appListFailure,
  [Types.REQUEST_APP_SUCCESS]: appSuccess,
  [Types.REQUEST_APP_FAILURE]: appFailure,
})
