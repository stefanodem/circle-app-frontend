import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Task = props => {
  const {
    taskId,
    taskTitle,
    navigate,
  } = props;

  return (
    <TouchableWithoutFeedback
      onPress={ () => navigate('TaskDetails', {taskId}) } >

      <Card>

        <Text style={{ marginBottom: 30 }}>
          {taskTitle}
        </Text>

        {/* CardMetrics */}
        <View
          style={ styles.metricsContainer } >

          <Icon
            name={'calendar-o'}
            size={16} />

          <Text
            style={ styles.metricsText } >

            { `  ${'05/15/2018'}` }

          </Text>

          <Icon
            name={'envelope-o'}
            size={16} />

          <Text
            style={ styles.metricsText } >

            { `  ${3}` }

          </Text>

          <Icon
            name={'paperclip'}
            size={16} />

          <Text
            style={ styles.metricsText } >

            { `  ${3}` }

          </Text>

        </View>

        {/* CardButtons */}

        <View style={styles.buttonContainer}>
          <Button
            //raised
            fontSize={14}
            icon={{ name: 'check' }}
            backgroundColor='grey'
            //fontFamily='Lato'
            buttonStyle={{ height: 35, width: 110 }}
            title='Complete' />
          <Button
            //raised
            fontSize={14}
            icon={{ name: 'delete' }}
            backgroundColor='grey'
            //fontFamily='Lato'
            buttonStyle={{ height: 35, width: 110 }}
            title='Dismiss' />
          <Button
            //raised
            icon={{ name: 'message' }}
            fontSize={14}
            backgroundColor='grey'
            //fontFamily='Lato'
            buttonStyle={{ height: 35, width: 110 }}
            title='Message' />
        </View>

      </Card>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0,
    paddingTop: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderBottomColor: '#bbb',
  },
  metricsText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 15,
    paddingBottom: 10,
  },
})

export default Task;
