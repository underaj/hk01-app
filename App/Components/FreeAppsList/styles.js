// @flow
// FreeAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  rank: {
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 20,
    color: Colors.steel,
    fontWeight: '200'
  },
  imgCircle: {
    borderRadius: Metrics.image.row / 2,
    height: Metrics.image.row,
    width: Metrics.image.row,
  }
})
