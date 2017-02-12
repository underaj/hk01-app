// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../../Themes'
import styles from './styles'

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons}
          color={Colors.snow}
          style={styles.backButton}
        />
      </TouchableOpacity>
    )
  },

  searchButton (callback: Function) {
    return (
      <TouchableOpacity onPress={callback}>
        <Icon name='search'
          size={Metrics.icons}
          color={Colors.snow}
          style={styles.searchButton}
        />
      </TouchableOpacity>
    )
  }

}
