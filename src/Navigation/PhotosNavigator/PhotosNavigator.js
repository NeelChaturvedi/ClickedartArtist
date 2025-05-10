// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

import { Photos  } from '../../Screens';
import PhotoDetails from './PhotoDetails';
enableScreens();

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Photos" component={Photos}/>
      <Stack.Screen name="EditProfile" component={PhotoDetails} />
    </Stack.Navigator>
  );
}
