// @flow
import { StyleSheet } from 'react-native'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    name: {
      fontSize: Fonts.size.medium,
      color: Colors.coal,
    },
    category: {
      fontSize: Fonts.size.small,
      color: Colors.grey,
    },
    rowEntry: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 12,
      alignItems: 'center',
    },
    img: {
      borderRadius: Metrics.image.radius,
      height: Metrics.image.row,
      width: Metrics.image.row,
    },
    info: {
      flex: 1,
      justifyContent: 'space-between',
      paddingLeft: 15,
      height: Metrics.image.row - 8,
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: Colors.steel
    },
    ratings: {
      flexDirection: 'row'
    },
    starsWrapper: {
      width: 70,
      alignItems: 'flex-start'
    },
    ratingCount: {
      color: Colors.grey,
      fontSize: Fonts.size.small,
      alignItems: 'flex-end'
    },
    mainContainer: {
      flex: 1,
      marginTop: Metrics.navBarHeight,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      borderTopColor: Colors.frost,
      borderTopWidth: 0.5,
      borderBottomColor: Colors.frost,
      borderBottomWidth: 1
    },
  },
}

export default ApplicationStyles
