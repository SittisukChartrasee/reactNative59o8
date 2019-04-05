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
import lockUser from '../screen/lock/lockUser'
import profile from '../screen/profile/profile'
import fatca from '../screen/fatca'
import marry from '../screen/profile/marry'

const MainNavigator = createStackNavigator({
  // welcome,
  // login,
  // otp,
  // passcode,
  // confirmPasscode,
  // condi,
  // tutorialBackCamera,
  // tutorialFrontCamera,
  // turorialBank,
  // lockUser,
  // fatca,
  // profile,
  marry,
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);