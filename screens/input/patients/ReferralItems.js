import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AddPatientForm from './AddPatientForm';
import { connect } from 'react-redux';
import * as actions from 'app/actions';

class ReferralItemsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'ReferralItems',
      headerTitle: 'Referral Items',
      tabBarVisible: false,
    }
  }

  render() {
    const { isFetching } = this.props.patient;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <AddPatientForm
        section={'referralItems'}
        nextScreen={'ReferralItems'}
        {...this.props} />
    );
  }
}

function mapStateToProps({ patient }) {
  return {
    patient,
  }
}

export default connect(mapStateToProps, actions)(ReferralItemsScreen);
