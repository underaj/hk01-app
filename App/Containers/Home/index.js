// @flow
// const testData = require('../../../testdata')

import React from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../../Themes'

// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchActions from '../../Redux/SearchRedux'

// Styles
import styles from './styles'

// Components
import SearchBar from '../../Components/SearchBar'
import RecommendedAppsList from '../../Components/RecommendedAppsList'
import FreeAppsList from '../../Components/FreeAppsList'
import SearchResultsList from '../../Components/SearchResultsList'

class Home extends React.Component {
  state: {
    topPaidApps: Object,
    topFreeApps: Object,
    results: Object
  }

  constructor (props) {
    super(props)

    // Configure DataSource
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      topPaidApps: ds.cloneWithRows(props.topPaidApps),
      topFreeApps: ds.cloneWithRows(props.topFreeApps),
      results: ds.cloneWithRows(props.results),
      loaded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const topPaidApps = nextProps.topPaidApps
      const topFreeApps = nextProps.topFreeApps
      const results     = nextProps.results

      this.setState({
        topPaidApps: this.state.topPaidApps.cloneWithRows(topPaidApps),
        topFreeApps: this.state.topFreeApps.cloneWithRows(topFreeApps),
        results: this.state.results.cloneWithRows(results)
      })

      if (!this.state.loaded && topPaidApps.length && topFreeApps.length) {
        this.props.combineLists(topPaidApps, topFreeApps)
        this.setState({loaded: true})
      }

    }
  }

  renderMain () {
    return (
      <View>
        <RecommendedAppsList
          data={this.state.topPaidApps}
          />
        <FreeAppsList
          data={this.state.topFreeApps}
          />
      </View>
    )
  }

  renderSearchResults() {
    return (<SearchResultsList data={this.state.results} />)
  }

  renderLoading () {

  }

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        {this.props.searching ?
          this.renderSearchResults() :
          this.renderMain()}
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    topPaidApps: state.apps.topPaidApps,
    topFreeApps: state.apps.topFreeApps,
    paidAppsError: state.apps.paidAppsError,
    freeAppsError: state.apps.freeAppsError,
    searching: state.search.searching,
    results: state.search.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    combineLists: (list1, list2) => {
      const apps = list1.concat(list2)
      return dispatch(SearchActions.createFilterList(apps))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
