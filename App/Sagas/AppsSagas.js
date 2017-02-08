import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import AppsActions from '../Redux/AppsRedux'
import API from '../Services/Api';


export function * getApps ({nature}) {
  let api;
  if (nature === 'paid') {
    api = API.create('rss/topgrossingapplications/limit=10/lang=zh/json')
  }
  if (nature === 'free') {
    api = API.create('rss/topfreeapplications/limit=100/lang=zh/json')
  }
  console.tron.log({api})

  const response = yield call(api.getApps)

  if (response.ok) {
    yield put(AppsActions.requestSuccess(nature, response))
  } else {
    yield put(AppsActions.requestFailure(nature))
  }
}