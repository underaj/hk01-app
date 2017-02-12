// @flow
// RecommendedAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    padding: 20,
    paddingRight: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.steel
  },
  title: {
    fontSize: Fonts.size.h5,
    color: Colors.coal,
    marginBottom: Metrics.doubleBaseMargin
  },
  colEntry: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: Metrics.image.col,
    marginRight: 20,
  }
})
