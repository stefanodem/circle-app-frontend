import React from 'react'
import { TabNavigator } from 'react-navigation';

// Screens
// Only one for now, add more as required
import TaskFeed from './TaskFeed'

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

    List:       { screen: TaskFeed, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="home" />) }},
    Groups:     { screen: TaskFeed, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="chat" />) }},
    Stats:      { screen: TaskFeed, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="show-chart" />) }},
    User:       { screen: TaskFeed, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="person" />) }},
    Admin:      { screen: TaskFeed, navigationOptions: { tabBarLabel: '', tabBarIcon: (props) => (<Tab {...props} icon="settings" />) }},

}, options);