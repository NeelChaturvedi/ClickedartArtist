import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import SearchBar from '../../components/SearchBar';
import {ScrollView} from 'moti';
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
          <SettingsOptions icon={'gpp-good'} label={'AccountSecurity'}/>
          <SettingsOptions icon={'lock'} label={'Privacy Policy'} screen={'PrivacyPolicy'}/>
          <SettingsOptions icon={'edit-document'} label={'Terms of Use'} screen={'Terms'}/>
          <SettingsOptions icon={'help'} label={'FAQS'} screen={'Faqs'}/>
          <SettingsOptions icon={'star'} label={'Membership'} screen={'Membership'}/>
          <SettingsOptions icon={'currency-rupee'} label={'Monetize Account'}/>
          <SettingsOptions icon={'info'} label={'Help Center'} screen={'HelpCenter'}/>
        </ScrollView>
        <Button btnText={'LogOut'} onPress={clearUser} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
