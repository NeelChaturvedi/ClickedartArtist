// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Onboarding from './src/Screens/Onboarding';
import Login from './src/Screens/auth/Login';
import Register from './src/Screens/auth/Register';
import {Tabs} from './src/navigation/tab';
import {useUserStore} from './src/store/auth';
import {useOnboardingStore} from './src/store/onboarding';
import Details from './src/navigation/details';
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
            <Stack.Screen name="Details" component={Details}/>
          </>
        ) : (
          <Stack.Screen name="BottomTab" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
