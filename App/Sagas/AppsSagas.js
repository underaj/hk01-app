import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
import API from '../Services/Api';

export function * getFreeApps () {
  const api = API.create('rss/topfreeapplications/limit=100/lang=zh/json')
  const response = yield call(api.getApps)

  if (response.ok) {
    yield put(AppsActions.requestAppListSuccess({
      nature: 'free',
      entries: response.data.feed.entry
    }))
  } else {
    yield put(AppsActions.requestAppListFailure({
      nature: 'free',
      data: response
    }))
  }
}

export function * getPaidApps () {
  const api = API.create('rss/topgrossingapplications/limit=10/lang=zh/json')
  const response = yield call(api.getApps)

  if (response.ok) {
    yield put(AppsActions.requestAppListSuccess({
      nature: 'paid',
      entries: response.data.feed.entry
    }))
  } else {
    yield put(AppsActions.requestAppListFailure({
      nature: 'paid',
      data: response
    }))
  }
}

export function * getApp ({nature, key, appId}) {
  const api = API.create(`lookup?id=${appId}&lang=zh`)
  const response = yield call(api.getApp)

  if (response.ok) {
    yield put(AppsActions.requestAppSuccess({
      nature,
      key,
      rating: response.results.averageUserRating,
      ratingCount: response[0].results.userRatingCount
    }))
  } else {
    yield put(AppsActions.requestAppFailure({nature, key}))
  }
}