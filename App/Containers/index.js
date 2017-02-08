// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import NavigationRouter from '../Navigation'
import StartupActions from '../Redux/StartupRedux'

// Styles
import styles from './styles'

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => {
    dispatch(StartupActions.startup())
  }
})

export default connect(null, mapDispatchToProps)(RootContainer)
