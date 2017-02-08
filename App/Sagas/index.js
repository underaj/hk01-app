import { takeLatest } from 'redux-saga'
import API from '../Services/topFreeAppsApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AppsTypes } from '../Redux/AppsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getTopFreeApps } from './AppsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const topFreeAppsApi = API.create('rss/topfreeapplications/limit=100/lang=zh/json')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppsTypes.REQUEST_APPS, getTopFreeApps, topFreeAppsApi)
  ]
}
