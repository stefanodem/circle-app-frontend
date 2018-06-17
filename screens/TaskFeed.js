import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

import { Task, NewTaskButton } from '../components';

class TaskFeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Task Feed',
      headerTitle: 'Tasks',
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
    this.props.fetchAndHandleTasks('1');
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
});

export default connect(mapStateToProps, actions)(TaskFeedScreen);