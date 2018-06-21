import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, AsyncStorage, ActivityIndicator, Picker, TouchableHighlight } from 'react-native';
import { Avatar, Slider, Button, SocialIcon } from 'react-native-elements';
import _values from 'lodash/values';
import { connect } from 'react-redux';
import * as actions from '../actions';

const getPickerItems = (max, min) => {
  return [...Array(150).keys()].map(index => {
    return (
       <Picker.Item
        key={index}
        label={String(index)}
        value={index} />
    )
  })
}

const PickerSection = (props) => {
  const {
    value,
    max,
    min,
    metric,
    choices,
    onValueChange,
    secondValue,
    secondMax,
    secondMin,
    secondMetric,
    secondChoices,
    onSecondValueChange,
  } = props;

  return (
    <View
      style={{flexDirection: 'row'}} >
      <Picker
        selectedValue={value}
        style={{ flex: 4 }}
        onValueChange={(itemValue, itemIndex) => console.log('hi')}>
        {getPickerItems(max, min)}
      </Picker>
      <Text
        style={styles.pickerText}>{metric}</Text>
    </View>
  )
}

const BadgeSection = (props) => {
  const {
    choices,
    checked,
  } = props;

  return (
    <View
      style={styles.badgeContainer} >
      {choices &&
        choices.map(choice => {
          return (
            <TouchableHighlight
              key={choice.id}
              style={styles.badge}
              underlayColor={'white'} >
              <Text
                style={styles.badgeText}>{choice.title}</Text>
            </TouchableHighlight>
          )
        })}
    </View>
  )
}


class CareAssessmentInputScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Care Assessment Input',
      headerTitle: 'Input',
    };
  }

  render() {
    const { isFetching, vitals, symptoms, conditions } = this.props.patient;
    const assessment = this.props.navigation.state.params.assessment;
    console.log(assessment)

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container} >

        <View
          style={styles.section} >
          <Text
            style={styles.sectionTitle} >
            {assessment.name}
          </Text>
          <Text
            style={styles.sectionDescription} >
            {assessment.description}
          </Text>
        </View>

        <PickerSection
          value={5}
          metric={"mg/dL"} />

        <BadgeSection
          choices={assessment.symptoms} />

        <View
          style={styles.button} >
          <Button
            raised
            fontSize={18}
            backgroundColor={'blue'}
            title={'Submit'}
            onPress={() => this.props.navigation.goBack()} />
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
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
  button: {
    paddingBottom: 60,
  },
  badgeContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  badge: {
    margin: 7,
    borderRadius: 30,
    height: 35,
    width: 95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'blue',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pickerText: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18
  },
})

export default connect(mapStateToProps, actions)(CareAssessmentInputScreen);
