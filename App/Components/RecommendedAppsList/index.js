import React from 'react';
import { ListView, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Colors, Metrics } from '../../Themes';
import styles from './styles';

const RecommendedAppsList = ({ data }) => (
  <View>
    <Text> Recommendations </Text>
    <ListView
      horizontal
      dataSource={data}
      renderRow={AppEntry}
      enableEmptySections
      />
  </View>
)

const AppEntry = (data, sectionID, rowID) => (
  <View style={styles.row}>
    <Text style={styles.boldLabel}>{data.name}</Text>
  </View>
)

export default RecommendedAppsList
