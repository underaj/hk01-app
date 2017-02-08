import React from 'react';
import { View, Image, Animated, TouchableOpacity } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Images, Colors } from '../../Themes';
import Styles from './styles';

export default class CustomNavBar extends React.Component {
  render () {
    return (
      <Animated.View style={Styles.container}>
        <TouchableOpacity style={Styles.leftButton} onPress={NavigationActions.pop}>
          <Icon name='ios-arrow-back' size={34} color={Colors.snow} />
        </TouchableOpacity>
        <Image style={Styles.logo} source={Images.clearLogo} />
        <View style={Styles.rightButton} />
      </Animated.View>
    )
  }
}
