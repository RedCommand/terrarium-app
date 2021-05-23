// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import HomeScreen from './Components/HomeScreen';
import DeviceScreen from './Components/DeviceScreen'

const Stack = createStackNavigator();

if (!__DEV__) {
  console.log = () => { };
  //disable all console.log() if app isn't in DEV mode to make app run faster
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DeviceScreen" component={DeviceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;