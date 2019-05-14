import {
  CHANGE_USER,
  CHANGE_ROOT,
  CHANGE_FATCA,
  CHANGE_SUITTEST,
  CHANGE_PASSCODE
} from '../types'

export const root = (key, value) => dispatch => dispatch({ type: CHANGE_ROOT, key, value })

export const updatePasscode = (key, value) => dispatch => dispatch({ type: CHANGE_PASSCODE, key, value })

export const updateUser = (key, value) => dispatch => dispatch({ type: CHANGE_USER, key, value })

export const fatca = (key, value) => dispatch => dispatch({ type: CHANGE_FATCA, key, value })

export const suittest = (key, value) => dispatch => dispatch({ type: CHANGE_SUITTEST, key, value })