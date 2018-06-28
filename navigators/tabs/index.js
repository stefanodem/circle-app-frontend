import React from 'react'
import { TabNavigator } from 'react-navigation';

//Screens
import Patients from './Patients';
import Assessment from './Assessment';
import Chat from './Chat';
import CareAssessment from './CareAssessment';
import Calendar from './Calendar';

// Tabs
import Tab from '../../components/tabs/tab'
import { Icon } from 'react-native-elements';

// TabNavigator options
const options = {
    lazyLoad: true,
    tabBarOptions: {
        inactiveTintColor: '#aaa',
        activeTintColor: '#fff',
        showIcon: true,
        showLabel: true,
        style: {
            backgroundColor: '#272822',
        }
    },
    animationEnabled: false,
}

export default TabNavigator({

    Home:       { screen: Calendar, navigationOptions: { tabBarLabel: 'Home', tabBarIcon: (props) => (<Tab {...props} icon="home" />) }},
    Groups:     { screen: Chat, navigationOptions: { tabBarLabel: 'Inbox', tabBarIcon: (props) => (<Tab {...props} icon="chat" />) }},
    User:       { screen: Patients, navigationOptions: { tabBarLabel: 'Patients', tabBarIcon: (props) => (<Tab {...props} icon="person" />) }},
    Stats:      { screen: Assessment, navigationOptions: { tabBarLabel: 'My Care', tabBarIcon: (props) => (<Tab {...props} icon="show-chart" />) }},
    Admin:      { screen: Assessment, navigationOptions: { tabBarLabel: 'Settings', tabBarIcon: (props) => (<Tab {...props} icon="settings" />) }},

}, options);