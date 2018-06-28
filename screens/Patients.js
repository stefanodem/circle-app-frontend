import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

import { Task, NewTaskButton } from '../components';

class PatientsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Home',
      headerTitle: 'Circles',
      //TODO: connect navigation to redux and get care-receiver name
      //can be String, React Element or React Componen
      //header: can be React Element or a function --> for customizing headers
      headerRight: (
        <NewTaskButton
          color="black"
          navigate={navigate}
          to="NewTask" />
      ),
    };
  }

  componentDidMount () {
    this.props.fetchAndHandleUserPatients('1');
  }

  _renderPatient = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <ListItem
        key={item.id}
        onPress={() => navigate('TaskFeed', {patientId: item.id})}
        containerStyle={styles.container}
        roundAvatar
        avatar={{uri: item.avatar}}
        title={item.name}
        subtitle={"Next visit: " + item.nextVisit} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderPatients = (keyExtractor, patient, renderPatients) => {
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={patient}
        renderItem={renderPatients} />
    )
  }

  render() {
    const {isFetching, error, patients} = this.props.user;
    //console.log(patients)

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
      )
    }

    return (
      <ScrollView>

        <View
          style={styles.sectionTitleContainer}>
          <Text
            style={styles.sectionTitleText}>{'Family'}</Text>
        </View>

        <View>
          {this._renderPatients(
              this._keyExtractor,
              _values(patients),
              this._renderPatient)}
        </View>

      </ScrollView>
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
  sectionTitleText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    //borderTopColor: 'grey',
    //borderTopWidth: StyleSheet.hairlineWidth,
    //borderBottomColor: 'grey',
    //borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    height: 20,
    //backgroundColor: 'lightgrey',
  }
});

export default connect(mapStateToProps, actions)(PatientsScreen);