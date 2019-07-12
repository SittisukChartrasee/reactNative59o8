import welcome from '../screen/welcome'
import checkpoint from '../screen/checkpoint'
import passcode from '../screen/passcode'
import confirmPasscode from '../screen/confirmPasscode'
import login from '../screen/login'
import otp from '../screen/otp'
import condi from '../screen/condi'
import lockUser from '../screen/lock/lockUser'
import fatca from '../screen/fatca'
import fraud from '../screen/fraud'
import forgetPasscode from '../screen/forgetPasscode'
import firstTerm from '../screen/firstTerm'

import branchBank from '../screen/bank'

import branchProfile from '../screen/profile'

import branchProfileChoose from '../screen/profileChoose'

import branchCamera from '../screen/camera'

import branchIcome from '../screen/income'

import branchRisk from '../screen/risk'

import branchComplete from '../screen/complete'

import branchsignature from '../screen/signature'

export default {
  // firstTerm,
  // welcome,
  // login,
  // checkpoint,
  // otp,
  // passcode,
  // confirmPasscode,
  // condi,
  // lockUser,
  // fatca,
  // fraud,
  // forgetPasscode,
  // ...branchProfile,
  // ...branchIcome,
  // ...branchProfileChoose,
  ...branchBank,
  ...branchRisk,
  ...branchCamera,
  ...branchComplete,
  ...branchsignature,
}