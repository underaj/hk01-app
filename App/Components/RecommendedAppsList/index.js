import React from 'react';
import { Image, ListView, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Colors, Metrics } from '../../Themes';
import styles from './styles';

const RecommendedAppsList = ({data}) => (
  <View style={styles.viewContainer}>
    <Text style={styles.title}>推介</Text>
    <ListView
      horizontal
      dataSource={data}
      renderRow={AppEntry}
      enableEmptySections
      initialListSize={4}
      pageSize={10}
      />
  </View>
)

const [height, width, marginBottom] = [Metrics.image.col, Metrics.image.col, Metrics.baseMargin]

const AppEntry = (data, sectionID, rowID) => (
  <View style={styles.colEntry}>
    <Image
      style={[styles.img, {height, width, marginBottom}]}
      source={{uri: data.image}}
    />
    <Text
      style={[styles.name, {marginBottom: Metrics.smallMargin}]}
      numberOfLines={2}>
      {data.name}
    </Text>
    <Text style={styles.category}>{data.category}</Text>
  </View>
)

export default RecommendedAppsList
