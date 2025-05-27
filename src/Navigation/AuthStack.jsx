// App.js
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Personal from '../Screens/Details/Personal';
import Contact from '../Screens/Details/Contact';
import ProfilePhoto from '../Screens/Details/ProfilePhoto';
import {useTheme} from 'src/themes/useTheme';

enableScreens();

const Stack = createNativeStackNavigator();

export default function Details() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Personal Details"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.text,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
      }}>
      <Stack.Screen name="Personal Details" component={Personal} />
      <Stack.Screen name="Contact Details" component={Contact} />
      <Stack.Screen name="Upload Profile" component={ProfilePhoto} />
    </Stack.Navigator>
  );
}
