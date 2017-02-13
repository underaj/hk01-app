import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { AppsTypes } from '../Redux/AppsRedux'

/* ------------- Sagas ------------- */

import { getPaidAppsList, getFreeAppsList, getFreeAppsRatings, getPaidAppsRatings } from './AppsSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(AppsTypes.REQUEST_TOP_PAID_APPS_LIST, getPaidAppsList),
    takeLatest(AppsTypes.REQUEST_TOP_FREE_APPS_LIST, getFreeAppsList),
    takeLatest(AppsTypes.REQUEST_PAID_APPS_RATINGS, getPaidAppsRatings),
    takeLatest(AppsTypes.REQUEST_FREE_APPS_RATINGS, getFreeAppsRatings)
  ]
}
