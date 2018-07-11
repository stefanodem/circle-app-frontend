import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { AddButton } from '../components';
import { formatTimestamp } from '../utils';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { SCROLL_PADDING_BOTTOM, userSettings } from 'app/config';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Settings',
      headerTitle: 'Settings',
    };
  }

  componentDidMount () {
    //this.props.fetchAndHandleUserPatients('1');
  }

  render() {
    const {isFetching, error } = this.props.user;
    const { navigate } = this.props.navigation;
    //console.log(patients)

    // if (isFetching) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // } else if (error) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //       <Text>{error}</Text>
    //     </View>
    //   )
    // }

    return (
      <View
        style={{flex: 1}}>
        <ScrollView
          style={styles.contentContainer}>

          <View>
            {_values(userSettings).map(setting => {
              return (
                <ListItem
                  key={setting.id}
                  onPress={() => navigate('SettingsDetails')}
                  containerStyle={styles.container}
                  leftIcon={{ name: setting.icon.name, color: setting.icon.color, type: 'material-community' }}
                  title={setting.title} />
              )
            })}
          </View>

        </ScrollView>

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

export default connect(mapStateToProps, actions)(SettingsScreen);
