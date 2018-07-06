import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Modal, Dimensions, Picker } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { SectionDescription, PatientInputItem } from 'app/components';
import { connect } from 'react-redux';
import * as actions from 'app/actions';
import _values from 'lodash/values';

import { addPatientForm } from 'app/testData/testData'

const InputModal = props => {
  const {
    id,
    sectionType,
    value,
    options,
    modalVisible,
    setModalVisible,
    onValueChange,
  } = props;



  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>

      <TouchableWithoutFeedback
        onPress={() => setModalVisible(id, !modalVisible)} >
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>

        <TouchableOpacity
          style={styles.modalSubmitButton}
          onPress={() => setModalVisible(id, !modalVisible) }>
          <Text>Done</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onValueChange(sectionType, id, itemValue)} >
          {options && options.map((option, index) => {
            return (
              <Picker.Item
                key={option.id}
                label={option.name}
                value={option.name} />
            )
          })}
        </Picker>

      </View>

    </Modal>
  );
}

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

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
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
    );
  }
}

function mapStateToProps({ user, patient }) {
  return {
    user,
    patient,
  }
}

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#00000080',
  },
  modalContainer: {
    width: SCREEN.width,
    height: SCREEN.height / 3,
    backgroundColor: '#fff',
  },
  modalSubmitButton: {
    marginRight: 15,
    marginTop: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default connect(mapStateToProps, actions)(PersonalInformationScreen);
