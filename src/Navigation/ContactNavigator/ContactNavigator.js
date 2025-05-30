import {useTheme} from 'src/themes/useTheme';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Inquiry from 'src/Screens/ContactPage/Inquiry';
import Socials from 'src/Screens/ContactPage/Socials';

export const ContactNavigator = () => {
  const Tab = createMaterialTopTabNavigator();


  const theme = useTheme();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle:{
        backgroundColor: theme.background,
      },
      tabBarLabelStyle:{
        color: theme.text,
        fontFamily:'Calibri-Bold',
        fontSize: 16,
      },
      tabBarIndicatorStyle:{
        backgroundColor: '#ED3147',
      },
    }}
    >
      <Tab.Screen name="Contact" component={Socials} />
      <Tab.Screen name="Inquiry" component={Inquiry} />
    </Tab.Navigator>
  );
};

