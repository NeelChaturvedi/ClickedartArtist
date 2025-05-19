// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Personal from '../Screens/Details/Personal';
import Contact from '../Screens/Details/Contact';
import ProfilePhoto from '../Screens/Details/ProfilePhoto';

enableScreens();

const Stack = createNativeStackNavigator();

export default function Details() {
  return (
    <Stack.Navigator
      initialRouteName="Personal Details"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Personal Details" component={Personal} />
      <Stack.Screen name="Contact Details" component={Contact} />
      <Stack.Screen name="Upload Profile" component={ProfilePhoto} />
    </Stack.Navigator>
  );
}
