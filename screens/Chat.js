import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { GiftedChat } from 'react-native-gifted-chat'

class Chat extends React.Component {
  state = {
    messages: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Chat',
      headerTitle: 'Chat',
      //TODO: connect navigation to redux and get care-receiver name
      //can be String, React Element or React Componen
      //header: can be React Element or a function --> for customizing headers
    };
  }

  componentDidMount() {
    //TODO: hook up to API and load existing messages into this.state
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    const user = this.props.user;

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          user: {
            _id: user.id,
            name: user.name,
            avatar: user.avatar,
          },
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