import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NextButton = props => {
  const {
    onPress,
  } = props;

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={styles.textContainer}>
        <Text
          style={styles.text}>{'Next'}</Text>
        <Icon
          style={styles.icon}
          name={'chevron-right'}
          size={24}
          color={'white'} />
      </View>
     </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    width: 100,
    height: 45,
    backgroundColor:'red',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset:{  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  icon: {
    textAlign: 'center',
    marginTop: 2.5,
    fontSize: 24,
  }
})

export default NextButton;
