import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import tabPhotos from '../Screens/main/Profile/Profiletabs/tabPhotos';
import tabCatalogues from '../Screens/main/Profile/Profiletabs/tabCatalogue';
import tabBlogs from '../Screens/main/Profile/Profiletabs/tabBlogs';

const Tab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ED3147',
        tabBarInactiveTintColor: '#fff',
        tabBarIndicatorStyle: {
          backgroundColor: '#ED3147',
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: '#000',
        },
        tabBarLabelStyle: {fontFamily: 'Outfit-bold', fontSize: 16},
      }}>
      <Tab.Screen name="Photos" component={tabPhotos} />
      <Tab.Screen name="Catalogue" component={tabCatalogues} />
      <Tab.Screen name="Blogs" component={tabBlogs} />
    </Tab.Navigator>
  );
}

export default ProfileTabs;
