/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import CatalogueScreen from 'src/Screens/CatalogueScreen/CatalogueScreen';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

enableScreens();

const Stack = createNativeStackNavigator();

function CatalogueHeaderRight() {
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', gap:16}}>
      <Pressable
        // style={{marginRight: 12}}
        onPress={() => console.log('Add Photo 1')}>
        <Icon name="add-photo-alternate" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => console.log('Add Photo 2')}>
        <Icon name="share" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export default function CatalogueNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Catalogue Screen"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
          alignItems: 'center',
        },
        headerTitle: '',
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        options={{
          headerRight: () => <CatalogueHeaderRight />,
        }}
        name="Catalogue Screen"
        component={CatalogueScreen}
      />
    </Stack.Navigator>
  );
}
