import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/main/Dashboard';
import Photos from '../Screens/main/Photos';
import Posts from '../Screens/main/Posts';
import Accounts from '../Screens/main/Accounts';
import Profile from '../Screens/main/Profile';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Photos" component={Photos} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Accounts" component={Accounts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
