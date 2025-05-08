/* eslint-disable react-native/no-inline-styles */
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import {Image} from 'moti';
import { useUserStore } from '../../../store/auth';


const Profile = () => {
  const { user } = useUserStore()
  return (
    <SafeAreaView style={style.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Image
            style={style.coverImage}
            source={user?.coverImage ? {uri: user?.coverImage} : require('../../../assets/images/onboarding.png')} //change placeholder later
          />
          <View style={style.profileDiv}>
            <Image
              style={style.profileImage}
              source={user?.profileImage ? {uri: user?.profileImage} : require('../../../assets/images/onboarding.png')} //change placeholder later
            />
            <Pressable style={style.edit}>
              <Image
                style={{height: 12, width: 12}}
                source={require('../../../assets/tabIcons/edit.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={style.userDetails}>
          <Text style={style.userName}>{user.firstName || ''} {user.lastName || ''}</Text>
          <Text style={style.userAddress}>{user?.shippingAddress.city}, {user?.shippingAddress.country}</Text>
        </View>
      </ScrollView>
      <View></View>
    </SafeAreaView>
  );
};

export default Profile;
