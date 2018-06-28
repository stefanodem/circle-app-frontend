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
    this.props.fetchAndHandleUserInbox('1');
  }

  _renderChat = ({ item }) => {
    const { navigate } = this.props.navigation;

    return (
      <ListItem
        key={item.id}
        onPress={() => navigate('Chat', {chatId: item.id})}
        containerStyle={styles.container}
        roundAvatar
        avatar={{uri: item.avatar}}
        title={item.title ? item.title : _values(item.users)[0].name}
        subtitle={item.messages[0].text} />
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
    const {isFetching, error, inbox} = this.props.user;

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

        <AddButton />

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
