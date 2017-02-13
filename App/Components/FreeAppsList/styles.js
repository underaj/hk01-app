// @flow
// FreeAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  rank: {
    fontSize: Metrics.fontSize,
    paddingLeft: 8,
    paddingRight: 20,
    color: Colors.grey,
    fontWeight: '200'
  },
  imgCircle: {
    borderRadius: Metrics.image.row / 2,
  },
})
