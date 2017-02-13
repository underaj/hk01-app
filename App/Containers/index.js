// @flow

import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import NavigationRouter from '../Navigation'
import AppsActions from '../Redux/AppsRedux'
import SearchActions from '../Redux/SearchRedux'

// Styles
import styles from './styles'

class RootContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: false
    }
  }

  componentDidMount () {
    this.props.fetchAppLists()
  }

  componentWillReceiveProps(nextProps) {
    const { topPaidApps, topFreeApps, freeAppsError, paidAppsError, loaded } = nextProps

    if (nextProps && !loaded) {
      if (freeAppsError || paidAppsError) {
        console.tron.error({name: 'error in here.'})
        return this.setState({ errors: true })
      }

      if (topFreeApps.length && topPaidApps.length) {
        this.props.combineLists(topPaidApps, topFreeApps)
      }
    }
  }

  renderError() {
    return (
      <View style={styles.applicationView}>
        <Text style={styles.loader}>
          There was an error retrieving apps
        </Text>
      </View>
    )
  }

  renderLoading () {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator
          animating={true}
          style={styles.loader}
          size="large"
          />
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
  fetchAppLists: () => {
    dispatch(AppsActions.requestTopPaidAppsList())
    dispatch(AppsActions.requestTopFreeAppsList())
  },
  combineLists: (list1, list2) => {
    const apps = list1.concat(list2)
    dispatch(SearchActions.createFilterList(apps))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
