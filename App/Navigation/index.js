// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './styles'

import NavItems from './NavItems'
import NavBar from './NavBar'

// screens
import Home from '../Containers/Home'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene
          key='drawerChildrenWrapper'
          navigationBarStyle={Styles.navBar}
          rightButtonTextStyle={Styles.rightButton}>

          <Scene initial
            key='homeScreen'
            component={Home}
            title='Home'
            navBar={NavBar}
          />

        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
