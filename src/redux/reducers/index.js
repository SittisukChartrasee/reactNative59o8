import { combineReducers } from 'redux'
import root from './root'
import passcode from './passcode'
import fatcaReducer from './fatca'
import suitReducer from './suittest'

export default combineReducers({
  root,
  fatcaReducer,
  passcode,
  suitReducer,
})