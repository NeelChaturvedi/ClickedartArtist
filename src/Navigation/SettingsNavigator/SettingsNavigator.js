import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

import Settings from '../../Screens/SettingScreen/Settings';
import Faqs from './Faqs';
import TermsAndConditions from './TermsConditions';
import Membership from './Membership';
import PrivacyPolicy from './PrivacyPolicy';
import HelpCenter from './HelpCenter';
enableScreens();

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle:{
          color: 'white',
        },
        headerTintColor:'white',
      }}>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="Faqs" component={Faqs}/>
      <Stack.Screen name="Terms" component={TermsAndConditions}/>
      <Stack.Screen name="Membership" component={Membership}/>
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy}/>
      <Stack.Screen name="Help Center" component={HelpCenter}/>
    </Stack.Navigator>
  );
}
