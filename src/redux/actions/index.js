import {
  handleActionNext,
  handleActionReset
} from './navigateAction'

export const navigateAction = props => dispatch => handleActionNext(props, dispatch)
export const navigateReset = props => dispatch => handleActionReset(props, dispatch)
