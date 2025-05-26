/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import CatalogueScreen from 'src/Screens/CatalogueScreen/CatalogueScreen';
import {Pressable, Share, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'src/themes/useTheme';

enableScreens();

const Stack = createNativeStackNavigator();

function CatalogueHeaderRight({catalogueId, setModalVisible}) {

  const theme = useTheme();

  const onShare = async () => {
    await Share.share({
      message: `Check out my catalogue: https://clickedart.com/catalogue/${catalogueId}`,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingRight: 20,
      }}>
      <Pressable onPress={() => setModalVisible(true)}>
        <MaterialIcon name="add-photo-alternate" size={26} color={theme.text} />
      </Pressable>
      <Pressable onPress={onShare}>
        <MaterialIcon name="share" size={26} color={theme.text} />
      </Pressable>
    </View>
  );
}

export default function CatalogueNavigator() {
  const [catalogueId, setCatalogueId] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);

    const theme = useTheme();

  const renderHeaderRight = React.useCallback(
    () => (
      <CatalogueHeaderRight
        catalogueId={catalogueId}
        setModalVisible={setModalVisible}
      />
    ),
    [catalogueId],
  );

  return (
    <>
      <Stack.Navigator
        initialRouteName="Catalogue Screen"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
            alignItems: 'center',
          },
          headerTitle: '',
          headerTintColor: theme.text,
        }}>
        <Stack.Screen
          options={{
            headerRight: renderHeaderRight,
          }}
          name="Catalogue Screen"
          children={props => (
            <CatalogueScreen
              {...props}
              setCatalogueId={setCatalogueId}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        />
      </Stack.Navigator>
    </>
  );
}
