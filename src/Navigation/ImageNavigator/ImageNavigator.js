import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import ImageScreen from 'src/Screens/ImageScreen';
import EditImage from 'src/Screens/EditImage';
import {useTheme} from 'src/themes/useTheme';

enableScreens();

const Stack = createNativeStackNavigator();

export default function ImageNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="ImageScreen"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
      }}>
      <Stack.Screen
        name="ImageScreen"
        options={({route}) => ({
          title: route.params?.title
            ? route.params?.title
            : 'Image Detail',
        })}
        children={props => <ImageScreen {...props} />}
      />
      <Stack.Screen
        name="EditImage"
        options={({route}) => ({
          title: route.params?.title
            ? route.params?.title
            : 'Image Detail',
        })}
        children={props => <EditImage {...props} />}
      />
    </Stack.Navigator>
  );
}
