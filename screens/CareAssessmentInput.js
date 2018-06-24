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

const PickerSection = (props) => {
  const {
    assessmentId,
    assessmentType,
    inputType,
    value,
    max,
    min,
    metric,
    choices,
    onValueChange,
    // secondValue,
    // secondMax,
    // secondMin,
    // secondMetric,
    // secondChoices,
    // onSecondValueChange,
  } = props;

  let pickerItem;

  if (inputType === 'Integer') {
    pickerItem = getPickerItems(max, min);
  } else if (inputType === 'String' && choices) {
    pickerItem = choices.map(choice => {
      return (
        <Picker.Item
          key={choice.id}
          label={String(choice.id)}
          value={choice.title} />
      )
    })
  }

  return (
    <View
      style={{flexDirection: 'row'}} >
      <Picker
        selectedValue={value}
        style={{ flex: 4 }}
        onValueChange={(itemValue, itemIndex) => onValueChange(assessmentId, assessmentType, itemValue)}>
        {pickerItem}
      </Picker>
      <Text
        style={styles.pickerText}>{metric}</Text>
    </View>
  )
}

const BadgeSection = (props) => {
  const {
    assessmentId,
    assessmentType,
    choices,
    checked,
    onPress,
  } = props;

  return (
    <View
      style={styles.badgeContainer} >
      {choices &&
        choices.map(choice => {
          return (
            <TouchableHighlight
              key={choice.id}
              onPress={() => onPress(choice.id, assessmentId, assessmentType)}
              style={choice.checked ? styles.checkedBadge : styles.uncheckedBadge}
              underlayColor={'white'} >
              <Text
                style={choice.checked ? styles.checkedBadgeText : styles.uncheckedBadgeText}>{choice.title}</Text>
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
    const { isFetching } = this.props.patient;
    const navAssessment = this.props.navigation.state.params.assessment;
    const assessment = this.props.patient[navAssessment.assessmentType][navAssessment.id]
    let inputSection;
    console.log(assessment)

    if (navAssessment.assessmentType === 'vitals') {
      inputSection = (
        <View>
          <PickerSection
            assessmentId={assessment.id}
            assessmentType={assessment.assessmentType}
            inputType={assessment.inputType}
            value={assessment.input}
            onValueChange={this.props.updateAssessmentInput}
            metric={assessment.metric} />

          {assessment.wasEdited &&
            <BadgeSection
              assessmentId={assessment.id}
              assessmentType={assessment.assessmentType}
              choices={assessment.dimensions}
              onPress={this.props.toggleBadge} />}
        </View>
      )

    } else if (navAssessment.assessmentType === 'symptoms') {
      inputSection =  (
        <BadgeSection
          assessmentId={assessment.id}
          assessmentType={assessment.assessmentType}
          choices={assessment.symptoms}
          onPress={this.props.toggleBadge} />
      )
    }

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
          title={assessment.name}
          description={assessment.description} />

        {inputSection}

        {assessment.wasEdited &&
          <View
          style={styles.button} >
            <Button
              raised
              fontSize={18}
              backgroundColor={'blue'}
              title={'Submit'}
              onPress={() => this.props.navigation.goBack()} />
          </View>}

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
    paddingTop: 20,
    paddingBottom: 20,
  },
  checkedBadge: {
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
  checkedBadgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uncheckedBadge: {
    margin: 7,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'blue',
    height: 35,
    width: 95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  uncheckedBadgeText: {
    color: 'blue',
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
