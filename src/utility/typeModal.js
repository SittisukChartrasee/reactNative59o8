import { Linking } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { onStore } from '../redux/store'


export default {
  '1101': {
    label: 'ติดต่อ 026733888',
    onPress: (tel = '026733888') => Linking.openURL(`tel://${tel}`)
  },
  '1102': {
    label: 'ไปหน้าลงทะเบียน',
    onPress: (routeName = 'welcome') => onStore.dispatch(NavigationActions.navigate({ routeName }))
  },
  '1103': {
    label: 'ตกลง',
    onPress: () => {}
  },
}
