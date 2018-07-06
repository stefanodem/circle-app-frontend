import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Modal, Dimensions, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { SectionDescription, PatientInputItem, NextButton, InputModal } from 'app/components';
import { connect } from 'react-redux';
import * as actions from 'app/actions';
import _values from 'lodash/values';

class PersonalInformationScreen extends Component {
  state = {
    modal: {
      id: null,
      visible: false,
    },
  };

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

  _renderForm = ({ item, index }) => {
    const { add } = this.props.patient;

    return (
      <PatientInputItem
        id={item.id}
        inputType={item.type}
        label={item.label}
        placeholder={item.placeholder}
        value={item.value}
        sectionType={add.personalInfo.sectionType}
        onValueChange={this.props.updateAddPatientFormValue}
        setModalVisible={this._setModalVisible} />
    )
  }

  _keyExtractor = (item, index) => item.id

  _renderFormSection = (keyExtractor, items, renderInput) => {
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderInput} />
    )
  }

  _setModalVisible = (id, visible) => {
    this.setState({modal: {id, visible}})
  }

  render() {
    const { isFetching, add } = this.props.patient;
    const { uid } = this.props.user.info;
    const { updateAddPatientFormValue } = this.props;
    const modalId = this.state.modal.id;
    const input = modalId && add.personalInfo.input.find(input => input.id === modalId)
    const formIsCompleted = add.personalInfo && add.personalInfo.input.every(input => input.value !== null)

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View
        style={{flex: 1}}>
        <ScrollView
          style={styles.container}>

          <SectionDescription
            title={add.personalInfo.title}
            description={add.personalInfo.description} />

          {this._renderFormSection(
            this._keyExtractor,
            add.personalInfo.input,
            this._renderForm)}

          <InputModal
            id={this.state.modal.id}
            sectionType={add.personalInfo.sectionType}
            value={input && input.value}
            options={input && input.options}
            onValueChange={updateAddPatientFormValue}
            setModalVisible={this._setModalVisible}
            modalVisible={this.state.modal.visible} />

        </ScrollView>

        {formIsCompleted &&
        <NextButton
          onPress={() => this.props.navigation.navigate('ReferralItems')} />}

      </View>
    );
  }
}

function mapStateToProps({ user, patient }) {
  return {
    user,
    patient,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default connect(mapStateToProps, actions)(PersonalInformationScreen);