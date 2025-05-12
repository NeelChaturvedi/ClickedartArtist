import {Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import SearchBar from '../../components/SearchBar';
import {ScrollView} from 'moti';
import Button from '../../components/button';
import {useUserStore} from '../../store/auth';
import Backbutton from '../../components/Backbutton';
import SettingsOptions from '../../components/SettingsOptions';


const Settings = () => {
  const {clearUser} = useUserStore();
  

  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <View style={style.backButtonContainer}>
          <Backbutton />
        </View>
        <Text style={style.headingText}>Settings</Text>
        <SearchBar />
        <ScrollView>
          <SettingsOptions icon={'shield-outline'} label={'AccountSecurity'}/>
          <SettingsOptions icon={'lock'} label={'Privacy Policy'}/>
          <SettingsOptions icon={'file-document-outline'} label={'Terms and Conditions'}/>
          <SettingsOptions icon={'help-circle-outline'} label={'FAQS'} screen={'Faqs'}/>
          <SettingsOptions icon={'star-outline'} label={'Membership'}/>
          <SettingsOptions icon={'currency-inr'} label={'Monetize Account'}/>
          <SettingsOptions icon={'contact'} label={'Help Center'}/>
        </ScrollView>
        <Button btnText={'LogOut'} onPress={clearUser} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
