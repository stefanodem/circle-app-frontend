import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  AsyncStorage,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { Card, ListItem, Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReadMore from 'react-native-read-more-text';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { Comment } from '../components';
import { InputToolbar } from 'react-native-gifted-chat';
import { MIN_COMPOSER_HEIGHT } from '../config/constants';

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
            numberOfLines={2}>
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
            activeOpacity={0.7} />
          <Avatar
            containerStyle={{ marginRight: 10 }}
            small
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7} />
        </View>
      </View>
    </View>
  )
}

class TaskDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Task Feed',
      headerTitle: 'Person Name',
    };
  }

  _onInputTextChange(text) {
    if (text) {
      this.setState({
        commentText: text,
      });
    }
  }

  _onSubmitComment(uid, taskId, message) {
    if (message) {
      this.setState({
        commentText: '',
      });
      this.props.submitComment(uid, taskId, message)
    }
  }

  render() {
    const isFetching = this.props.task.isFetching;
    const taskId = this.props.navigation.state.params ? this.props.navigation.state.params.taskId : null;
    const taskDetails = this.props.task.tasks[taskId];
    const comments = _values(taskDetails.comments);
    const user = this.props.user;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
      <ScrollView>

        <View
          style={styles.taskContainer} >

          <TaskDetail
            title={'Task'}
            text={ taskDetails.taskDescription }
            icon={'assignment'}
            iconColor={'grey'} />

          <TaskDetail
            title={'Diagnosis / Problem'}
            text={ taskDetails.diagnosis }
            icon={'local-hospital'}
            iconColor={'grey'} />

          <TaskDetail
            title={'Goal'}
            text={ taskDetails.goal }
            icon={'event-available'}
            iconColor={'grey'} />

          <TaskDetail
            title={'Time / Interval'}
            text={ taskDetails.time }
            icon={'schedule'}
            iconColor={'grey'} />

          <TaskAssignees
            title={'Circlers'}
            icon={'people'}
            iconColor={'grey'} />

        </View>

        <View>

          <View
            style={styles.commentBar}>
            <Text
              style={{ fontSize: 18, color: 'grey' }}>{'Comments'}</Text>
          </View>

          {comments &&
            comments.map(comment => {
              return (
                <Comment
                  key={comment.id}
                  avatar={comment.avatar}
                  name={comment.name}
                  date={comment.lastUpdated && comment.createdAt}
                  comment={comment.body} />
              )
            })}

        </View>

      </ScrollView>

      <InputToolbar
        composerHeight={MIN_COMPOSER_HEIGHT}
        text={this.state.commentText}
        onTextChanged={(text) => this._onInputTextChange(text)}
        onSend={messages => this._onSubmitComment(user.info.uid, taskId, messages.text)} />

      </View>
    );
  }
}

function mapStateToProps({ user, task }) {
  return {
    user, task,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: MIN_COMPOSER_HEIGHT,
  },
  taskContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  section: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    fontSize: 22,
  },
  avatars: {
    flexDirection: 'row',
  },
  commentBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'grey',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    height: 20,
    backgroundColor: '#fff',
  }
});

export default connect(mapStateToProps, actions)(TaskDetailsScreen);