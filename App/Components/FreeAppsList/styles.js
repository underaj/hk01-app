// @flow
// FreeAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  entry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 74
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCDCDC'
  },
  rank: {
    fontSize: 24,
    paddingLeft: 8,
    paddingRight: 20,
    color: '#929292',
    fontWeight: '200'
  },
  imgRounded: {
    borderRadius: 8,
    height: 74,
    width: 74,
  },
  imgCircle: {
    borderRadius: 37,
    height: 74,
    width: 74,
  }
})
