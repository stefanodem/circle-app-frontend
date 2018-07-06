import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Picker,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';



const PickerItem = props => {
  const {
    id,
    sectionType,
    label,
    placeholder,
    value,
    setModalVisible,
  } = props;

  return (
    <View>

      <View
        style={styles.pickerContainer}>
        <FormLabel
          labelStyle={styles.formLabel}>{label}</FormLabel>
        <TouchableOpacity
          onPress={() => setModalVisible(id, true)}>
        {value
          ? <Text>{value}</Text>
          : <Text style={styles.placeholderText}>{placeholder}</Text>}
        </TouchableOpacity>
      </View>

    </View>
  )
}

const FormItem = props => {
  const {
    id,
    label,
    placeholder,
    sectionType,
    onValueChange,
  } = props;

  return (
    <View
        style={styles.pickerContainer}>
      <FormLabel
        labelStyle={styles.formLabel}>{label}</FormLabel>
      <TextInput
        placeholder={placeholder}
        style={styles.formItemText}
        onChangeText={(text) => onValueChange(sectionType, id, text)} />
      {/*<FormValidationMessage
        labelStyle={{ marginLeft: 0}} >{'This field is required'}</FormValidationMessage>*/}
    </View>
  );
}

const PatientInputItem = props => {
  const {
    id,
    label,
    value,
    placeholder,
    errorMessage,
    inputType,
    sectionType,
    onValueChange,
    setModalVisible,
  } = props;

  const _getInputItem = (inputType, label, onValueChange) => {
    switch (inputType) {
      case 'text':
        return (
          <FormItem
            id={id}
            label={label}
            placeholder={placeholder}
            sectionType={sectionType}
            onValueChange={onValueChange} />
        );
      case 'multiOption':
        return (
          <PickerItem
            id={id}
            sectionType={sectionType}
            label={label}
            placeholder={placeholder}
            value={value}
            setModalVisible={setModalVisible} />
        );
    }
  };

  return (
    <View>

      {_getInputItem(inputType, label, onValueChange)}

    </View>
  )
}

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  pickerText: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
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
  formLabel: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingBottom: 15,
    color: 'grey',
  },
  pickerContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formItemText: {
    fontSize: 14,
  },
  placeholderText: {
    color: 'lightgrey',
  }
})

export default PatientInputItem;
