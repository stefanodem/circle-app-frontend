import { StackNavigator } from 'react-navigation';
import { Home, TaskFeed, NewTask, TaskDetails } from '../../screens';

const options = {

}

export default StackNavigator({

    Home: { screen: Home },
    TaskFeed: { screen: TaskFeed },
    NewTask: { screen: NewTask },
    TaskDetails: { screen: TaskDetails }

}, options);
