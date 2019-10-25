import { CHANGE_ROOT } from '../types'
import releaseApp from '../../../release/releaseApp.json'

const init = {
  root: 'TEST',
  env: releaseApp.env.toUpperCase(), // DEV, SIT, UAT, PRO
  appState: '',
  currFlowUP: '',
  password: '',
  loading: false,
  modal: {
    visible: false
  },
  screenModal: {
    visible: false,
    page: '',
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