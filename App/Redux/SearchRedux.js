// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  search: ['searchTerm'],
  createFilterList: ['apps'],
  cancelSearch: null
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  searchTerm: '',
  searching: false,
  appList: [],
  results: [],
  loaded: false
})

/* ------------- Reducers ------------- */

const setAppList = (state: Object, action: Object) =>
  state
    .set('appList', action.apps)
    .set('loaded', true)

export const performSearch = (state: Object, { searchTerm }: Object) => {

  if (searchTerm === '') {
    return state.merge({'searching': false, searchTerm})
  }

  searchTerm = searchTerm.toLowerCase();

  const notIncluded = (app) => (
    app.category.toLowerCase().indexOf(searchTerm) === -1 &&
    app.name.toLowerCase().indexOf(searchTerm) === -1 &&
    app.author.toLowerCase().indexOf(searchTerm) === -1 &&
    app.summary.toLowerCase().indexOf(searchTerm) === -1
  )

  let results = [];
  state.appList.forEach(app => {
    if (notIncluded(app)) return;
    results.push(app);
  })

  return state
    .set('results', results)
    .merge({ searching: true, searchTerm })
}

export const cancelSearch = (state: Object) =>
  state.merge({
    searching: false,
    results: [],
    searchTerm: ''
  })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: performSearch,
  [Types.CANCEL_SEARCH]: cancelSearch,
  [Types.CREATE_FILTER_LIST]: setAppList
})
