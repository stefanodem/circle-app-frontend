import { StackNavigator, TabNavigator } from 'react-navigation';
import { Assessment, CareAssessment } from '../../screens';

const options = {

}

export default StackNavigator({

    Assessment: { screen: Assessment }

}, options);
