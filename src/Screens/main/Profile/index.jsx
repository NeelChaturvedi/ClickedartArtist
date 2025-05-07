/* eslint-disable react-native/no-inline-styles */
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import {Image} from 'moti';

const Profile = () => {
  return (
    <SafeAreaView style={style.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Image
            style={style.coverImage}
            source={require('../../../assets/images/onboarding.png')}
          />
          <View style={style.profileDiv}>
            <Image
              style={style.profileImage}
              source={require('../../../assets/images/onboarding.png')}
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
          <Text style={style.userName}>Bhanu Sharma</Text>
          <Text style={style.userAddress}>Lucknow, India</Text>
        </View>
      </ScrollView>
      <View></View>
    </SafeAreaView>
  );
};

export default Profile;
