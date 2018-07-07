import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, AsyncStorage, ActivityIndicator, PickerIOS, TouchableOpacity } from 'react-native';
import { Avatar, Slider, Button } from 'react-native-elements';
import { SectionDescription } from '../components';
import _values from 'lodash/values';
import { connect } from 'react-redux';
import * as actions from '../actions';

const getThumbTintColor = (value) => {
  if (value === 1) {
    return 'red';
  } else if (value === 2) {
    return 'orange';
  } else if (value === 3) {
    return 'yellow';
  } else if (value === 4) {
    return 'lightgreen';
  } else if (value === 5) {
    return 'green';
  }
}

const SliderSection = props => {
  const {
    leftIndicatorText,
    rightIndicatorText,
    title,
    condition,
    onUpdateValue,
    min,
    max
  } = props;

  var {
    value,
  } = props;

  if (!value) { value = Math.round((max+min)/2) }

  return (
    <View
      style={{ flex: 1, alignItems: 'stretch', paddingBottom: 30 }} >
      <Text
        style={styles.smallSectionTitle} >{title}</Text>
      <View
        style={{flex: 1, flexDirection: 'row'}}>
        <Text
          style={styles.leftIndicator}>{leftIndicatorText}</Text>
        <Text
          style={styles.rightIndicator}>{rightIndicatorText}</Text>
      </View>
      <Slider
        value={value}
        thumbStyle={styles.thumb}
        onValueChange={(value) => onUpdateValue(condition.id, value)}
        step={1}
        minimumValue={min}
        maximumValue={max}
        thumbTintColor={condition && condition.wasEdited ? getThumbTintColor(value) : 'lightgrey'} />
    </View>
  )
}


class CareAssessmentScreen extends Component {
  state = {

  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Care Assessment',
      headerTitle: 'Care Visit',
    };
  }

  componentDidMount() {
    this.props.fetchAndHandlePatient('1')
  }

  _keyExtractor = (item, index) => item.id;

  _renderComponents = ({ item }) => {
    const name = item.name.replace(" ", "\n")


    return (
      <View
        style={{flex: 1, marginRight: 15}}>
        <Avatar
          medium
          rounded
          overlayContainerStyle={item.wasEdited && {backgroundColor: 'blue'} }
          icon={{name: 'favorite', size: 20}}
          onPress={() => this.props.navigation.navigate('CareAssessmentInput', { assessment: item })}
          activeOpacity={0.7} />
        <Text
          style={[styles.avatarTitle, item.wasEdited ? {color: 'royalblue'} : {color: 'grey'}]} >{name}</Text>
      </View>
    )
  }

  render() {
    const { isFetching, vitals, symptoms, conditions } = this.props.patient;
    const { updateConditionInput } = this.props;

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

        <SectionDescription
          title={"Vitals"}
          description={"Vitals that are measured based on a regular basis."} />

        <View
          style={styles.section} >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            data={_values(vitals)}
            renderItem={this._renderComponents} />
        </View>

        <SectionDescription
          title={"Symptoms"}
          description={"Symptoms that are measured based on a regular basis."} />

        <View
          style={styles.section} >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            data={_values(symptoms)}
            renderItem={this._renderComponents} />
        </View>

        <SectionDescription
          title={"Condition"}
          description={"Conditions that are measured based on a regular basis."} />

        <SliderSection
          title={"Mood"}
          condition={conditions && conditions["1"]}
          leftIndicatorText={"Sad"}
          rightIndicatorText={"Happy"}
          value={conditions && conditions["1"].input}
          max={5}
          min={1}
          onUpdateValue={updateConditionInput} />

        <SliderSection
          title={"Vitality"}
          condition={conditions && conditions["2"]}
          leftIndicatorText={"Faint"}
          rightIndicatorText={"Fit"}
          value={conditions && conditions["2"].input}
          max={5}
          min={1}
          onUpdateValue={updateConditionInput} />

        <SliderSection
          title={"Fatigue"}
          condition={conditions && conditions["3"]}
          leftIndicatorText={"Tired"}
          rightIndicatorText={"Energetic"}
          value={conditions && conditions["3"].input}
          max={5}
          min={1}
          onUpdateValue={updateConditionInput} />

        <View
          style={styles.button} >
          <Button
            raised
            fontSize={18}
            backgroundColor={'blue'}
            title={'Submit'}
            onPress={() => console.log("submit")} />
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
  smallSectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
    paddingBottom: 5,
  },
  leftIndicator: {
    flex: 1,
    textAlign: 'left',
    alignSelf: 'stretch',
    paddingLeft: 10,
    color: 'grey'
  },
  rightIndicator: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 10,
    color: 'grey'
  },
  sectionDescription: {
    fontSize: 14,
  },
  avatarTitle: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 11,
    fontWeight: 'bold',
  },
  button: {
    paddingBottom: 60,
  },
  thumb: {
    width: 35,
    height: 35,
    borderRadius: 35,
  }
})

export default connect(mapStateToProps, actions)(CareAssessmentScreen);