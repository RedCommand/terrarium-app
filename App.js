// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Components/LoginScreen'
import HomeScreen from './Components/HomeScreen'
import Test from './Components/Test'
import Login from './Components/Login'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="LoginScreen" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;