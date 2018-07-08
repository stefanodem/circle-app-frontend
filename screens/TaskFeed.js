import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

import { Task, NewTaskButton } from '../components';

class TaskFeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Tasks',
      headerTitle: 'Care Visit',
      headerRight: (
        <NewTaskButton
          color="black"
          navigate={navigate}
          to="NewTask" />
      ),
    };
  }

  componentDidMount () {
    const patientId = this.props.navigation.state.params ? this.props.navigation.state.params.patientId : null;
    this.props.fetchAndHandleTasks(patientId);
    //this.props.fetchAndHandlePatient(patientId);
  }

  _renderTasks = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <Task
        navigate={navigate}
        taskId={item.id}
        taskTitle={item.taskTitle} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderTaskFeed = (keyExtractor, cards, renderTasks) => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={keyExtractor}
        data={cards}
        renderItem={renderTasks} />
    )
  }

  render() {
    const isFetching = this.props.task.isFetching;
    const tasks = this.props.task.tasks;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>

        {this._renderTaskFeed(
            this._keyExtractor,
            _values(tasks),
            this._renderTasks)}

      </View>
    );
  }
}

function mapStateToProps({ task }) {
  return {
    task,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    paddingTop: 10,
  },
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
});

export default connect(mapStateToProps, actions)(TaskFeedScreen);