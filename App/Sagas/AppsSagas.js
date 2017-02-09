import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
import API from '../Services/Api';

export function * getFreeApps () {
  const api = API.create('rss/topfreeapplications/limit=100/lang=zh/json')
  const response = yield call(api.getApps)

  if (response.ok) {
    yield put(AppsActions.requestSuccess({
      nature: 'free',
      entries: response.data.feed.entry
    }))
  } else {
    yield put(AppsActions.requestFailure({
      nature: 'free',
      data: response
    }))
  }
}

export function * getPaidApps () {
  const api = API.create('rss/topgrossingapplications/limit=10/lang=zh/json')
  const response = yield call(api.getApps)

  if (response.ok) {
    yield put(AppsActions.requestSuccess({
      nature: 'paid',
      entries: response.data.feed.entry
    }))
  } else {
    yield put(AppsActions.requestFailure({
      nature: 'paid',
      data: response
    }))
  }
}