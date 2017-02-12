// @flow
// RecommendedAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewContainer: {
    padding: 20,
    paddingRight: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#DCDCDC'
  },
  title: {
    fontSize: 24,
    paddingBottom: 15,
  },
  colEntry: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: Metrics.image.col,
    marginRight: 20,
  },
  imgRounded: StyleSheet.flatten([ApplicationStyles.screen.imgRounded, {
    height: Metrics.image.col,
    width: Metrics.image.col
  }])
})
