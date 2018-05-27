import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { CheckBox, Slider, FormLabel, FormInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const deviceWidth = Dimensions.get('window').width;

//TODO: create a class of responses --> e.g. Response.BinaryChoice, Response.IntervalScale

const PersonalInformation = ({ question, gender, onResponseChange, onResponseSubmit }) => {
  return (
    <View
      style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }} >

      <View
        style={{ flex: 1.5, flexDirection: 'row'  }} >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 18, borderWidth: 4, borderColor: gender === 'male' ? 'blue' : 'grey' }}
          onPress={() => onResponseChange('male', 'personal-information', 'gender')} >
          <Icon
              name={'male'}
              style={{ fontSize: 60 }} />
        </TouchableOpacity>

        <View style={{ width: 20 }} />

        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 18, borderWidth: 4, borderColor: gender === 'female' ? 'blue' : 'grey' }}
          onPress={() => onResponseChange('female', 'personal-information', 'gender')} >
          <Icon
            name={'female'}
            style={{ fontSize: 60 }} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FormLabel>First Name</FormLabel>
        <FormInput onChangeText={(text) => onResponseChange(text, 'personal-information', 'firstName')}/>
      </View>

      <View style={{ flex: 1 }}>
        <FormLabel>Second Name</FormLabel>
        <FormInput onChangeText={(text) => onResponseChange(text, 'personal-information', 'secondName')}/>
      </View>

      <View style={{ flex: 1 }}>
        <FormLabel>Birthdate</FormLabel>
        <FormInput onChangeText={(text) => onResponseChange(text, 'personal-information', 'birthdate')}/>
      </View>

      <View
        style={{paddingTop: 20}} >
        <Button
          raised
          fontSize={18}
          backgroundColor={'blue'}
          title={'Next'}
          //TODO: handle response.id
          onPress={() => onResponseSubmit(question.id)} />
      </View>

    </View>
  )
}

const IntervalScale = ({ currentValue, max, min, onSlide, metricAbbrev, onResponseSubmit }) => {

  if (!currentValue) {
    currentValue = Math.floor((max + min) / 2)
  }

  return (
    <View
        style={{ flex: 1, padding: 20 }} >

      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

        <Text
          style={{ fontSize: 40 }} >
          {metricAbbrev
            ? currentValue + ' ' + metricAbbrev
            : currentValue}
        </Text>
      </View>

      <View
        style={{ flex: 1, alignItems: 'stretch' }} >
        <Slider
          value={currentValue}
          onValueChange={(value) => onSlide(value, 'numeric')}
          minimumValue={min}
          maximumValue={max}
          thumbTintColor={'blue'}
          />
      </View>

      <Button
          raised
          fontSize={18}
          backgroundColor={'blue'}
          title={'Next'}
          onPress={() => console.log('Submitted ')} />

    </View>
  )
}

const BinaryChoice = ({ question, onResponseSubmit }) => {
  if (question.responses && question.responses.length !== 2) {
    console.warn("Binary assessment questions can only have 2 responses.");
    //TODO: Display error
  }

  const firstResponse = question && question.responses[0];
  const secondResponse = question && question.responses[1];

  return (
    <View
      style={{ flex: 1, flexDirection: 'row' }} >

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => onResponseSubmit(question.id, firstResponse.id)} >
        <Text
          style={{ fontSize: 24, }} >
          {firstResponse.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => onResponseSubmit(question.id, secondResponse.id)} >
        <Text
          style={{ fontSize: 24 }} >
          {secondResponse.title}
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const MultipleChoice = ({ question, multipleChoice, style, onResponseCheck, onResponseSubmit }) => {

  return (
    <View
      style={{ flex: 1, justifyContent: 'center' }} >

      {question.responses.length === 0
        ? <Text style={styles.error}> 'Something went wrong' </Text>
        : null}

      {question.responses.map((response, index) => (
        <CheckBox
          key={index}
          onPress={multipleChoice
                  ? () => onResponseCheck(question.id, response.id)
                  : () => onResponseSubmit(question.id, response.id)}
          containerStyle={style.container}
          textStyle={style.text}
          title={response.title}
          checkedIcon='dot-circle-o'
          checkedColor='blue'
          uncheckedIcon='circle-o'
          checked={response.checked} />
      ))}

      {multipleChoice &&
        <Button
          raised
          fontSize={18}
          backgroundColor={'blue'}
          title={'Next'}
          //TODO: handle response.id
          onPress={() => onResponseSubmit(question.id, 1)} />}

    </View>
  )
}

//TODO:
//goBack - add getLastQuestion action (and add lastQuestion state --> array with whole history)
//handle multiple responses

class AssessmentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Assessment',
      headerTitle: 'Assessment',
    };
  }

  componentDidMount() {
    this.props.fetchAndHandleAssessment('cha');
  }

  _getResponseComponent(responseType, question, onResponseChange, onResponseCheck, onResponseSubmit) {
    switch (responseType) {
      case 'boolean':
        return (
          <BinaryChoice
            //responses={responses}
            question={question}
            onResponseSubmit={onResponseSubmit} />
        );
      case 'ordinal-scale':
        return (
          <MultipleChoice
            style={styles.multipleChoice}
            question={question}
            //multipleChoice
            //onResponseCheck={onResponseCheck}
            onResponseSubmit={onResponseSubmit} />
        );
      case 'interval-scale':
        return (
          <IntervalScale
            currentValue={this.props.assessment.currentResponse}
            onSlide={this.props.updateResponse}
            min={1}
            max={150}
            metricAbbrev={'kg'}
            onResponseSubmit={onResponseSubmit} />
        );
      case 'multi-option':
        return (
          <MultipleChoice
            style={styles.multipleChoice}
            question={question}
            multipleChoice
            onResponseCheck={onResponseCheck}
            onResponseSubmit={onResponseSubmit} />
        )
      case 'personal-information':
        return (
          <PersonalInformation
            question={question}
            gender={this.props.assessment.personalInfo.gender}
            onResponseChange={onResponseChange}
            onResponseSubmit={onResponseSubmit} />
        )
    }
  }

  render() {
    const isFetching = this.props.assessment.isFetching;
    const question = this.props.assessment.assessment[this.props.assessment.currentQuestion];
    const response = this.props.assessment.currentResponse;
    const updateResponse = this.props.updateResponse;
    const responseType = question && question.responseType;
    const progress = this.props.assessment.progress;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View
        style={styles.template.container} >

        <View
          style={styles.template.titleContainer} >

          <Progress.Bar
            animated={false}
            progress={progress}
            width={deviceWidth}
            borderRadius={0}
            height={12} />

          <Text
            style={styles.template.title} >
            {question.title}
          </Text>

          {question.description
            ? <Text
                style={styles.template.description} >
                {question.description}
              </Text>
            : null}

        </View>

        {this._getResponseComponent(responseType,
                                    question,
                                    this.props.updateResponse,
                                    this.props.checkResponse,
                                    this.props.submitResponse)}

      </View>
    );
  }
}

function mapStateToProps({ assessment }) {
  return {
    assessment,
  }
}

const styles = {
  template: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    titleContainer: {
      paddingBottom: 20,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      padding: 10,
      paddingTop: 20,
    },
    description: {
      fontSize: 18,
      textAlign: 'center',
      color: 'grey',
      padding: 10,
    },
    error: {
      fontSize: 18,
      textAlign: 'center',
      alignContent: 'center',
      color: 'red',
    },
  }),
  multipleChoice: StyleSheet.create({
    container: {
      //borderColor: 'grey',
      //backgroundColor: 'grey',
    },
    text: {
      fontSize: 16,
    },
  }),
  binaryChoice: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    responseContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    text: {
      fontSize: 24,
    },
  }),
};

export default connect(mapStateToProps, actions)(AssessmentScreen);