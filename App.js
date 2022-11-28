import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  StatusBar,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Home from './components/screens/Home';
import CreatePost from './components/routes/CreatePost';
import Messenger from './components/routes/Messenger';
import Chat from './components/routes/Chat';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{header: () => null}}
          />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Messenger" component={Messenger} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
