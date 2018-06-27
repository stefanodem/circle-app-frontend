import React from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = props => {
  const {

  } = props;

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.7}>
      <Icon
        style={styles.icon}
        name={'plus'}
        size={24}
        color={'white'} />
     </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    width: 55,
    height: 55,
    backgroundColor:'red',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:{  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  icon: {
    textAlign: 'center',
  }
})

export default AddButton;
