/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {style} from './styles';
import {Image} from 'moti';
import {useUserStore} from '../../store/auth';
import TabPhotos from '../Profiletabs/TabPhotos';
import TabCatalogues from '../Profiletabs/TabCatalogue';
import TabBlogs from '../Profiletabs/TabBlogs';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  const {user} = useUserStore();

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('photos');
  const handleTabPress = tab => {
    setActiveTab(tab);
  };
  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
        <View style={style.profileHeader}>
          <Image
            style={style.coverImage}
            source={
              user?.coverImage
                ? {uri: user?.coverImage}
                : require('../../assets/images/onboarding.png')
            }
          />
          <View style={style.profileDiv}>
            <Image
              style={style.profileImage}
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : require('../../assets/images/onboarding.png')
              }
            />
            <Pressable
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
              style={style.edit}>
              <Image
                style={{height: 12, width: 12, tintColor: '#000'}}
                source={require('../../assets/tabIcons/edit.png')}
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
          <Text style={style.userBio}>{user?.bio}</Text>
        </View>
        <View style={style.accountInfo}>
          <View style={style.summary}>
            <Text style={style.title}>IMPRESSIONS</Text>
            <Text style={style.count}>0</Text>
          </View>
          <View style={style.summary}>
            <Text style={style.title}>PHOTOS</Text>
            <Text style={style.count}>0</Text>
          </View>
          <View style={style.summary}>
            <Text style={style.title}>DOWNLOADS</Text>
            <Text style={style.count}>0</Text>
          </View>
        </View>
        <View style={style.tabsContainer}>
          <View style={style.tabs}>
            <Pressable onPress={() => handleTabPress('photos')}>
              <Text style={style.tabText}>Photos</Text>
            </Pressable>
            <Pressable onPress={() => handleTabPress('catalogues')}>
              <Text style={style.tabText}>Catalogues</Text>
            </Pressable>
            <Pressable onPress={() => handleTabPress('blogs')}>
              <Text style={style.tabText}>Blogs</Text>
            </Pressable>
          </View>
          <View>
            {activeTab === 'photos' ? ( <TabPhotos /> )
            : activeTab === 'catalogues' ? ( <TabCatalogues /> )
            : ( <TabBlogs /> )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
