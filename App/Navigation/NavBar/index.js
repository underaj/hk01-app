import React, { PropTypes } from 'react';
import { View, Text, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from '../../Components/SearchBar';
import SearchActions from '../../Redux/SearchRedux';

import NavItems from '../NavItems';
import styles from './styles';

class NavBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showSearchBar: false
    }
  }

  showSearchBar = () => {
    this.setState({showSearchBar: true})
  }

  cancelSearch = () => {
    this.setState({showSearchBar: false})
    this.props.cancelSearch()
  }

  renderSearch () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (this.state.showSearchBar) {
      return (
        <SearchBar
          onSearch={this.props.performSearch}
          searchTerm={this.props.searchTerm}
          onCancel={this.cancelSearch}
        />
      )
    }
  }

  renderRightButton () {
    if (this.state.showSearchBar) {
      return null
    } else {
      return (
        <View style={styles.rightButtons}>
          {NavItems.searchButton(this.showSearchBar)}
        </View>
      )
    }
  }

  render () {
    let state = this.props.navigationState
    let selected = state.children[state.index]
    while (selected.hasOwnProperty('children')) {
      state = selected
      selected = selected.children[selected.index]
    }

    const containerStyle = [
      styles.container,
      this.props.navigationBarStyle,
      state.navigationBarStyle,
      selected.navigationBarStyle
    ]

    return (
      <View style={containerStyle}>
        {this.renderSearch()}
        {this.renderRightButton()}
      </View>
    )
  }
}

NavBar.propTypes = {
  navigationState: PropTypes.object,
  navigationBarStyle: View.propTypes.style
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(SearchActions.search(searchTerm)),
    cancelSearch: () => dispatch(SearchActions.cancelSearch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
