import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import tabPhotos from '../Screens/main/Profile/Profiletabs/tabPhotos';
import tabCatalogues from '../Screens/main/Profile/Profiletabs/tabCatalogue';
import tabBlogs from '../Screens/main/Profile/Profiletabs/tabBlogs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="tabPhotos" component={tabPhotos} />
        <Tab.Screen name="tabCatalogue" component={tabCatalogues} />
        <Tab.Screen name="tabBlogs" component={tabBlogs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default ProfileTabs;
