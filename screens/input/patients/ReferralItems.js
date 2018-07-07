import React, { Component } from 'react';
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
    return (
      <AddPatientForm
        section={'referralItems'}
        nextScreen={'ReferralItems'}
        {...this.props} />
    );
  }
}

function mapStateToProps({ user, patient }) {
  return {
    user,
    patient,
  }
}

export default connect(mapStateToProps, actions)(ReferralItemsScreen);
