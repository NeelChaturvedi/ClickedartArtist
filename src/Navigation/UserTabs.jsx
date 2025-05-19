/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import Photos from '../Screens/Photos';
import {View} from 'moti';
import ProfileNavigator from './ProfileNavigator/ProfileNavigator';
import AccountNavigator from './AccountNavigator/AccountNavigator';
import DashboardIcon from '../assets/svgs/DashBoardIcon.svg';
import AccountsIcon from '../assets/svgs/AccountsIcon.svg';
import PhotosIcon from '../assets/svgs/PhotosIcon.svg';
import ProfileIcon from '../assets/svgs/ProfileIcon.svg';
import PostsIcon from '../assets/svgs/PostsIcon.svg';
import SlideUpModal from '@components/SlideupModal';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  const [slideUp, setSlideUp] = useState(false);

  const navigation = useNavigation();

  const postsOptions = [
    {
      label: 'Upload Image',
      icon: 'image',
      onPress: () => {
        navigation.navigate('Upload Image');
      },
    },
    {
      label: 'Upload Catalogue',
      icon: 'account-circle',
      onPress: () => {},
    },
    {
      label: 'Upload Blog',
      icon: 'edit',
      onPress: () => {},
    },
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: 'Outfit-bold',
          },
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#ED3147',
          tabBarStyle: {
            height: 100,
            backgroundColor: '#000',
            paddingTop: 20,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 0,
          },
        }}
        initialRouteName="Profile"
        backBehavior="initialRoute">
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <DashboardIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Photos"
          component={Photos}
          options={{
            tabBarIcon: ({focused}) => (
              <PhotosIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Upload"
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
                <PostsIcon
                  width={24}
                  height={24}
                  color={focused ? '#ED3147' : 'white'}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              setSlideUp(true);
            },
          }}>
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name="Accounts"
          component={AccountNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <AccountsIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <ProfileIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={postsOptions}
      />
    </>
  );
};
