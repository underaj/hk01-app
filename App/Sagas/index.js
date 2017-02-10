import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AppsTypes } from '../Redux/AppsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getPaidApps, getFreeApps, getApp } from './AppsSagas'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppsTypes.REQUEST_TOP_PAID_APPS, getPaidApps),
    takeLatest(AppsTypes.REQUEST_TOP_FREE_APPS, getFreeApps),
    takeLatest(AppsTypes.REQUEST_APP, getApp)
  ]
}
