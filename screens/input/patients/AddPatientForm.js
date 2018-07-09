import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Modal, Dimensions, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { SectionDescription, PatientInputItem, NextButton, InputModal } from 'app/components';
import { connect } from 'react-redux';
import * as actions from 'app/actions';
import _values from 'lodash/values';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

class AddPatientForm extends Component {
  state = {
    modal: {
      id: null,
      visible: false,
    },
  };

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'AddPatientForm',
      headerTitle: 'Add Patient Form',
      tabBarVisible: false,
    }
  }

  _renderForm = ({ item, index }) => {
    const { newPatientForm } = this.props.patient;
    const { section } = this.props;

    return (
      <PatientInputItem
        id={item.id}
        inputType={item.type}
        label={item.label}
        placeholder={item.placeholder}
        value={item.value}
        sectionType={newPatientForm[section] && newPatientForm[section].sectionType}
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
    const { isFetching, newPatientForm } = this.props.patient;
    const { updateAddPatientFormValue, section, nextScreen } = this.props;
    const { navigate } = this.props.navigation;
    const form = newPatientForm[section];
    const selectedInputId = this.state.modal.id;
    const selectedInput = selectedInputId && newPatientForm[section]
                          ? newPatientForm[section].input.find(input => input.id === selectedInputId)
                          : null;
    const formIsCompleted = newPatientForm[section] &&
                            newPatientForm[section].input.every(input => input.value !== null)

    if (!form) {
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
          style={styles.container}
          contentContainerStyle={styles.contentContainer} >

          <SectionDescription
            title={form.title}
            description={form.description} />


          {this._renderFormSection(
            this._keyExtractor,
            form.input,
            this._renderForm)}

          {selectedInput &&
            <InputModal
              id={selectedInputId}
              sectionType={form.sectionType}
              value={selectedInput.value}
              options={selectedInput.options}
              onValueChange={updateAddPatientFormValue}
              setModalVisible={this._setModalVisible}
              modalVisible={this.state.modal.visible} />
          }


        </ScrollView>

        {formIsCompleted &&
          <NextButton
            onPress={() => navigate(nextScreen)} />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
  }
});

export default AddPatientForm;
