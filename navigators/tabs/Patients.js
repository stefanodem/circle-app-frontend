import { StackNavigator } from 'react-navigation';
import { Patients, PatientProfile, PersonalInformation, ReferralItems } from '../../screens';

const options = {

}

export default StackNavigator({

    Patients: { screen: Patients },
    PatientProfile: { screen: PatientProfile },
    PersonalInformation: { screen: PersonalInformation },
    ReferralItems: { screen: ReferralItems },

}, options);
