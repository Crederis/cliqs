import AsyncStorage from '@react-native-community/async-storage'
import Reactotron from 'reactotron-react-native'

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'cliqs'
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

Reactotron.clear()

console.tron = Reactotron
