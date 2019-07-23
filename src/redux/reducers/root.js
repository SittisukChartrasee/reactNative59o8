import { CHANGE_ROOT } from '../types'

const init = {
  root: 'TEST',
  env: 'UAT',
  appState: '',
  currFlowUP: '',
  password: '',
  modal: {
    visible: false
  }
}

export default (state = init, action) => {
  switch (action.type) {
    case CHANGE_ROOT:
      return { ...state, [action.key]: action.value }

    default:
      return state
  }
}