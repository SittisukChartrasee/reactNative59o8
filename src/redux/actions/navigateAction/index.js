
export const handleActionNext = (props, dispatch) => {
  props.navigation.navigate(props.page, { ...(param => param ? { ...param } : {})(props.params) })
}