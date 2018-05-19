import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TemplateScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a Template</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, actions)(TemplateScreen);