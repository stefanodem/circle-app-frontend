import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  cardMetricsStyles,
} from './styles';

const CardMetrics = ({ likeCount, replyCount, commentCount }) => {

  return (
    <View
      style={ cardMetricsStyles.infoContainer } >

      <Icon
        name={'calendar-o'}
        size={16} />

      <Text
        style={ cardMetricsStyles.infoText } >

        { `  ${'05/15/2018'}` }

      </Text>

      <Icon
        name={'envelope-o'}
        size={16} />

      <Text
        style={ cardMetricsStyles.infoText } >

        { `  ${3}` }

      </Text>

      <Icon
        name={'paperclip'}
        size={16} />

      <Text
        style={ cardMetricsStyles.infoText } >

        { `  ${3}` }

      </Text>

    </View>
  );
}

export default CardMetrics;
