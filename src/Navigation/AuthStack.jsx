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
      initialRouteName="Personal"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="ProfilePhoto" component={ProfilePhoto}/>
    </Stack.Navigator>
  );
}
