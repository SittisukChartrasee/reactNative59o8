import { CHANGE_ROOT } from '../../redux/types'

const checkWordTh = text => /[\u0E01-\u0E3A\u0E40-\u0E59]/g.test(text)

export const handleModal = (store) => (next) => action => {
  console.log(action)

  if (action.key === 'code' && action.value.code === '1103' && checkWordTh(action.value.message)) {
    const modal = {
      dis: action.value.message,
      visible: true,
      onPress: () => {
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value.message } })
        store.dispatch({ type: CHANGE_ROOT, key: 'modalVisible', value: false })
      },
      onPressClose: () => {
        store.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { visible: false, dis: action.value.message } })
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