import { Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { onStore } from '../redux/store'
import { CHANGE_ROOT } from '../redux/types'

// const defaultModal = onStore.getState()

export default {
  '1101': {
    visible: true,
    labelBtn: 'ติดต่อ 02 673 3888',
    onPress: (tel = '026733888') => Linking.openURL(`tel://${tel}`),
    onConfirm: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onPressClose: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } })
  },
  '1102': {
    visible: true,
    labelBtn: (label) => label,
    onPress: (page) => {
      onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } })
      onStore.dispatch(NavigationActions.navigate({ routeName: page }))
    },
    onConfirm: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onPressClose: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
  },
  '1103': {
    visible: true,
    labelBtn: 'ตกลง',
    onPress: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onConfirm: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onPressClose: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } })
  },
  '1104': {
    visible: true,
    labelBtn: (label) => label,
    onPress: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onConfirm: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } }),
    onPressClose: () => onStore.dispatch({ type: CHANGE_ROOT, key: 'modal', value: { ...onStore.getState().root.modal, visible: false } })
  },
}
