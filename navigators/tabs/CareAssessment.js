import { StackNavigator } from 'react-navigation';
import { CareAssessment, CareAssessmentInput } from '../../screens';

const options = {

}

export default StackNavigator({

    CareAssessment: { screen: CareAssessment },
    CareAssessmentInput: { screen: CareAssessmentInput },

}, options);
