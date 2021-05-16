// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import NavigScreen from './Components/NavigScreen';
import Film from './Components/Film';
import Test from './Components/Test';
import Test2 from './Components/Test2';
import Login from './Components/Login';
import HomeScreen from './Components/HomeScreen';
import DeviceScreen from './Components/DeviceScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavigScreen" component={NavigScreen} />
        <Stack.Screen name="Film" component={Film} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Test2" component={Test2} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="DeviceScreen" component={DeviceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;