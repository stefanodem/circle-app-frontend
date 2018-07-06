import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Dimensions,
  Picker } from 'react-native';

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
          <Picker.Item
            key={0}
            label={''}
            value={null} />
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

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
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

export default InputModal;
