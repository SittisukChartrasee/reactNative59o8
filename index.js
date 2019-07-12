/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import StoryBook from './storybook'

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
        global.originalXMLHttpRequest :
        global.XMLHttpRequest;
  global.FormData = global.originalFormData ?
      global.originalFormData :
      global.FormData;
  global.Blob = global.originalBlob ?
      global.originalBlob :
      global.Blob;
  global.FileReader = global.originalFileReader ?
      global.originalFileReader :
      global.FileReader;
}

export default StoryBook
AppRegistry.registerComponent(appName, () => App);
