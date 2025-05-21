import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import CatalogueScreen from 'src/Screens/CatalogueScreen/CatalogueScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function CatalogueNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Catalogue Screen"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="Catalogue Screen" component={CatalogueScreen} />
    </Stack.Navigator>
  );
}
