import {SafeAreaView, View, FlatList, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {style} from './styles';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/button';
import {useUserStore} from '../../store/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const settingsData = [
  {id: '1', icon: 'key', label: 'Change Password', screen: 'Change Password'},
  {id: '2', icon: 'lock', label: 'Privacy Policy', screen: 'Privacy Policy'},
  {id: '3', icon: 'edit-document', label: 'Terms of Use', screen: 'Terms of Use'},
  {id: '4', icon: 'help', label: 'FAQS', screen: 'Faqs'},
  {id: '5', icon: 'star', label: 'Membership', screen: 'Membership'},
  {id: '6', icon: 'currency-rupee', label: 'Monetize Account', screen: 'Monetize Account'},
  {id: '7', icon: 'info', label: 'Help Center', screen: 'Help Center'},
];

const Settings = () => {
  const {clearUser} = useUserStore();
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={style.settingsItem}
      onPress={() => navigation.navigate(item.screen)}>
      <View style={style.options}>
        <View style={style.iconContainer}>
          <Icon name={item.icon} size={24} color="white" />
        </View>
        <Text style={style.itemText}>{item.label}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );

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
