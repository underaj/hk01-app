// @flow
// FreeAppsList Stylesheet

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  row: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowInfo: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingLeft: 20
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCDCDC'
  },
  rank: {
    fontSize: 30,
    paddingLeft: 8,
    paddingRight: 20,
    color: '#929292',
    fontWeight: '200'
  },
  imgRounded: {
    borderRadius: 8,
    height: 84,
    width: 84
  },
  imgCircle: {
    borderRadius: 42,
    height: 84,
    width: 84,
  }
})
