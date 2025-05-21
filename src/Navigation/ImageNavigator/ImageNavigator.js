import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import ImageScreen from 'src/Screens/ImageScreen';

enableScreens();

const Stack = createNativeStackNavigator();

export default function ImageNavigator() {
  const [imageTitle, setImageTitle] = React.useState('');
  return (
    <Stack.Navigator
      initialRouteName="ImageScreen"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleAlign: 'center',
        headerTitle: imageTitle,
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="ImageScreen"
        children={props => (
          <ImageScreen {...props} setImageTitle={setImageTitle} />
        )}
      />
    </Stack.Navigator>
  );
}
