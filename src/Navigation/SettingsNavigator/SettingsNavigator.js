// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

import Settings from '../../Screens/SettingScreen/Settings';
import Faqs from './Faqs';
import TermsAndConditions from './TermsConditions';
import Membership from './Membership';
enableScreens();

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsMain" component={Settings}/>
      <Stack.Screen name="Faqs" component={Faqs}/>
      <Stack.Screen name="Terms" component={TermsAndConditions}/>
      <Stack.Screen name="Membership" component={Membership}/>
    </Stack.Navigator>
  );
}
