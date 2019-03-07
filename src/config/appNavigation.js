import { createStackNavigator, createAppContainer } from 'react-navigation';
import welcome from '../screen/welcome'
import passcode from '../screen/passcode'

const MainNavigator = createStackNavigator({
  // welcome,
  passcode
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);