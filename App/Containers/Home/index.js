// @flow
import React from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'

// Styles
import styles from './styles'

// Components
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
      results: ds.cloneWithRows(props.results)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { topPaidApps, topFreeApps, results } = nextProps
    if (nextProps) {
      this.setState({
        topPaidApps: this.state.topPaidApps.cloneWithRows(topPaidApps),
        topFreeApps: this.state.topFreeApps.cloneWithRows(topFreeApps),
        results: this.state.results.cloneWithRows(results)
      })
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
    searching: state.search.searching,
    results: state.search.results
  }
}

export default connect(mapStateToProps)(Home)
