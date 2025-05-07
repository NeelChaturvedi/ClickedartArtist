// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Personal from '../Screens/auth/Details/personaldetails';
import Contact from '../Screens/auth/Details/contactdetails';
enableScreens();

const Stack = createNativeStackNavigator();

export default function Details() {
  return (
    <Stack.Navigator
      initialRouteName="Personal"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
