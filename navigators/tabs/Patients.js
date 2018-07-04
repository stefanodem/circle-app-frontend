import { StackNavigator } from 'react-navigation';
import { Patients, PatientProfile } from '../../screens';

const options = {

}

export default StackNavigator({

    Patients: { screen: Patients },
    PatientProfile: { screen: PatientProfile },

}, options);
