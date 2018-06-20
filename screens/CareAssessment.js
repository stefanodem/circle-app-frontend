import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { Avatar, Slider, Button } from 'react-native-elements';
import _values from 'lodash/values';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

const SliderSection = props => {

}


class CareAssessmentScreen extends Component {
  state = {

  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Care Assessment',
      headerTitle: 'Care Assessment',
    };
  }

  componentDidMount() {
    this.props.fetchAndHandlePatient('1')
  }

  _keyExtractor = (item, index) => item.name;

  _renderComponents = ({ item }) => {
    const name = item.name.replace(" ", "\n")

    return (
      <View
        style={{flex: 1, marginRight: 15}}>
        <Avatar
          containerStyle={{ marginRight: 0 }}
          medium
          rounded
          icon={{name: 'home'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7} />
        <Text
          style={styles.avatarTitle} >{name}</Text>
      </View>
    )
  }

  render() {
    const { isFetching, vitals, symptoms, conditions } = this.props.patient;

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

        <View
          style={{ flex: 1, alignItems: 'stretch', paddingBottom: 30 }} >
          <Text
            style={styles.smallSectionTitle} >{"Mood"}</Text>
          <Slider
            value={2}
            thumbStyle={styles.thumb}
            onValueChange={() => console.log("slide")}
            step={1}
            minimumValue={0}
            maximumValue={4}
            thumbTintColor={'blue'} />
        </View>

        <View
          style={{ flex: 1, alignItems: 'stretch', paddingBottom: 30 }} >
          <Text
            style={styles.smallSectionTitle} >{"Vitality"}</Text>
          <Slider
            value={2}
            thumbStyle={styles.thumb}
            onValueChange={() => console.log("slide")}
            step={1}
            minimumValue={0}
            maximumValue={4}
            thumbTintColor={'blue'} />
        </View>

        <View
          style={{ flex: 1, alignItems: 'stretch', paddingBottom: 30 }} >
          <Text
            style={styles.smallSectionTitle} >{"Fatigue"}</Text>
          <Slider
            value={2}
            thumbStyle={styles.thumb}
            onValueChange={() => console.log("slide")}
            step={1}
            minimumValue={0}
            maximumValue={4}
            thumbTintColor={'blue'} />
        </View>

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
  sectionDescription: {
    fontSize: 14,
  },
  avatarTitle: {
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 11,
    fontWeight: 'bold',
    color: 'royalblue',
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