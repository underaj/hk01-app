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
  state: { dataSource: Object }

  constructor (props) {
    super(props)

    const dataObjects = {
      first: [
        {title: 'First Title', description: 'First Description'},
        {title: 'Second Title', description: 'Second Description'},
        {title: 'Third Title', description: 'Third Description'},
        {title: 'Fourth Title', description: 'Fourth Description'},
        {title: 'Fifth Title', description: 'Fifth Description'},
        {title: 'Sixth Title', description: 'Sixth Description'},
        {title: 'Seventh Title', description: 'Seventh Description'},
        {title: 'Eighth Title', description: 'Eighth Description'},
        {title: 'Ninth Title', description: 'Ninth Description'},
        {title: 'Tenth Title', description: 'Tenth Description'}
      ],
      second: [
        {title: 'Eleventh Title', description: 'Eleventh Description'},
        {title: '12th Title', description: '12th Description'},
        {title: '13th Title', description: '13th Description'},
        {title: '14th Title', description: '14th Description'},
        {title: '15th Title', description: '15th Description'},
        {title: '16th Title', description: '16th Description'},
        {title: '17th Title', description: '17th Description'},
        {title: '18th Title', description: '18th Description'},
        {title: '19th Title', description: '19th Description'},
        {title: '20th Title', description: '20th Description'},
        {title: 'BLACKJACK!', description: 'BLACKJACK! Description'}
      ]
    }

    // Configure DataSource
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    console.tron.log({props})

    this.state = {
      dataSource: ds.cloneWithRows(props.topFreeApps)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.results)
      })
    }
    console.tron.display({name: 'here is the data in nextProps!', value: nextProps})
  }

  renderRow (searchResult) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{searchResult}</Text>
      </View>
    )
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>
            Recommendations
          </Text>
        </View>
      </ScrollView>
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
  //       <ListView
  //         horizontal />

  //       <ListView
  //         contentContainerStyle={styles.listContent}
  //         dataSource={this.state.dataSource}
  //         renderRow={this.renderRow}
  //         pageSize={15}
  //         scrollEnabled={false}
  //         enableEmptySections
  //         />
  //     </ScrollView>
  //   )
  // }

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
