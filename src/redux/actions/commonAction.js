import { CHANGE_FATCA, CHANGE_SUITTEST } from '../types'

export const fatca = (key, value) => dispatch => dispatch({ type: CHANGE_FATCA, key, value })

export const suittest = (key, value) => dispatch => dispatch({ type: CHANGE_SUITTEST, key, value })