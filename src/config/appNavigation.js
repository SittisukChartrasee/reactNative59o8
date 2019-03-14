import { createStackNavigator, createAppContainer } from 'react-navigation';
import welcome from '../screen/welcome'
import passcode from '../screen/passcode'
import confirmPasscode from '../screen/confirmPasscode'
import login from '../screen/login'
import otp from '../screen/otp'
import condi from '../screen/condi'
import tutorialBackCamera from '../screen/camera/tutorialBackCamera'
import tutorialFrontCamera from '../screen/camera/tutorialFrontCamera'
import turorialBank from '../screen/bank/tutorialBank'

const MainNavigator = createStackNavigator({
  // welcome,
  // passcode,
  // confirmPasscode,
  // login,
  // otp,
  // condi,
  // tutorialBackCamera,
  // tutorialFrontCamera,
  turorialBank
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);