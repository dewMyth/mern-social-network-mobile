/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    myOwnColor: '#f1c40f',
  },
};

AppRegistry.registerComponent(appName, () => {
  return () => (
    <PaperProvider>
      <App theme={theme} />
    </PaperProvider>
  );
});
