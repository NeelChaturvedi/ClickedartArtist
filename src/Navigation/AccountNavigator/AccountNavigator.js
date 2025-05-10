// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

import Accounts from '../../Screens/Accounts';
enableScreens();

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Accounts"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Accounts" component={Accounts} />
    </Stack.Navigator>
  );
}
