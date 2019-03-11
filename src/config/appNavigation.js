import { createStackNavigator, createAppContainer } from 'react-navigation';
import welcome from '../screen/welcome'
import passcode from '../screen/passcode'
import confirmPasscode from '../screen/confirmPasscode'
import login from '../screen/login'

const MainNavigator = createStackNavigator({
  // welcome,
  passcode,
  confirmPasscode,
  login
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);