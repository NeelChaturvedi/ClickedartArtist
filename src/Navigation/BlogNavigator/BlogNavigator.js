import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Blog from '../../Screens/Blogs/Blog';
import BlogEdit from './BlogEdit';

enableScreens();

const Stack = createNativeStackNavigator();

export default function BlogNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Blogs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Blogs" component={Blog} />
      <Stack.Screen name="BlogEdit" component={BlogEdit} />
    </Stack.Navigator>
  );
}
