import {SafeAreaView, View, ScrollView} from 'react-native';
import React from 'react';
import {style} from './styles';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/button';
import {useUserStore} from '../../store/auth';
import SettingsOptions from '../../components/SettingsOptions';


const Settings = () => {
  const {clearUser} = useUserStore();

  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <SearchBar />
        <ScrollView>
          <SettingsOptions icon={'key'} label={'Change Password'} screen={'Change Password'}/>
          <SettingsOptions icon={'lock'} label={'Privacy Policy'} screen={'Privacy Policy'}/>
          <SettingsOptions icon={'edit-document'} label={'Terms of Use'} screen={'Terms of Use'}/>
          <SettingsOptions icon={'help'} label={'FAQS'} screen={'Faqs'}/>
          <SettingsOptions icon={'star'} label={'Membership'} screen={'Membership'}/>
          <SettingsOptions icon={'currency-rupee'} label={'Monetize Account'}/>
          <SettingsOptions icon={'info'} label={'Help Center'} screen={'Help Center'}/>
        </ScrollView>
        <Button btnText={'LogOut'} onPress={clearUser} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
