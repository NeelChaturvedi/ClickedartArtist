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
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'moti';
import ProfileEditScreen from 'src/Screens/ProfileEdit/ProfileEditScreen';
import {useOnboardingStore} from 'src/store/onboarding';
import UploadImage from 'src/Screens/UploadImage';
import UploadBlog from 'src/Screens/UploadBlog';
import ImageNavigator from 'src/Navigation/ImageNavigator/ImageNavigator';
import CatalogueNavigator from 'src/Navigation/CatalogueNavigator/CatalogueNavigator';
import CheckOut from 'src/Screens/CheckOut/CheckOut';
import {useTheme} from 'src/themes/useTheme';
import LottieView from 'lottie-react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const {loadToken, user} = useUserStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const {isOnboardingCompleted, loadOnboardingStatus} = useOnboardingStore();
  const [timeOut, setTimeOut] = React.useState(false);

  const theme = useTheme();
  const styles = getStyles(theme);

  React.useEffect(() => {
    const checkStatus = async () => {
      await loadOnboardingStatus();
      await loadToken();
      setIsLoading(false);
    };
    checkStatus();
  }, [loadOnboardingStatus, loadToken]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeOut(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !timeOut) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loader}>
          <LottieView
            style={styles.animation}
            source={require('./src/assets/animations/ClickedartArtist.json')}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            navigationBarColor: theme.background,
            headerTitleAlign: 'center',
          }}
          initialRouteName='Details'>
          {!user ? (
            <>
              {!isOnboardingCompleted && (
                <Stack.Screen name="Onboarding" component={Onboarding} />
              )}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen
                name="OTP"
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme.background,
                  },
                  headerTitle: ' ',
                  headerTintColor: theme.text,
                }}
                component={OtpScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="BottomTab" component={Tabs} />
              <Stack.Screen
                name="SettingsNavigator"
                component={SettingsNavigator}
              />
              <Stack.Screen name="BlogNavigator" component={BlogNavigator} />
              <Stack.Screen
                name="ProfileEdit"
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme.background,
                  },
                  headerTitle: 'Edit Profile',
                  headerTintColor: theme.text,
                }}
                component={ProfileEditScreen}
              />
              <Stack.Screen
                name="Upload Image"
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme.background,
                  },
                  title: 'Upload Image',
                  headerTitleAlign: 'center',
                  headerTintColor: theme.text,
                }}
                component={UploadImage}
              />
              <Stack.Screen name="ImageNavigator" component={ImageNavigator} />
              <Stack.Screen
                name="CatalogueNavigator"
                component={CatalogueNavigator}
              />
              <Stack.Screen
                name="Write a blog"
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme.background,
                  },
                  headerTitle: {
                    color: theme.text,
                  },
                  headerTintColor: theme.text,
                }}
                component={UploadBlog}
              />
              <Stack.Screen
                name="Place Order"
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: theme.background,
                  },
                  headerTitle: {
                    color: theme.text,
                  },
                  headerTintColor: theme.text,
                }}
                component={CheckOut}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const getStyles = theme =>
  StyleSheet.create({
    loadingContainer: {
      backgroundColor: theme.background,
      height: '100%',
      width: '100%',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    animation: {
      width: 200,
      height: 200,
    },
  });
