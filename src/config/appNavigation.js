import { createStackNavigator, createAppContainer } from 'react-navigation';
import welcome from '../screen/welcome'
import passcode from '../screen/passcode'
import confirmPasscode from '../screen/confirmPasscode'
import login from '../screen/login'
import otp from '../screen/otp'
import termCondition from '../screen/termCondition'

const MainNavigator = createStackNavigator({
  // welcome,
  // passcode,
  // confirmPasscode,
  // login,
  // otp,
  termCondition
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);