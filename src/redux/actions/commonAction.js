import { CHANGE_FATCA } from '../types'

export const fatca = (key, value) => dispatch => dispatch({ type: CHANGE_FATCA, key, value })