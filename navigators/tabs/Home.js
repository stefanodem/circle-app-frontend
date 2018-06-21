import { StackNavigator } from 'react-navigation';
import { Home, TaskFeed, NewTask, TaskDetails, CareAssessment, CareAssessmentInput } from '../../screens';

const options = {

}

export default StackNavigator({

    Home: { screen: CareAssessment },
    TaskFeed: { screen: TaskFeed },
    NewTask: { screen: NewTask },
    TaskDetails: { screen: TaskDetails },
    CareAssessment: { screen: CareAssessment },
    CareAssessmentInput: { screen: CareAssessmentInput },

}, options);
