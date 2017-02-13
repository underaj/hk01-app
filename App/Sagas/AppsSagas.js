import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
import API from '../Services/Api';

export function * getFreeAppsList () {
  const api = API.create('rss/topfreeapplications/limit=100/lang=zh/json')
  const response = yield call(api.getApps)
  if (response.ok) {
    const entries = response.data.feed.entry
    yield put(AppsActions.requestFreeAppsRatings(entries))
  } else {
    yield put(AppsActions.requestAppListFailure({
      nature: 'free',
      data: response
    }))
  }
}

export function * getPaidAppsList () {
  const api = API.create('rss/topgrossingapplications/limit=10/lang=zh/json')
  const response = yield call(api.getApps)
  if (response.ok) {
    const entries = response.data.feed.entry
    yield put(AppsActions.requestPaidAppsRatings(entries))
  } else {
    yield put(AppsActions.requestAppListFailure({
      nature: 'paid',
      data: response
    }))
  }
}

export function * getPaidAppsRatings ({entries}) {
  const newEntries = yield entries.map(entry => {
    const appId = entry.id.attributes['im:id']
    const api = API.create(`lookup?id=${appId}&lang=zh`)
    return getAppEntry(api, entry)
  })

  yield put(AppsActions.requestAppListSuccess({
    nature: 'paid',
    entries: newEntries
  }))
}

export function * getFreeAppsRatings ({entries}) {
  const newEntries = yield entries.map(entry => {
    const appId = entry.id.attributes['im:id']
    const api = API.create(`lookup?id=${appId}&lang=zh`)
    return getAppEntry(api, entry)
  })

  yield put(AppsActions.requestAppListSuccess({
    nature: 'free',
    entries: newEntries
  }))
}

export function * getAppEntry (api, entry) {
  const response = yield call(api.getApp)
  entry.rating = response.data.results[0].averageUserRating
  entry.ratingCount = response.data.results[0].userRatingCount
  return entry
}