import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AddPatientForm from './AddPatientForm';
import { connect } from 'react-redux';
import * as actions from 'app/actions';

class PersonalInformationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'PersonalInformation',
      headerTitle: 'Personal Information',
      tabBarVisible: false,
    }
  }

  componentDidMount() {
    this.props.fetchingAddPatientForm(this.props.uid);
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
        section={'personalInfo'}
        nextScreen={'ReferralItems'}
        {...this.props} />
    );
  }
}

function mapStateToProps({ user, patient }) {
  const { uid } = user.info;

  return {
    uid,
    patient,
  }
}

export default connect(mapStateToProps, actions)(PersonalInformationScreen);
