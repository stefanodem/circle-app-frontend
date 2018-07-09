import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Modal, Dimensions, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { TextFormItem } from 'app/components';
import { connect } from 'react-redux';
import * as actions from 'app/actions';
import _values from 'lodash/values';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

class GroupSettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    const { createNewChat } = navigation.state.params || {};
    return {
      title: 'GroupSettings',
      headerTitle: 'Group Settings',
      // headerRight: (
      //   <TouchableOpacity
      //     onPress={createNewChat}>
      //     <Text>Create</Text>
      //   </TouchableOpacity>
      // ),
    }
  }

  render() {
    const { name } = this.props.user.chat.newGroupSettings;
    const { updateNewChatGroupName } = this.props;
    const { info, circle } = this.props.user;
    const { newGroupSettings } = this.props.user.chat;
    const selectedMembers = _values(circle.caregiver).filter(member => member.selected);
    const { navigation } = this.props;

    return (
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer} >

        <TextFormItem
          value={name}
          label={'Group Name'}
          placeholder={'Please provide new group name...'}
          onChangeText={updateNewChatGroupName} />

        {name.length > 0 &&
          <View
            style={styles.button} >
            <Button
              raised
              fontSize={18}
              backgroundColor={'blue'}
              title={'Submit'}
              onPress={() => this.props.createNewChat(info.uid, selectedMembers, newGroupSettings, navigation)} />
          </View>}

      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
  button: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 60,
  },
});

export default connect(mapStateToProps, actions)(GroupSettingsScreen);
