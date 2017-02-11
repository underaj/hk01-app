// @flow
// RecommendedAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
  entry: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 84,
    marginRight: 20,
  },
  imgRounded: {
    borderRadius: 8,
    height: 84,
    width: 84
  }
})
