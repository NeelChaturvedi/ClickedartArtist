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
          <SettingsOptions icon={'gpp-good'} label={'AccountSecurity'}/>
          <SettingsOptions icon={'lock'} label={'Privacy Policy'}/>
          <SettingsOptions icon={'edit-document'} label={'Terms and Conditions'} screen={'Terms'}/>
          <SettingsOptions icon={'help'} label={'FAQS'} screen={'Faqs'}/>
          <SettingsOptions icon={'star'} label={'Membership'} screen={'Membership'}/>
          <SettingsOptions icon={'currency-rupee'} label={'Monetize Account'}/>
          <SettingsOptions icon={'info'} label={'Help Center'}/>
        </ScrollView>
        <Button btnText={'LogOut'} onPress={clearUser} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
