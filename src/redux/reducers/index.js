import { combineReducers } from 'redux'
import root from './root'
import passcode from './passcode'
import fatcaReducer from './fatca'
import suitReducer from './suittest'
import user from './user'

export default combineReducers({
  root,
  user,
  passcode,
  suitReducer,
  fatcaReducer,
})