import {Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import SearchBar from '../../components/SearchBar';
import {ScrollView} from 'moti';
import Button from '../../components/button';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const settingsItems = [
    {icon: 'shield-outline', label: 'Account Security'},
    {icon: 'lock-outline', label: 'Privacy Policy'},
    {icon: 'file-document-outline', label: 'Terms & Conditions'},
    {icon: 'help-circle-outline', label: 'FAQs'},
    {icon: 'star-outline', label: 'Membership'},
    {icon: 'currency-inr', label: 'Monetize Account'},
    {icon: 'headset', label: 'Help Center'},
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <Text style={style.headingText}>Settings</Text>
        <SearchBar />
        <ScrollView>
          {settingsItems.map((item, index) => (
            <TouchableOpacity key={index} style={style.settingsItem}>
              <View style={style.options}>
                <View style={style.iconContainer}>
                  <Icon name={item.icon} size={24} color="#fff" />
                </View>
                <Text style={style.itemText}>{item.label}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button btnText={'LogOut'}/>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
