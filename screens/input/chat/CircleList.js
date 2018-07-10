import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NextButton } from 'app/components';
import { connect } from 'react-redux';
import * as actions from 'app/actions';
import _values from 'lodash/values';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

class CircleListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'CircleList',
      headerTitle: 'Add Members',
    };
  }

  componentDidMount () {
    this.props.fetchAndHandleUserCircle('1');
  }

  _renderCircleMember = ({ item }) => {
    const { selectCircleMember } = this.props

    return (
      <ListItem
        key={item.id}
        onPress={() => selectCircleMember(item.type, item.id)}
        rightIcon={
          item.selected
          ? {
            name: 'check-circle',
            color: 'blue',
            type: 'font-awesome',
            style: { fontSize: 32 }
          }
          : {
            name: 'check-circle',
            color: 'grey',
            type: 'font-awesome',
            style: { fontSize: 32 }
          }
        }
        containerStyle={styles.container}
        roundAvatar
        avatar={{uri: item.avatar}}
        title={item.name} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderCircleList = (keyExtractor, circle, renderCircle) => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyExtractor={keyExtractor}
        data={circle}
        renderItem={renderCircle} />
    )
  }

  render() {
    const {isFetching, error, circle, info } = this.props.user;
    const { navigation } = this.props;
    const selectedMembers = _values(circle.caregiver).filter(member => member.selected);

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

        <View>
          {this._renderCircleList(
            this._keyExtractor,
            _values(circle.caregiver),
            this._renderCircleMember)}
        </View>

        {selectedMembers.length === 0
          ? <View></View>
          : (selectedMembers.length > 1
              ? <NextButton
                  onPress={() => navigation.navigate('GroupSettings')} />
              : <NextButton
                  onPress={() => this.props.createNewChat(info.uid, selectedMembers, {}, navigation)} />)
        }

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
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
});

export default connect(mapStateToProps, actions)(CircleListScreen);
