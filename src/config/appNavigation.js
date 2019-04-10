import { createStackNavigator, createAppContainer } from 'react-navigation';
import welcome from '../screen/welcome'
import passcode from '../screen/passcode'
import confirmPasscode from '../screen/confirmPasscode'
import login from '../screen/login'
import otp from '../screen/otp'
import condi from '../screen/condi'
import lockUser from '../screen/lock/lockUser'
import fatca from '../screen/fatca'
import fraud from '../screen/fraud'

import branchBank from '../screen/bank'

import branchProfile from '../screen/profile'

import branchProfileChoose from '../screen/profileChoose'

import branchCamera from '../screen/camera'

import branchIcome from '../screen/income'

import branchRisk from '../screen/risk'

const MainNavigator = createStackNavigator({
  // welcome,
  // login,
  // otp,
  // passcode,
  // confirmPasscode,
  // condi,
  // lockUser,
  // fatca,
  // fraud,
  ...branchBank,
  // ...branchRisk,
  // ...branchProfile,
  // ...branchCamera,
  // ...branchIcome,
  // ...branchProfileChoose,
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);