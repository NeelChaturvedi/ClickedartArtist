import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

import Settings from '../../Screens/SettingScreen/Settings';
import Faqs from './Faqs';
import TermsAndConditions from './TermsConditions';
import Membership from './Membership';
import PrivacyPolicy from './PrivacyPolicy';
import ChangePassword from './ChangePassword';
import Monetization from './Monetization';
import { useTheme } from 'src/themes/useTheme';
import Theme from './Theme';
import SupportVideos from './SupportVideos';
import ContactUs from './ContactUs';
enableScreens();

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {

  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle:{
          color: theme.text,
        },
        headerTitleAlign: 'center',
        headerTintColor:theme.text,
      }}>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="Faqs" component={Faqs}/>
      <Stack.Screen name="Terms of Use" component={TermsAndConditions}/>
      <Stack.Screen name="Membership" component={Membership}/>
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy}/>
      <Stack.Screen name="Support Videos" component={SupportVideos}/>
      <Stack.Screen name="Change Password" component={ChangePassword}/>
      <Stack.Screen name="Monetize Account" component={Monetization}/>
      <Stack.Screen name="Contact Us" component={ContactUs}/>
      <Stack.Screen name="Manage Theme" component={Theme}/>
    </Stack.Navigator>
  );
}
