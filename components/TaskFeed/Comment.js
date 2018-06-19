import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Avatar } from 'react-native-elements';

const Comment = props => {
  const {
    avatar,
    name,
    date,
    comment,
  } = props;

  return (
    <View
      style={styles.container} >

      <Avatar
        small
        rounded
        //onPress{onProfilePress}
        source={{uri: avatar}} />

      <View
        style={{ paddingLeft: 10 }} >

          <View
            style={styles.headerContainer} >

            <Text
              style={styles.name} >{name}</Text>
            <Text
              style={styles.date} >{date}</Text>

          </View>

          <View
            style={styles.commentContainer} >

            <Text
              style={styles.comment} >{comment}</Text>

          </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  commentContainer: {

  },
  name: {
    fontWeight: 'bold',
  },
  date: {
    paddingLeft: 10,
    color: 'grey',
  },
  comment: {
    paddingRight: 10,
    color: 'black',
  }
})

export default Comment;
