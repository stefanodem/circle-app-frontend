import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { GiftedChat } from 'react-native-gifted-chat'

class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Chat',
      headerTitle: 'Chat',
    };
  }

  render() {
    const { chatId } = this.props.navigation.state.params;
    const { uid, name, avatar } = this.props.user.info;
    const { inbox, isPosting } = this.props.user;
    const { messages } = inbox[chatId];
    const { sendingMessage } = this.props;

    return (
      <GiftedChat
        messages={messages}
        onSend={messages => sendingMessage(uid, chatId, messages)}
        user={{
          _id: uid,
          name: name,
          avatar: avatar,
        }}
      />
    )
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

export default connect(mapStateToProps, actions)(Chat);
