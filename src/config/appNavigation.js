import { createStackNavigator, createAppContainer } from 'react-navigation';
import Welcome from '../screen/welcome'

const MainNavigator = createStackNavigator({
  Welcome
}, {
  headerMode: 'none',
});

export default createAppContainer(MainNavigator);