import { NavigationActions, StackActions } from 'react-navigation'
import { CHANGE_ROOT } from '../../redux/types'

export const handleScreen = (store) => (next) => action => {
  // console.log(store, next, action)

  if (action.type === 'CHECKSCREEN' && action.value) {
    return store.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: action.value })]
      }))
  }

  return next(action)
}