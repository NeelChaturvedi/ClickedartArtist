/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import Photos from '../Screens/Photos';
import Posts from '../Screens/Posts';
import {Image} from 'react-native';
import {View} from 'moti';
import ProfileNavigator from './ProfileNavigator/ProfileNavigator';
import AccountNavigator from './AccountNavigator/AccountNavigator';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Outfit-bold',
        },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#ED3147',
        tabBarStyle: {
          height: 92,
          backgroundColor: '#000',
          paddingTop: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 0,
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
                tintColor: focused ? '#ED3147' : '#fff',
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
                tintColor: focused ? '#ED3147' : '#fff',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: '#ED3147',
                width: 60,
                height: 60,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/tabIcons/posts.png')}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                  tintColor: '#fff',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/accounts.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ED3147' : '#fff',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/tabIcons/profile.png')}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? '#ED3147' : '#fff',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
