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
import fatca from '../screen/fatca'

import profile from '../screen/profile/profile'
import marry from '../screen/profile/marry'
import addressHome from '../screen/profile/addressHome'
import addressWork from '../screen/profile/addressWork'
import addressDoc from '../screen/profile/addressDoc'

import branchIcome from '../screen/income'

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
  // marry,
  // addressHome,
  // addressWork,
  // addressDoc,
  ...branchIcome,
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);