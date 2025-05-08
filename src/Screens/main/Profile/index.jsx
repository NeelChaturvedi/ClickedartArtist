/* eslint-disable react-native/no-inline-styles */
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import {Image} from 'moti';
import {useUserStore} from '../../../store/auth';
import ProfileTabs from '../../../navigation/profiletabs';

const Profile = () => {
  const {user} = useUserStore();
  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <View style={{height: '25%'}}>
        <Image
          style={style.coverImage}
          source={
            user?.coverImage
              ? {uri: user?.coverImage}
              : require('../../../assets/images/onboarding.png')
          }
        />
        <View style={style.profileDiv}>
          <Image
            style={style.profileImage}
            source={
              user?.profileImage
                ? {uri: user?.profileImage}
                : require('../../../assets/images/onboarding.png')
            }
          />
          <Pressable style={style.edit}>
            <Image
              style={{height: 12, width: 12, tintColor: '#000'}}
              source={require('../../../assets/tabIcons/edit.png')}
            />
          </Pressable>
        </View>
      </View>

      <View style={style.userDetails}>
        <Text style={style.userName}>
          {user.firstName || ''} {user.lastName || ''}
        </Text>
        <Text style={style.userAddress}>
          {user?.shippingAddress.city}, {user?.shippingAddress.country}
        </Text>
        <Text style={style.userAddress}>
          {user?.shippingAddress.city}, {user?.shippingAddress.country}
        </Text>
      </View>

      <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
        <ProfileTabs />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
