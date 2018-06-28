// import React, { Component } from 'react';
// import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
// import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
// import _values from 'lodash/values';
// import { CalendarList } from 'react-native-calendars';


// class CalendarScreen extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const { navigate } = navigation;
//     return {
//       title: 'Calendar',
//       headerTitle: 'Calendar',
//     }
//   }

//   componentDidMount() {
//   }

//   render() {

//     return (
//       <View>


//       </View>
//     );
//   }
// }

// function mapStateToProps({ user }) {
//   return {
//     user,
//   }
// }

// const styles = StyleSheet.create({
// });

// export default connect(mapStateToProps, actions)(CalendarScreen);


import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator, Animated } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { CalendarList, Agenda } from 'react-native-calendars';
import { AddButton } from '../components';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const CalendarItem = (props) => {
  const {
    name,
    title,
    subtitle,
    navigate
  } = props;

  return (
    <TouchableWithoutFeedback
      //onPress={ () => navigate('TaskDetails', {taskId}) } >
      onPress={ () => navigate('PatientCare') } >

      <Card>
        <View
          style={styles.calendarItemContainer} >
          <Avatar
            containerStyle={{ marginRight: 10 }}
            small
            rounded
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7} />

          <View
            style={styles.titleContainer} >
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          </View>
        </View>


      </Card>
    </TouchableWithoutFeedback>
  );
}

class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Calendar',
      headerTitle: 'Calendar',
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  loadItems(day) {
    console.log(day)
    setTimeout(() => {
      for (let i = -5; i < 50; i++) {
        // per i generate one more day
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    console.log(this.props.navigation)
    return (
      <CalendarItem
        name='Pipi Langstrumpf'
        title='Important treatment'
        subtitle={item.name}
        navigate={this.props.navigation.navigate} />
    )
    // return (
    //   <TouchableWithoutFeedback
    //     onPress={() => console.log('pressed item!')}>
    //   <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    //   </TouchableWithoutFeedback>
    // );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    console.log(Object.keys(this.state.items).length)
    return (
      <View
        style={{flex: 1}}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={(month) => this.loadItems(month)}
          selected={'2017-05-16'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
           // monthFormat={'yyyy'}
           // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
        <AddButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  title: {
    fontSize: 14,
    paddingBottom: 4,
  },
  subtitle: {
    color: 'grey',
    fontSize: 14,
    paddingBottom: 4,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    padding: 20,
    height: 15,
    flex:1,
    paddingTop: 30,
  }
});



function mapStateToProps({ user }) {
  return {
    user,
  }
}

export default connect(mapStateToProps, actions)(CalendarScreen);
