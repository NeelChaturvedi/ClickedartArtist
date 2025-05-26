import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {createSettingStyles} from './styles';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/button';
import {useUserStore} from '../../store/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'src/themes/useTheme';
import api from 'src/utils/apiClient';

const Settings = () => {
  const {user, clearUser} = useUserStore();
  const [isMonetized, setIsMonetized] = useState(false);
  const [monetizationStatus, setMonetizationStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const settingsData = [
    {id: '1', icon: 'key', label: 'Change Password', screen: 'Change Password'},
    {id: '2', icon: 'lock', label: 'Privacy Policy', screen: 'Privacy Policy'},
    {
      id: '3',
      icon: 'edit-document',
      label: 'Terms of Use',
      screen: 'Terms of Use',
    },
    {id: '4', icon: 'help', label: 'FAQS', screen: 'Faqs'},
    {id: '5', icon: 'star', label: 'Manage Membership', screen: 'Membership'},
    {
      id: '6',
      icon: 'currency-rupee',
      label: isMonetized ? 'Manage Monetization' : 'Monetize Account',
      screen: 'Monetize Account',
    },
    {id: '7', icon: 'info', label: 'Help Center', screen: 'Help Center'},
  ];

  const theme = useTheme();
  const style = useMemo(() => createSettingStyles(theme), [theme]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={style.settingsItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={style.options}>
        <View style={style.iconContainer}>
          <Icon
            name={item.icon}
            size={24}
            color={
              item.id === '6'
                ? isMonetized && monetizationStatus === 'approved'
                  ? '#2ECC71'
                  : monetizationStatus === 'pending'
                  ? 'orange'
                  : 'red'
                : theme.text
            }
          />
        </View>
        <Text style={style.itemText}>{item.label}</Text>
      </View>
      <Feather name="chevron-right" size={24} color={theme.text} />
    </TouchableOpacity>
  );

  React.useEffect(() => {
    const getMonetizationData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/monetization/getMonetizationByPhotographerId?photographerId=${user?._id}`,
        );
        if (response.data.monetization) {
          setIsMonetized(true);
          setMonetizationStatus(response.data.monetization.status);
        }
      } catch (error) {
        console.log('Error fetching monetization data:');
      } finally {
        setIsLoading(false);
      }
    };
    if (user?._id) {
      getMonetizationData();
    }
  }, [user._id]);

  if (isLoading) {
    return (
      <SafeAreaView style={style.background}>
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#ED3147" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <SearchBar />
        <FlatList
          data={settingsData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <Button btnText={'LogOut'} onPress={clearUser} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
