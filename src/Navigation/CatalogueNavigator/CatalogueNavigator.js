/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import CatalogueScreen from 'src/Screens/CatalogueScreen/CatalogueScreen';
import {Pressable, Share, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

enableScreens();

const Stack = createNativeStackNavigator();

function CatalogueHeaderRight({catalogueId}) {
  const onShare = async () => {
    await Share.share({
      message: `Check out my catalogue: https://clickedart.com/catalogue/${catalogueId}`,
    });
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
      <Pressable
        // style={{marginRight: 12}}
        onPress={() => console.log('Add Photo 1')}>
        <Icon name="add-photo-alternate" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => onShare()}>
        <Icon name="share" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export default function CatalogueNavigator() {
  const [catalogueId, setCatalogueId] = React.useState({});

  const renderHeaderRight = React.useCallback(
    () => <CatalogueHeaderRight catalogueId={catalogueId} />,
    [catalogueId],
  );

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
          headerRight: renderHeaderRight,
        }}
        name="Catalogue Screen"
        children={props => (
          <CatalogueScreen {...props} setCatalogueId={setCatalogueId} />
        )}
      />
    </Stack.Navigator>
  );
}
