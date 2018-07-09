import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { AddButton } from '../components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

import { Task, NewTaskButton } from '../components';

class InboxScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Inbox',
      headerTitle: 'Inbox',
    };
  }

  componentDidMount () {
    if (!this.props.user.chat.inbox) {
      this.props.fetchAndHandleUserInbox('1');
    } else {
      this.props.removeFetchingUserPatients();
    }
  }

  _renderChat = ({ item }) => {
    const { navigate } = this.props.navigation;
    const lastMessage = item.messages.length > 0 && item.messages[0] ? item.messages[0].text : '';

    return (
      <ListItem
        key={item.id}
        onPress={() => navigate('Chat', {chatId: item.id})}
        containerStyle={styles.container}
        roundAvatar
        avatar={item.avatar ? {uri: item.avatar} : require('app/assets/profile-icon.png')}
        title={item.title ? item.title : _values(item.users)[0].name}
        subtitle={lastMessage} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderInbox = (keyExtractor, inbox, renderInbox) => {
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={inbox}
        renderItem={renderInbox} />
    )
  }

  render() {
    const { isFetching, isPosting, error } = this.props.user;
    const { inbox } = this.props.user.chat;
    const { navigate } = this.props.navigation;

    if (isFetching || isPosting) {
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
    //console.log(this.props.user)

    return (
      <View
        style={{flex: 1}}>

        <ScrollView>

          <View>
            {this._renderInbox(
                this._keyExtractor,
                _values(inbox),
                this._renderChat)}
          </View>


        </ScrollView>

        <AddButton
          onPress={() => navigate('CircleList')} />

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
});

export default connect(mapStateToProps, actions)(InboxScreen);
