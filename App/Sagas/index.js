import { takeLatest } from 'redux-saga'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AppsTypes } from '../Redux/AppsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getApps } from './AppsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppsTypes.REQUEST_APPS, getApps)
  ]
}
