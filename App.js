import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store/index';

import RootContainer from './containers/root_container';

export default class App extends React.Component {

  render() {

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RootContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
