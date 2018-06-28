import { StackNavigator } from 'react-navigation';
import { Patients } from '../../screens';

const options = {

}

export default StackNavigator({

    Home: { screen: Patients },

}, options);
