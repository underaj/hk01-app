import {StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../Themes/';

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingWrapper: {
    flex: 1,
    backgroundColor: Colors.orange,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
})
