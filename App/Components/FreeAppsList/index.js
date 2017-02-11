import React from 'react'
import { ListView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

import { LazyloadScrollView, LazyloadListView, LazyloadView, LazyloadImage } from 'react-native-lazyload'
import StarRating from 'react-native-star-rating'

import { Colors, Metrics } from '../../Themes'
import styles from './styles'

const FreeAppsList = ({ data }) => (
  <LazyloadListView
    contentContainerStyle={styles.listContent}
    dataSource={data}
    renderRow={AppEntry}
    renderSeparator={ListSeparator}
    initialListSize={15}
    pageSize={5}
    scrollRenderAheadDistance={10}
    scrollEnabled={false}
    enableEmptySections
    />
)

const AppEntry = (data, sectionId, rowId) => (
  <LazyloadView style={styles.entry}>
    <Text style={styles.rank}>
      { rowId*1 + 1 }
    </Text>
    <LazyloadImage
      style={rowId % 2 ? styles.imgRounded : styles.imgCircle}
      source={{uri: data.image}} />
    <LazyloadView style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        { data.name }
      </Text>
      <Text style={styles.category}>
        { data.category }
      </Text>
      {/*
      <StarRating
        disabled={true}
        maxStars={5}

        />
      */}


    </LazyloadView>
  </LazyloadView>
)

const ListSeparator = (sectionId, rowId) => (
  <View key={rowId} style={styles.separator} />
)



export default FreeAppsList