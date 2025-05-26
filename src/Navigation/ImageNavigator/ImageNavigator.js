import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import ImageScreen from 'src/Screens/ImageScreen';
import EditImage from 'src/Screens/EditImage';
import {useTheme} from 'src/themes/useTheme';

enableScreens();

const Stack = createNativeStackNavigator();

export default function ImageNavigator() {
  const [imageTitle, setImageTitle] = React.useState('');

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
        headerTitle: imageTitle,
        headerTintColor: theme.text,
      }}>
      <Stack.Screen
        name="ImageScreen"
        children={props => (
          <ImageScreen {...props} setImageTitle={setImageTitle} />
        )}
      />
      <Stack.Screen
        name="EditImage"
        children={props => (
          <EditImage {...props} setImageTitle={setImageTitle} />
        )}
      />
    </Stack.Navigator>
  );
}
