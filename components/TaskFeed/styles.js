import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export const cardMetricsStyles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderBottomColor: '#bbb',
  },
  infoText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 15,
    paddingBottom: 10,
  },
})