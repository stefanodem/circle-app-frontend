import React, { Component } from 'react';
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
    const { uid } = this.props.user.info;
    this.props.fetchingAddPatientForm(uid);
  }

  render() {
    return (
      <AddPatientForm
        section={'personalInfo'}
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

export default connect(mapStateToProps, actions)(PersonalInformationScreen);
