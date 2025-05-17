import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Onboarding from './src/Screens/Onboarding';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import {Tabs} from './src/Navigation/UserTabs';
import {useUserStore} from './src/store/auth';
import Details from './src/Navigation/AuthStack';
import SettingsNavigator from './src/Navigation/SettingsNavigator/SettingsNavigator';
import OtpScreen from './src/Screens/OTP/OtpScreen';
import BlogNavigator from './src/Navigation/BlogNavigator/BlogNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'moti';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const {fetchUserFromToken, user} = useUserStore();
  const [token, setToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    React.useState(false);

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const tokenStorage = await AsyncStorage.getItem('token');
        if (tokenStorage) {
          setToken(tokenStorage);
          await fetchUserFromToken(tokenStorage);
        }
        const onboardingStatus = await AsyncStorage.getItem(
          'isOnboardingCompleted',
        );
        if (onboardingStatus) {
          setIsOnboardingCompleted(JSON.parse(onboardingStatus));
        } else {
          setIsOnboardingCompleted(false);
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, [fetchUserFromToken]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'black',
          height: '100%',
          width: '100%',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color="#ed3147" />
        </View>
      </SafeAreaView>
    );
  }

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
            <Stack.Screen name="OTP" component={OtpScreen} />
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
