import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const SectionDescription = props => {
  const {
    title,
    description,
  } = props;

  return (
    <View
      style={styles.section} >
      <Text
        style={styles.sectionTitle} >
        {title}
      </Text>
      <Text
        style={styles.sectionDescription} >
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: 'grey',
    paddingBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
  },
})

export default SectionDescription;
