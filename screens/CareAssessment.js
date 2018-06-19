import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CareAssessmentScreen extends Component {
  state = {

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

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a Template</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(mapStateToProps, actions)(CareAssessmentScreen);