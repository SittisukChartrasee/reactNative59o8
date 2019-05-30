import { CHANGE_ROOT } from '../../redux/types'

export const handleModal = (store) => (next) => action => {
  console.log(store, next, action)

  if (action.key === 'success' && action.value === false) {
    const modal = {
      dis: store.getState().root.message,
      visible: true,
      onPress: () => store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false } }),
      onPressClose: () => store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false } }),
    }
    return store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }

  return next(action)
}