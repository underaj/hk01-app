// @flow

import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import NavigationRouter from '../Navigation'
import StartupActions from '../Redux/StartupRedux'
import AppsActions from '../Redux/AppsRedux'
import SearchActions from '../Redux/SearchRedux'

// Styles
import styles from './styles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: false,
    }
  }

  componentDidMount () {
    this.props.startup()
    this.props.fetchAppLists()
  }

  componentWillReceiveProps(nextProps) {
    let context = this;

    if (nextProps && !nextProps.loaded) {
      const topPaidApps   = nextProps.topPaidApps
      const topFreeApps   = nextProps.topFreeApps
      const freeAppsError = nextProps.freeAppsError
      const paidAppsError = nextProps.paidAppsError

      if (freeAppsError || paidAppsError) {
        return this.setState({ errors: true })
      }

      if (topPaidApps.length && topFreeApps.length) {
        this.props.combineLists(topPaidApps, topFreeApps)
      }

    }
  }

  renderError() {
    return (
      <View style={styles.applicationView}>
        <Text>
          There was an error retrieving apps
        </Text>
      </View>
    )
  }
  renderLoading () {
    return (
      <View style={styles.applicationView}>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }

  renderContent() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }

  render () {
    if (this.state.errors) { return renderError() }

    return this.props.loaded ? this.renderContent() : this.renderLoading()
  }
}

const mapStateToProps = (state) => {
  return {
    topPaidApps: state.apps.topPaidApps,
    topFreeApps: state.apps.topFreeApps,
    paidAppsError: state.apps.paidAppsError,
    freeAppsError: state.apps.freeAppsError,
    loaded: state.search.loaded
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => {
    dispatch(StartupActions.startup())
  },
  fetchAppLists: () => {
    dispatch(AppsActions.requestTopPaidApps())
    dispatch(AppsActions.requestTopFreeApps())
  },
  combineLists: (list1, list2) => {
    const apps = list1.concat(list2)
    dispatch(SearchActions.createFilterList(apps))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
