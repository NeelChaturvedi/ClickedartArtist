/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useUserStore} from 'src/store/auth';
import {useTheme} from 'src/themes/useTheme';
import {createProfileStyles} from 'src/Screens/Profile/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Pressable,
  Text,
  Share,
  View,
  Alert,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from 'src/utils/apiClient';
import {useAnalyticsStore} from 'src/store/photographerAnalytics';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '@env';
import SlideUpModal from './SlideupModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileSkeleton from 'src/Screens/Profile/Loader';

const ProfileHeader = () => {
  const {user, fetchUserFromToken} = useUserStore();
  const theme = useTheme();
  const style = useMemo(() => createProfileStyles(theme), [theme]);
  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);
  const {stats, loading: statsLoading, fetchStats} = useAnalyticsStore();
  const [profileUploading, setProfileUploading] = useState(false);
  const [fullBio, setFullBio] = useState(null);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out my profile: https://clickedart.com/photographer/${
          user?.username || ''
        }`,
      });
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Share Error', error.message);
    }
  };

  const profileOptions = [
    {
      label: 'Cover Image',
      icon: 'image',
      onPress: () => {
        handleCoverImageUpdate();
      },
    },
    {
      label: 'Profile Image',
      icon: 'account-circle',
      onPress: () => {
        handleProfileImageUpdate();
      },
    },
    {
      label: 'Edit Profile',
      icon: 'edit',
      onPress: () => {
        navigation.navigate('ProfileEdit');
      },
    },
  ];

  const handleProfileImageUpdate = async () => {
    try {
      setProfileUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      const croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        cropperCircleOverlay: true,
        path: image.path,
        width: 1000,
        height: 1000,
      });
      await uploadImageToServer('profileImage', croppedImage.path);
    } catch (error) {
      console.error('Picker error:', error);
      ToastAndroid.show('Failed to select or crop image', ToastAndroid.SHORT);
    } finally {
      setProfileUploading(false);
    }
  };

  const handleCoverImageUpdate = async () => {
    try {
      setProfileUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      const croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        path: image.path,
        width: 1600,
        height: 900,
      });
      await uploadImageToServer('coverImage', croppedImage.path);
    } catch (error) {
      console.error('Picker error:', error);
      ToastAndroid.show('Failed to select or crop image', ToastAndroid.SHORT);
    } finally {
      setProfileUploading(false);
    }
  };

  const uploadImageToServer = async (dataName, imageUri) => {
    if (!imageUri) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      return;
    }
    const imgData = new FormData();
    imgData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    try {
      const res = await axios.post(
        `${API_URL}/api/upload/uploadSingleImage`,
        imgData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const imageUrl = res.data;
      await handleProfileEdit(dataName, imageUrl);
      ToastAndroid.show('Image uploaded successfully!', ToastAndroid.SHORT);
    } catch (err) {
      console.error('Upload error:', err);
      ToastAndroid.show('Failed to upload image', ToastAndroid.SHORT);
    }
  };

  const handleProfileEdit = async (dataName, dataValue) => {
    try {
      await api.post('/photographer/update-profile', {
        [dataName]: dataValue,
        photographerId: user?._id,
      });
      await fetchUserFromToken();
    } catch (error) {
      console.error(
        'Profile Edit Error:',
        error.response?.data || error.message,
      );
      ToastAndroid.show('Failed to update profile', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchStats(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  if (statsLoading) {
    return (
      <SafeAreaView style={[style.background, {flex: 1}]}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }
  return (
    <View
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl
          refreshing={profileUploading}
          onRefresh={() => {
            setProfileUploading(true);
            fetchUserFromToken().finally(() => setProfileUploading(false));
          }}
        />
      }
      pointerEvents="box-none"
      style={{
        paddingTop: 0,
        paddingBottom: 30,
        backgroundColor: theme.background,
      }}>
      <View style={style.profileHeader}>
        <View style={style.coverImageContainer}>
          <FastImage
            style={style.coverImage}
            source={
              user?.coverImage
                ? {uri: user.coverImage}
                : require('../assets/images/onboarding.png')
            }
          />
          <View style={style.headerIcons}>
            <Pressable
              onPress={() => navigation.navigate('SettingsNavigator')}
              style={style.iconContainer}>
              <Icon name="gear" size={20} color={theme.text} />
            </Pressable>
            <Pressable onPress={onShare} style={style.iconContainer}>
              <Icon name="share" size={20} color={theme.text} />
            </Pressable>
          </View>
        </View>
        <View style={style.profileDiv}>
          <FastImage
            style={style.profileImage}
            source={
              user?.profileImage
                ? {uri: user.profileImage}
                : require('../assets/images/onboarding.png')
            }
          />
          <Pressable style={style.edit} onPress={() => setSlideUp(true)}>
            <FastImage
              style={{height: 12, width: 12, tintColor: theme.background}}
              source={require('../assets/tabIcons/edit.png')}
            />
          </Pressable>
          <SlideUpModal
            visible={slideUp}
            onClose={() => setSlideUp(false)}
            options={profileOptions}
          />
        </View>
      </View>
      <View style={style.userDetails}>
        <Text style={style.userName}>
          {user?.firstName || ''} {user?.lastName || ''}
        </Text>
        <Text style={style.userAddress}>
          {user?.shippingAddress?.city || ''},{' '}
          {user?.shippingAddress?.country || ''}
        </Text>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={style.userBio}>
            {fullBio
              ? fullBio
              : user?.bio?.split(' ').length <= 20
              ? user?.bio || ''
              : user?.bio?.split(' ').slice(0, 20).join(' ') + '...'}
          </Text>
          {user?.bio?.split(' ').length > 20 && (
            <Pressable
              style={{paddingVertical: 16}}
              onPress={() => {
                setFullBio(fullBio ? null : user?.bio);
              }}>
              <Icon
                name={fullBio ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={theme.text}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View style={style.accountInfo}>
        <View style={style.summary}>
          <Text style={style.title}>IMPRESSIONS</Text>
          <Text style={style.count}>{stats?.totalViews || 0}</Text>
        </View>
        <View style={style.summary}>
          <Text style={style.title}>PHOTOS</Text>
          <Text style={style.count}>{stats?.totalUploadingImgCount || 0}</Text>
        </View>
        <View style={style.summary}>
          <Text style={style.title}>DOWNLOADS</Text>
          <Text style={style.count}>{stats?.downloads || 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
