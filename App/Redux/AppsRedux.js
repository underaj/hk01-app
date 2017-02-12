// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestTopPaidApps: [''],
  requestTopFreeApps: [''],
  requestAppListSuccess: ['data'],
  requestAppListFailure: ['response'],
  requestApp: ['data'],
  requestAppSuccess: ['data'],
  requestAppFailure: ['data'],
  // search: ['searchTerm'],
  // cancelSearch: null
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
  searchTerm: '',
  searching: false,
  results: null
})

/* ------------- Reducers ------------- */

const requestTopPaid = (state: Object, action: Object) =>
  // StartupSaga gets paidApps first, then freeApps last
  state
    .set('fetching', true)
    .set('topPaidApps', [])

const requestTopFree = (state: Object, action: Object) =>
  state.set('topFreeApps', [])

export const appListSuccess = (state: Object, action: Object) => {
  const { nature, entries } = action.data
  const substate = entries.map((entry, i) => ({
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    image: entry['im:image'][2].label,
    category: entry.category.attributes.label,
    link: entry.link.attributes.href,
    summary: entry.summary.label,
    author: entry['im:artist'].label,
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

// const combineAppLists = (state: Object, action: Object) => {

// }

// export const performSearch = (state: Object, { searchTerm }: Object) => {

//   const results = filter(startsWith(searchTerm), LIST_DATA)
//   return state.merge({ searching: true, searchTerm, results })
// }
// export const cancelSearch = (state: Object) => {
//   INITIAL_STATE
//   return state.merge({searching: false, results: })
// }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TOP_PAID_APPS]: requestTopPaid,
  [Types.REQUEST_TOP_FREE_APPS]: requestTopFree,
  [Types.REQUEST_APP_LIST_SUCCESS]: appListSuccess,
  [Types.REQUEST_APP_LIST_FAILURE]: appListFailure,
  [Types.REQUEST_APP_SUCCESS]: appSuccess,
  [Types.REQUEST_APP_FAILURE]: appFailure,
  // [Types.SEARCH]: performSearch,
  // [Types.CANCEL_SEARCH]: cancelSearch
})
