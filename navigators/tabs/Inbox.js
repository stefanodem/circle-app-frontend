import { StackNavigator } from 'react-navigation';
import { Inbox, Chat, CircleList, GroupSettings } from '../../screens';

const options = {

}

export default StackNavigator({

  Inbox: { screen: Inbox },
  Chat: { screen: Chat },
  CircleList: { screen: CircleList },
  GroupSettings: { screen: GroupSettings },

}, options);