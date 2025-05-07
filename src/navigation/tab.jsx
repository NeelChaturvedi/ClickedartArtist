/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/main/Dashboard';
import Photos from '../Screens/main/Photos';
import Posts from '../Screens/main/Posts';
import Accounts from '../Screens/main/Accounts';
import Profile from '../Screens/main/Profile';
import {Image} from 'react-native';
import {View} from 'moti';

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
          backgroundColor: '#1E1E1E',
          position: 'absolute',
          bottom: 25,
          paddingTop: 10,
          paddingHorizontal: 10,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 50,
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
                width: 80,
                height: 80,
                borderRadius: 50,
                borderWidth: 8,
                borderColor: '#000',
                marginTop: -40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/tabIcons/posts.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#fff',
                }}
              />
            </View>
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
                tintColor: focused ? '#ED3147' : '#fff',
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
                tintColor: focused ? '#ED3147' : '#fff',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
