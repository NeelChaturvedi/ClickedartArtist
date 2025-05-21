import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import ImageScreen from 'src/Screens/ImageScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function ImageNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ImageScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
    </Stack.Navigator>
  );
}
