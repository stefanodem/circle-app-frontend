import { StackNavigator } from 'react-navigation';
import { Inbox, Chat } from '../../screens';

const options = {

}

export default StackNavigator({

  Inbox: { screen: Inbox },
  Chat: { screen: Chat },

}, options);