// @flow
import React from 'react'
import { ListView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating'

// Styles
import styles from './styles'

const FreeAppsList = ({ data }) => (
  <ListView
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
  <View style={styles.rowEntry}>
    <Text style={styles.rank}>
      { rowId*1 + 1 }
    </Text>
    <Image
      style={rowId % 2 ? styles.img : [styles.img, styles.imgCircle]}
      source={{uri: data.image}}
    />
    <View style={styles.info}>
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


    </View>
  </View>
)

const ListSeparator = (sectionId, rowId) => (
  <View key={rowId} style={styles.separator} />
)



export default FreeAppsList