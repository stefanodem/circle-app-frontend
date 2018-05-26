import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';

const deviceWidth = Dimensions.get('window').width;

//TODO: create a class of responses --> e.g. Response.BinaryChoice, Response.IntervalScale

const IntervalScale = ({ currentValue, max, min, onSlide, metricAbbrev }) => {

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
          onValueChange={(value) => onSlide(value)}
          minimumValue={min}
          maximumValue={max}
          />
      </View>

    </View>
  )
}

const BinaryChoice = ({ firstResponse, secondResponse, onPress }) => {

  return (
    <View
      style={{ flex: 1, flexDirection: 'row' }} >

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => console.log('pressed ' + firstResponse)} >
        <Text
          style={{ fontSize: 24, }} >
          {firstResponse}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => console.log('pressed ' + secondResponse)} >
        <Text
          style={{ fontSize: 24 }} >
          {secondResponse}
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const MultipleChoice = ({ responses, multipleChoice, hasSubmitBtn, style }) => {

  return (
    <View
      style={{ flex: 1, justifyContent: 'center' }} >

      {responses.length === 0
        ? <Text style={styles.error}> 'Something went wrong' </Text>
        : null}

      {responses.map((response, index) => (
        <CheckBox
          key={index}
          containerStyle={style.container}
          textStyle={style.text}
          title={response.title}
          checkedIcon='dot-circle-o'
          checkedColor='blue'
          uncheckedIcon='circle-o'
          checked={response.checked} />
      ))}

    </View>
  )
}

class AssessmentScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Assessment',
      headerTitle: 'Assessment',
    };
  }

  componentDidMount () {
    this.props.fetchAndHandleAssessment('cha');
  }

  render() {
    const isFetching = this.props.assessment.isFetching;
    const currentQuestion = this.props.assessment.assessment[this.props.assessment.currentQuestion];
    const currentResponse = this.props.assessment.currentResponse;
    const updateResponse = this.props.updateResponse;

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
            progress={0.3}
            width={deviceWidth}
            borderRadius={0}
            height={12} />

          <Text
            style={styles.template.title} >
            {currentQuestion.title}
          </Text>

          <Text
            style={styles.template.description} >
            {currentQuestion.description}
          </Text>

        </View>

        <IntervalScale
          currentValue={currentResponse}
          onSlide={updateResponse}
          min={1}
          max={150}
          metricAbbrev={'kg'} />

{/*        <BinaryChoice
          firstResponse={'Yes'}
          secondResponse={'No'} />*/}

{/*        <MultipleChoice
          style={styles.multipleChoice}
          responses={currentQuestion.responses} />*/}

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