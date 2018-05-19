import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ReadMore from 'react-native-read-more-text';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const TaskDetail = ({ title, text, icon }) => {
  return (
    <View
      style={styles.section} >
      <Icon
        name={ icon }
        style={[ styles.icon ]}
        color='grey' />
      <View
        style={{ paddingLeft: 10 }} >
        <Text
          style={styles.sectionTitle} >
          { title }
        </Text>
          <ReadMore
            numberOfLines={3}>
            <Text >
              { text }
            </Text>
          </ReadMore>
      </View>
    </View>
  )
}

class TaskDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Task Feed',
      headerTitle: 'Person Name',
    };
  }

  componentDidMount () {
    //this.props.fetchAndHandleTaskDetail('1');
  }

  render() {
    const isFetching = this.props.task.isFetching;
    const taskDetail = this.props.task.taskDetail;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View
        style={styles.container} >

        <TaskDetail
          title={'Description'}
          text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"}
          icon={'ios-add-circle-outline'} />

        <TaskDetail
          title={'Diagnosis'}
          text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"}
          icon={'ios-add-circle-outline'} />

        <TaskDetail
          title={'Treatment'}
          text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.  Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum"}
          icon={'ios-add-circle-outline'} />

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
  },
  section: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 50,
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 18,
    color: 'grey',
  },
  sectionText: {
    fontSize: 16,
    paddingRight: 10,
    color: 'black',
  },
  icon: {
    fontSize: 25
  },

});

export default connect(mapStateToProps, actions)(TaskDetailsScreen);