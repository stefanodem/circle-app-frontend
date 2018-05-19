import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';


class NewTaskScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'NewTask',
      headerTitle: 'New Task',
      //TODO: connect navigation to redux and get care-receiver name
      //can be String, React Element or React Componen
      //header: can be React Element or a function --> for customizing headers
    };
  }

  render() {

    const updateNewTaskText = this.props.updateNewTaskText;

    return (
      <View>

        <View>
          <FormLabel>Task Name</FormLabel>
          <FormInput onChangeText={(text) => updateNewTaskText('name', text)}/>
        </View>

        <View>
          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={(text) => updateNewTaskText('description', text)}/>
        </View>

        <View>
          <FormLabel>Complete By</FormLabel>
          <FormInput onChangeText={(text) => updateNewTaskText('completeDate', text)}/>
        </View>

        <View>
          <FormLabel>Assign to</FormLabel>
          <FormInput onChangeText={(text) => updateNewTaskText('assignee', text)}/>
        </View>

        <View
          style={{paddingTop: 20}} >
          <Button
            raised
            fontSize={18}
            icon={{name: 'check'}}
            backgroundColor='green'
            title='Submit'
            onPress={() => console.log('Submitted')} />
        </View>

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
});

export default connect(mapStateToProps, actions)(NewTaskScreen);