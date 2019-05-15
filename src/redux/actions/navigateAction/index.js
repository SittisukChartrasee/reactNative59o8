import { NavigationActions } from 'react-navigation'

export const handleActionNext = (props, dispatch) => {
  props.navigation.navigate(props.page, { ...(param => param ? { ...param } : {})(props.params) })
}

export const handleActionReset = (props, dispatch) => {
  props.navigation.reset([NavigationActions.navigate({ routeName: props.page })], 0)
}
