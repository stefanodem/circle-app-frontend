import { StackNavigator, DrawerNavigator } from 'react-navigation';

import TabNavigator from './tabs'
import TemplateScreen from '../screens/TemplateScreen'

export default DrawerNavigator({

    Home:       { screen: TabNavigator, navigationOptions: { header: { visible: true }}},
    Settings:   { screen: StackNavigator({ template: { screen: TemplateScreen } }, { navigationOptions: { title: 'Settings' }}) }

}, {
    headerMode: 'screen',
    initialRouteName: 'Home',
});