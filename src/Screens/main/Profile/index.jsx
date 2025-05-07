import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import {Image} from 'moti';

const Profile = () => {
  return (
    <SafeAreaView style={style.background}>
      <Image
        style={style.coverImage}
        source={require('../../../assets/images/onboarding.png')}
      />
      <View style={style.profileDiv}>
        <Image
          style={style.profileImage}
          source={require('../../../assets/images/onboarding.png')}
        />
        <View style={style.edit}></View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
