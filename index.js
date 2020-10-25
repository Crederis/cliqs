/**
 * @format
 */

import './App/Configs/ReactotronConfigs';
import { AppRegistry } from 'react-native';
import App from './App';
// import Home from './App/Containers'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
