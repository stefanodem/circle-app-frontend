import React from 'react'
import { TabNavigator } from 'react-navigation';

//Screens
import Home from './Home';
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
        showLabel: false,
        style: {
            backgroundColor: '#272822',
        }
    },
    animationEnabled: false,
}

export default TabNavigator({

    Home:       { screen: Calendar, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="home" />) }},
    Groups:     { screen: Chat, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="chat" />) }},
    Stats:      { screen: CareAssessment, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="show-chart" />) }},
    User:       { screen: Home, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="person" />) }},
    Admin:      { screen: Assessment, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="settings" />) }},

}, options);