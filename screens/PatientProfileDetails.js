import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import HeaderBackButton from 'react-navigation/src/views/Header/HeaderBackButton';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { SectionDescription } from '../components';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

class PatientProfileDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      title: 'PatientProfileDetails',
      headerTitle: navigation.state.params.profileItemName,
    };
  }

  _renderItem = ({ item }) => {
    return (
      <SectionDescription
        title={item.title}
        description={item.description} />
    )
  }

  _keyExtractor = (item, index) => item.title

  _renderProfileDetail = (keyExtractor, profileDetails, renderItem) => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={keyExtractor}
        data={profileDetails}
        renderItem={renderItem} />
    )
  }

  render() {
    const { profileItemContent } = this.props.navigation.state.params;

    if (!profileItemContent) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{'Error loading patient profile'}</Text>
        </View>
      );
    }

    return (
      <View
        style={styles.container} >
        {this._renderProfileDetail(
          this._keyExtractor,
          _values(profileItemContent),
          this._renderItem)}
      </View>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
});

export default connect(mapStateToProps, actions)(PatientProfileDetailsScreen);
