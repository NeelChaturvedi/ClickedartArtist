import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Onboarding from './src/Screens/Onboarding';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import {Tabs} from './src/Navigation/UserTabs';
import {useUserStore} from './src/store/auth';
import {useOnboardingStore} from './src/store/onboarding';
import Details from './src/Navigation/AuthStack';
import SettingsNavigator from './src/Navigation/SettingsNavigator/SettingsNavigator';
import OtpScreen from './src/Screens/OTP/OtpScreen';
import BlogNavigator from './src/Navigation/BlogNavigator/BlogNavigator';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const {user} = useUserStore();
  const {isOnboardingCompleted} = useOnboardingStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            {!isOnboardingCompleted && (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="OTP" component={OtpScreen}/>
          </>
        ) : (
          <>
            <Stack.Screen name="BottomTab" component={Tabs} />
            <Stack.Screen name="Settings" component={SettingsNavigator} />
            <Stack.Screen name="BlogNavigator" component={BlogNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
