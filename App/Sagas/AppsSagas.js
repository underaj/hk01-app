import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
import API from '../Services/Api';

export function * getFreeApps () {
  const api = API.create('rss/topfreeapplications/limit=100/lang=zh/json')
  const response = yield call(api.getApps)
  if (response.ok) {

    const entries = response.data.feed.entry
    const updatedEntries = yield entries.map(entry => {
      const nature = 'free'
      return put(AppsActions.requestApp({entry, nature}))
    })
    // yield put(AppsActions.requestAppListSuccess('free'))
    // yield put(AppsActions.requestAppListSuccess({
    //   nature: 'free',
    //   entries: response.data.feed.entry
    // }))
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

    const entries = response.data.feed.entry
    const updatedEntries = yield entries.map(entry => {
      const nature = 'paid'
      return put(AppsActions.requestApp({entry, nature}))
    })

    // yield put(AppsActions.requestAppListSuccess('paid'))

    // yield put(AppsActions.request)
    // yield put(AppsActions.requestAppListSuccess({
    //   nature: 'paid',
    //   entries: response.data.feed.entry
    // }))
  } else {
    yield put(AppsActions.requestAppListFailure({
      nature: 'paid',
      data: response
    }))
  }
}

export function * getApp ({app}) {
  const { nature, entry } = app
  const appId = entry.id.attributes['im:id']
  const api = API.create(`lookup?id=${appId}&lang=zh`)
  const response = yield call(api.getApp)
  entry.rating = response.data.results[0].averageUserRating
  entry.ratingCount = response.data.results[0].userRatingCount
  console.tron.display({name: 'finally', value: {entry, nature}})

  yield put(AppsActions.requestAppSuccess({nature, entry}))

  console.tron.display({name: 'we here now.', value: {entry, nature}})
}