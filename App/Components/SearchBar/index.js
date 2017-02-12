import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import * as Animatable from 'react-native-animatable';

import { Colors, Metrics } from '../../Themes';
import styles from './styles';

const SearchBar = ({ onSearch, onCancel, searchTerm }) => {
  const onSubmitEditing = () => onSearch(searchTerm)

  console.tron.display({
    name: 'searchBarSearchTerm',
    value: {searchTerm}
  })

  return (
    <Animatable.View animation='slideInRight' duration={250} style={styles.container}>
      <Icon name='search' size={Metrics.icons.tiny} style={styles.searchIcon} />
      <TextInput
        autoFocus
        placeholder={I18n.t('search')}
        placeholderTextColor={Colors.snow}
        underlineColorAndroid='transparent'
        style={styles.searchInput}
        value={searchTerm}
        autoCapitalize='none'
        onSubmitEditing={onSubmitEditing}
        onChangeText={onSearch}
        returnKeyType={'search'}
        autoCorrect={false}
        selectionColor={Colors.snow}
      />
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.buttonLabel}>{I18n.t('cancel')}</Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}

export default SearchBar