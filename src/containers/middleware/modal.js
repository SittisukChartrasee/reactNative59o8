import { CHANGE_ROOT } from '../../redux/types'

const checkWordTh = text => /[\u0E01-\u0E3A\u0E40-\u0E59]/g.test(text)

export const handleModal = (store) => (next) => action => {
  // console.log(store, next, action)

  if (action.key === 'message' && checkWordTh(action.value)) {
    const modal = {
      dis: action.value,
      visible: true,
      onPress: () => {
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value } })
        store.dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
      },
      onPressClose: () => {
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value } })
        store.dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
      },
    }
    return store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: modal })
  }

  if (action.type === 'modal' && action.value) {
    return store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: action.value })
  }

  return next(action)
}