import { StackNavigator } from 'react-navigation';
import { TaskFeed, NewTask, TaskDetails } from '../../screens';

const options = {

}

export default StackNavigator({

    Home: { screen: TaskFeed },
    NewTask: { screen: NewTask },
    TaskDetails: { screen: TaskDetails }

}, options);