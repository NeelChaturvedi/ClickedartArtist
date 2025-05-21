// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Profile from '../../Screens/Profile';
import ImageScreen from 'src/Screens/ImageScreen';


enableScreens();

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileMain" component={Profile}/>
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
    </Stack.Navigator>
  );
}
