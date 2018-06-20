import { StackNavigator } from 'react-navigation';
import { Home, TaskFeed, NewTask, TaskDetails, CareAssessment } from '../../screens';

const options = {

}

export default StackNavigator({

    Home: { screen: CareAssessment },
    TaskFeed: { screen: TaskFeed },
    NewTask: { screen: NewTask },
    TaskDetails: { screen: TaskDetails }

}, options);
