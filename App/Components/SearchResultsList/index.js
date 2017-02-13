import React from 'react'
import { ListView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'
import styles from './styles'
import StarRating from 'react-native-star-rating'

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
      style={styles.img}
      source={{uri: data.image}}
    />
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>
        { data.name }
      </Text>
      <Text style={styles.category}>
        { data.category }
      </Text>
      <View style={styles.ratings}>
        <View style={styles.starsWrapper}>
          <StarRating
            disabled={true}
            selectedStar={()=>{}}
            maxStars={5}
            rating={data.rating}
            iconSet={'Ionicons'}
            emptyStar={'ios-star-outline'}
            halfStar={'ios-star-half'}
            fullStar={'ios-star'}
            starColor={Colors.orange}
            starSize={Fonts.size.medium}
          />
        </View>
        <Text style={styles.ratingCount}>
          ({data.ratingCount})
        </Text>
      </View>
    </View>
  </View>
)


const ListSeparator = (sectionId, rowId) => (
  <View key={rowId} style={styles.separator} />
)

export default SearchResultsList