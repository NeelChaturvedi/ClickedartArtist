import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBlogs from 'src/Screens/Profiletabs/TabBlogs';
import TabCatalogues from 'src/Screens/Profiletabs/TabCatalogue';
import TabPhotos from 'src/Screens/Profiletabs/TabPhotos';
import {useTheme} from 'src/themes/useTheme';

const Tab = createMaterialTopTabNavigator();

export const ProfileTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1, backgroundColor: theme.background}}
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: '#ED3147'},
        tabBarLabelStyle: {fontSize: 16, fontWeight: 650},
        tabBarStyle: {
          backgroundColor: theme.background,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarActiveTintColor: '#ED3147',
        tabBarInactiveTintColor: '#888',
      }}>
      <Tab.Screen name="Photos" component={TabPhotos} />
      <Tab.Screen name="Catalogues" component={TabCatalogues} />
      <Tab.Screen name="Blogs" component={TabBlogs} />
    </Tab.Navigator>
  );
};
