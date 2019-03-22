import { combineReducers } from 'redux'
import root from './root'
import passcode from './passcode'
import fatcaReducer from './fatca'

export default combineReducers({
  root,
  fatcaReducer,
  passcode,
})