// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Onboarding from './src/Screens/Onboarding';
import Login from './src/Screens/auth/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from './src/Screens/auth/Register';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    React.useState(false);

  const checkOnboardingStatus = async () => {
    const status = await AsyncStorage.getItem('isOnboardingCompleted');
    if (status === 'true') {
      setIsOnboardingCompleted(true);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isOnboardingCompleted === 'true' && (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
