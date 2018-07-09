import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

const TextFormItem = props => {
  const {
    value,
    label,
    placeholder,
    onChangeText,
    ...rest,
  } = props;

  return (
    <View
        style={styles.container}>
      <FormLabel
        labelStyle={styles.formLabel}>{label}</FormLabel>
      <TextInput
        value={value}
        placeholder={placeholder}
        style={styles.formItemText}
        onChangeText={(text) => onChangeText(text, rest)} />
      {/*<FormValidationMessage
        labelStyle={{ marginLeft: 0}} >{'This field is required'}</FormValidationMessage>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingBottom: 15,
    color: 'grey',
  },
  container: {
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formItemText: {
    fontSize: 14,
  },
})

export default TextFormItem;
