import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReadMore from 'react-native-read-more-text';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const TaskDetail = ({ title, text, icon, iconColor }) => {
  return (
    <View
      style={styles.section} >
      <Icon
        name={ icon }
        style={[ styles.icon ]}
        color={ iconColor } />
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

const TaskAssignees = ({ title, icon, iconColor }) => {
  return (
    <View
      style={styles.section} >
      <Icon
        name={ icon }
        style={[ styles.icon ]}
        color={ iconColor } />
      <View
        style={{ paddingLeft: 10 }} >
        <Text
          style={styles.sectionTitle} >
          { title }
        </Text>
        <View
          style={styles.avatars} >
          <Avatar
            containerStyle={{ marginRight: 10 }}
            small
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Avatar
            containerStyle={{ marginRight: 10 }}
            small
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        </View>
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
    const taskId = this.props.navigation.state.params;
    const taskDetails = this.props.task.tasks[taskId];

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
          title={'Task'}
          text={ taskDetails.taskDescription }
          icon={'assignment'}
          iconColor={'brown'} />

        <TaskDetail
          title={'Diagnosis / Problem'}
          text={ taskDetails.diagnosis }
          icon={'local-hospital'}
          iconColor={'red'} />

        <TaskDetail
          title={'Goal'}
          text={ taskDetails.goal }
          icon={'event-available'}
          iconColor={'green'} />

        <TaskDetail
          title={'Time / Interval'}
          text={ taskDetails.time }
          icon={'schedule'}
          iconColor={'black'} />

        <TaskAssignees
          title={'Circlers'}
          icon={'people'}
          iconColor={'blue'} />

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
    paddingLeft: 10,
    paddingRight: 50,
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 18,
    color: 'grey',
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    paddingRight: 10,
    color: 'black',
  },
  icon: {
    fontSize: 22
  },
  avatars: {
    flexDirection: 'row',
  },
});

export default connect(mapStateToProps, actions)(TaskDetailsScreen);