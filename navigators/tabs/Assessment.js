import { StackNavigator, TabNavigator } from 'react-navigation';
import { Assessment, CareAssessment } from '../../screens';

const options = {

}

export default StackNavigator({

    Assessment: { screen: Assessment }

}, options);

// const tabOptions = {
//   tabBarPosition: 'top',
// }

// export default StackNavigator({

//     Assessment: { screen: TabNavigator({
//       AssessmentOne: { screen: Assessment },
//       AssessmentTwo: { screen: CareAssessment },
//     }, tabOptions) },

// }, options);