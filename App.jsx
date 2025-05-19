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
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'moti';
import ProfileEditScreen from 'src/Screens/ProfileEdit/ProfileEditScreen';
import {useOnboardingStore} from 'src/store/onboarding';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const {loadToken, user} = useUserStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const {isOnboardingCompleted, loadOnboardingStatus} = useOnboardingStore();

  React.useEffect(() => {
    const checkStatus = async () => {
      setIsLoading(true);
      await loadOnboardingStatus();
      await loadToken();
      setIsLoading(false);
    };
    checkStatus();
  }, [loadOnboardingStatus, loadToken]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loader}>
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
            <Stack.Screen
              name="ProfileEdit"
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitle: {
                  color: 'white',
                },
                headerTintColor: 'white',
              }}
              component={ProfileEditScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
