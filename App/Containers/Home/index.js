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
import { search } from '../../Redux/SearchRedux'

// Styles
import styles from './styles'

import SearchBar from '../../Components/SearchBar';

class Home extends React.Component {
  state: {
    topPaidApps: Object,
    topFreeApps: Object
  }

  constructor (props) {
    super(props)

    // Configure DataSource
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      topPaidApps: ds.cloneWithRows(props.topPaidApps),
      topFreeApps: ds.cloneWithRows(props.topFreeApps)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        topPaidApps: this.state.topPaidApps.cloneWithRows(nextProps.topPaidApps),
        topFreeApps: this.state.topFreeApps.cloneWithRows(nextProps.topFreeApps)
      })
    }

    console.tron.display({name: 'here is the data in nextProps!', value: nextProps})
  }

  renderPaidCol (data) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{data['im:name'].label}</Text>
      </View>
    )
  }

  renderFreeRow (data) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{data['im:name'].label}</Text>
      </View>
    )
  }

  // render () {
  //   return (
  //     <ScrollView style={styles.container}>
  //       <View>
  //         <Text>
  //           Recommendations
  //         </Text>
  //       </View>
  //     </ScrollView>
  //   )
  // }
  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <View>
          <Text>
            Recommendations
          </Text>
        </View>
        <ListView
          horizontal
          dataSource={this.state.topPaidApps}
          renderRow={this.renderPaidCol}
          enableEmptySections
          />

        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.topFreeApps}
          renderRow={this.renderFreeRow}
          pageSize={15}
          scrollEnabled={false}
          enableEmptySections
          />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
