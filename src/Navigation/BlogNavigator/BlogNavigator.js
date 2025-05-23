import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Blog from '../../Screens/Blogs/Blog';
import BlogEdit from './BlogEdit';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

enableScreens();

const Stack = createNativeStackNavigator();

function BlogHeaderRight() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
      <Pressable
        // style={{marginRight: 12}}
        onPress={() => console.log('Add Photo 1')}>
        <Icon name="edit" size={24} color={'white'} />
      </Pressable>
      <Pressable onPress={() => console.log('Add Photo 2')}>
        <Icon name="share" size={24} color={'white'} />
      </Pressable>
    </View>
  );
}

export default function BlogNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Blogs"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },

        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Blogs"
        options={{
          headerRight: () => <BlogHeaderRight />,
          headerTitle: '',
        }}
        component={Blog}
      />
      <Stack.Screen
        options={{headerTitle: 'Edit Blog'}}
        name="BlogEdit"
        component={BlogEdit}
      />
    </Stack.Navigator>
  );
}
