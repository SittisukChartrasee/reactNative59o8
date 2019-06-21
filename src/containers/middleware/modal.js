import { CHANGE_ROOT } from '../../redux/types'

export const handleModal = (store) => (next) => action => {
  // console.log(store, next, action)

  if (action.key === 'message') {
    const modal = {
      dis: action.value,
      visible: true,
      onPress: () => store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value } }),
      onPressClose: () => store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value } }),
    }
    return store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }

  if (action.type === 'modal' && action.value) {
    return store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: action.value })
  }

  return next(action)
}