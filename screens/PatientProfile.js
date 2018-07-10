import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import HeaderBackButton from 'react-navigation/src/views/Header/HeaderBackButton';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { Task, NewTaskButton } from '../components';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

const profileTextColor = 'white';
const profileBackgroundColor = '#ff1654'; //#3949AB, #304FFE, #ff1654

class PatientProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'PatientProfile',
      headerTitle: '',
      header: null,
      //TODO: make header null, and add custom goBack button
      headerStyle: { backgroundColor: 'lightblue', borderWidth: 0, borderBottomColor: 'lightblue' },
      //headerTitle: navigation.state.params && navigation.state.params.patientName ? navigation.state.params.patientName : '',
    };
  }

  _renderProfileItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <ListItem
        onPress={() => navigate('PatientProfileDetails', { profileItemContent: item.content, profileItemName: item.title })}
        roundAvatar
        title={item.title} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderProfile = (keyExtractor, profile, renderItem) => {
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={profile}
        renderItem={renderItem} />
    )
  }

  render() {
    const {isFetching, error, patients} = this.props.user;
    const { patientId } = this.props.navigation.state.params;
    const patient = patients[patientId];
    const { navigate } = this.props.navigation;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
      <View
        style={{flex: 1}}>
        <View
          style={styles.profileContainer}>
          {/*ProfileTitle*/}
          <HeaderBackButton
            onPress={() => this.props.navigation.goBack()}
            title={'Circles'} />
          <View
            style={styles.profileTitleContainer}>
            <Avatar
              large
              rounded
              source={{uri: patient.avatar}}
              //onPress={() => console.log("Works!")}
              activeOpacity={1} />
            <Text
              style={styles.profileTitle}>{patient.name}</Text>
            <Text
              style={styles.profileSubtitle}>{`${patient.address[0].city}, ${patient.address[0].country}`}</Text>
          </View>
          {/*ProfileMetrics*/}
          <View
            style={styles.profileMetricsContainer}>

            {patient.metrics && patient.metrics.map((metric, i) => {
              return (
                <View
                  key={i}
                  style={styles.profileMetricContainer}>
                  <Text
                    style={styles.profileMetricsTitle}>{metric.name}</Text>
                  <Text
                    style={styles.profileMetrics}>{metric.value}</Text>
                </View>
              );
            })}

          </View>
        </View>
        <View
          style={{flex: 2, backgroundColor: '#fff'}}>
          <ScrollView
            contentContainerStyle={styles.contentContainer} >
            {patient
              ? this._renderProfile(
                  this._keyExtractor,
                  _values(patient.profileItem),
                  this._renderProfileItem)
              : <Text>{'Error loading patient profile'}</Text>}
          </ScrollView>
        </View>
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
  profileContainer: {
    flex: 1.2,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: profileBackgroundColor,
  },
  profileTitleContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: profileTextColor,
    padding: 3,
  },
  profileSubtitle: {
    fontSize: 14,
    color: profileTextColor,
    paddingBottom: 3,
  },
  profileMetricsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMetricContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMetricsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: profileTextColor,
    padding: 3,
  }, profileMetrics: {
    fontSize: 16,
    color: profileTextColor,
  },
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
});

export default connect(mapStateToProps, actions)(PatientProfileScreen);
