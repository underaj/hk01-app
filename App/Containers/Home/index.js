// @flow
// const testData = require('../../../testdata')

import React from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView, ListView } from 'react-native'
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

    // Configure DataSource
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: ds.cloneWithRows(props.results)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.results)
      })
    }
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
    results: state.search.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
