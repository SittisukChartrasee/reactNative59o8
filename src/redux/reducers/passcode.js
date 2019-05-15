import { CHANGE_PASSCODE } from '../types'

const init = {
  passcode: '',
}

export default (state = init, action) => {
  switch (action.type) {
    case CHANGE_PASSCODE:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}