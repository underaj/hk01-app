import React from 'react'
import { ListView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import styles from './styles'

const SearchResultsList = ({ data }) => (
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
    <Image
      style={styles.imgRounded}
      source={{uri: data.image}}
      />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        { data.name }
      </Text>
      <Text style={styles.category}>
        { data.category }
      </Text>
    </View>
  </View>
)


const ListSeparator = (sectionId, rowId) => (
  <View key={rowId} style={styles.separator} />
)

export default SearchResultsList