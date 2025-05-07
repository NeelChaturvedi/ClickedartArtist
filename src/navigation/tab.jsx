/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/main/Dashboard';
import Photos from '../Screens/main/Photos';
import Posts from '../Screens/main/Posts';
import Accounts from '../Screens/main/Accounts';
import Profile from '../Screens/main/Profile';
import {Image, Text, View} from 'react-native';

export const Tabs = () => {
  const {clearUser} = useUserStore();
  const Tab = createBottomTabNavigator();
  const Logout = () => {
    clearUser();
    return null;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#ED3147',
        tabBarStyle: {
          height: 80,
          paddingTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }}
      initialRouteName="Profile">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/dashboard.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#ED3147' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Photos"
        component={Photos}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/photos.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ED3147' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/posts.png')}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                marginBottom: 30,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={Accounts}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/accounts.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ED3147' : '#000',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/profile.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ED3147' : '#000',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
