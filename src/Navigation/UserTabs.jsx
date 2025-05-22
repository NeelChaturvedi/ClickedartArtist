/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import {View} from 'moti';
import ProfileNavigator from './ProfileNavigator/ProfileNavigator';
import AccountNavigator from './AccountNavigator/AccountNavigator';
import DashboardIcon from '../assets/svgs/DashBoardIcon.svg';
import AccountsIcon from '../assets/svgs/AccountsIcon.svg';
import CartIcon from '../assets/svgs/CartIcon.svg';
import ProfileIcon from '../assets/svgs/ProfileIcon.svg';
import PostsIcon from '../assets/svgs/PostsIcon.svg';
import SlideUpModal from '@components/SlideupModal';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Modal, Pressable, StyleSheet, Text} from 'react-native';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Cart from 'src/Screens/Cart';

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  const [slideUp, setSlideUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const postsOptions = [
    {
      label: 'Upload an Image',
      icon: 'image',
      onPress: () => {
        navigation.navigate('Upload Image');
      },
    },
    {
      label: 'Create a Catalogue',
      icon: 'photo-library',
      onPress: () => {
        setShowModal(true);
      },
    },
    {
      label: 'Upload a Blog',
      icon: 'edit',
      onPress: () => {
        navigation.navigate('Write a blog');
      },
    },
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: 'Outfit-bold',
          },
          tabBarInactiveTintColor: 'white',
          tabBarActiveTintColor: '#ED3147',
          tabBarStyle: {
            height: 90,
            backgroundColor: '#000',
            paddingTop: 20,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 0,
          },
        }}
        initialRouteName="Profile"
        backBehavior="initialRoute">
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) => (
              <DashboardIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart Items"
          component={Cart}
          options={{
            tabBarIcon: ({focused}) => (
              <CartIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Upload"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: '#ED3147',
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PostsIcon
                  width={24}
                  height={24}
                  color={focused ? '#ED3147' : 'white'}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              setSlideUp(true);
            },
          }}>
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name="Accounts"
          component={AccountNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <AccountsIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <ProfileIcon
                width={24}
                height={24}
                color={focused ? '#ED3147' : 'white'}
              />
            ),
          }}
        />
      </Tab.Navigator>

      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={postsOptions}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setShowModal(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.title}>Create Catalogue</Text>
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Catalogue Name</Text>
              <AutoGrowTextInput placeholder={'Enter Title'} />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <AutoGrowTextInput placeholder={'Enter Description'} />
            </View>
            <Button btnText="Create" />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '85%',
    gap: 30,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit-bold',
    color: 'white',
    textAlign: 'center',
  },
  inputSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
});
