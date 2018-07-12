import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, AsyncStorage, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _values from 'lodash/values';
import { SectionDescription } from '../components';
import { SCROLL_PADDING_BOTTOM } from 'app/config';

const NumericMetric = props => {
  const {
    key,
    title,
    value,
  } = props;

  return (
    <View
      key={key}
      style={styles.metricContainer}>
      <Text
        style={styles.metricTitle}>{title}</Text>
      <Text
        style={styles.numericMetric}>{value}</Text>
    </View>
  )
}

const CircleMetric = props => {
  const {
    key,
    title,
    value,
  } = props;

  return (
    <View
      key={key}
      style={styles.metricContainer}>
      <Text
        style={styles.metricTitle}>{title}</Text>
      <Progress.Circle
        style={styles.circleMetric}
        animated={false}
        progress={value}
        size={55}
        borderColor={'#00008b'}
        color={'#00008b'}
        showsText={true} />
    </View>
  )
}

const BarMetric = props => {
  const {
    key,
    title,
    value,
  } = props;

  return (
    <View
      key={key}
      style={styles.metricContainer}>
      <Text
        style={styles.metricTitle}>{title}</Text>
      <Progress.Bar
        progress={value}
        width={300}
        borderColor={'#00008b'}
        color={'#00008b'} />
    </View>
  )
}

const PieMetric = props => {
  const {
    key,
    title,
    value,
  } = props;

  return (
    <View
      key={key}
      style={styles.metricContainer}>
      <Text
        style={styles.metricTitle}>{title}</Text>
      <Progress.Pie
        style={styles.pieMetric}
        progress={value}
        size={50}
        animated
        borderColor={'#00008b'}
        color={'#00008b'} />
    </View>
  )
}

class ProgressScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;

    return {
      title: 'Progress',
      headerTitle: 'Progress',
    };
  }

  componentDidMount() {
    this.props.fetchAndHandleUserProgress(this.props.user.info.uid);
  }

  _getMetricComponent(componentType, id, title, value) {
    switch (componentType) {
      case 'numeric':
        return (
          <NumericMetric
            key={id}
            title={title}
            value={value} />
        );
      case 'progress-circle':
        return (
          <CircleMetric
            key={id}
            title={title}
            value={value} />
        );
      case 'pie-chart':
        return (
          <PieMetric
            key={id}
            title={title}
            value={value} />
        );
    }
  }

  render() {
    const {isFetching, error, progress } = this.props.user;
    const { navigate } = this.props.navigation;

    if (isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        {progress && _values(progress).length > 1
          ? _values(progress).map(progressCard => {
            return (
              <TouchableWithoutFeedback
                key={progressCard.id} >
                <Card
                  containerStyle={styles.cardContainer} >
                  <SectionDescription
                    title={progressCard.title}
                    description={progressCard.description} />
                  <View
                    style={styles.metricSectionContainer} >
                    {progressCard.metrics.map(metric => {
                      return this._getMetricComponent(metric.type, metric.id, metric.title, metric.value)
                    })}
                  </View>
                </Card>
              </TouchableWithoutFeedback>
            )
          })
          : <Text style={{ flex: 1, alignSelf: 'center' }}>
              {'Please choose your progress cards in your settings'}
            </Text>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
  cardContainer: {
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  metricSectionContainer: {
    flexDirection: 'row',
  },
  metricContainer: {
    flex: 1
  },
  metricTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 10,
    color: 'grey',
  },
  numericMetric: {
    flex: 1,
    fontSize: 35,
    alignSelf: 'center',
    color: 'darkblue',
  },
  pieMetric: {
    flex: 1,
    alignSelf: 'center'
  },
  circleMetric: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, actions)(ProgressScreen);
