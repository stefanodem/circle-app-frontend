import { StackNavigator, TabNavigator, TabBarTop, TabView } from 'react-navigation';
import { Calendar, TaskFeed, NewTask, TaskDetails, CareAssessment, CareAssessmentInput } from '../../screens';

const stackOptions = {

}

const tabOptions = {
  tabBarComponent: TabBarTop,
  lazyLoad: true,
  tabBarOptions: {
    upperCaseLabel: false,
    inactiveTintColor: 'grey',
    activeTintColor: 'green',
    height: 60,
    showLabel: true,
    showIcon: false,
    pressOpacity: 1,
    style: {
      backgroundColor: '#fff',
    },
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelStyle: {
      fontSize: 16,
      //fontWeight: 'bold',
    },
    indicatorStyle: {
      backgroundColor: 'green',
      height: 2,
    }
  },
  animationEnabled: false,
  tabBarPosition: 'top',
}

export default StackNavigator({
    Calendar: { screen: Calendar },
    PatientCare: { screen: TabNavigator({
      Tasks: { screen: TaskFeed },
      CareAssessment: { screen: CareAssessment },
    }, tabOptions) },
    NewTask: { screen: NewTask },
    TaskDetails: { screen: TaskDetails },
    CareAssessment: { screen: CareAssessment },
    CareAssessmentInput: { screen: CareAssessmentInput },

}, stackOptions);
