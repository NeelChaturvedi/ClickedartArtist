/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Share,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {style} from './styles';
import {Image} from 'moti';
import {useUserStore} from '../../store/auth';
import TabPhotos from '../Profiletabs/TabPhotos';
import TabCatalogues from '../Profiletabs/TabCatalogue';
import TabBlogs from '../Profiletabs/TabBlogs';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../utils/apiClient';
import SlideUpModal from '../../components/SlideupModal';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '@env';

const Profile = () => {
  const {user, fetchUserFromToken} = useUserStore();

  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);

  const [activeTab, setActiveTab] = useState('photos');
  const [stats, setStats] = useState({});
  const [photos, setPhotos] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out my profile: https://clickedart.com/photographer/${user.username}`,
      });
    } catch (error) {
      Alert.alert(error.message);
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
    }
  };

  const handleProfileImageUpdate = async () => {
    try {
      setProfileUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      let croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        cropperCircleOverlay: true,
        path: image.path,
        width: 1000,
        height: 1000,
      });
      await uploadImageToServer('profileImage', croppedImage.path);
    } catch (error) {
      console.log('Picker error:', error);
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
      let croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        path: image.path,
        width: 1600,
        height: 900,
      });
      await uploadImageToServer('coverImage', croppedImage.path);
    } catch (error) {
      console.log('Picker error:', error);
    } finally {
      setProfileUploading(false);
    }
  };

  const handleProfileEdit = async (dataName, dataValue) => {
    try {
      await api.post('/photographer/update-profile', {
        [dataName]: dataValue,
        photographerId: user._id,
      });
      fetchUserFromToken();
    } catch (error) {
      console.error('Profile Edit Error', error.response);
    }
  };

  const slideOptions = [
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
        console.log('Edit Profile pressed');
      },
    },
  ];

  const tabs = [
    {label: 'Photos', key: 'photos'},
    {label: 'Catalogues', key: 'catalogues'},
    {label: 'Blogs', key: 'blogs'},
  ];

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [statsRes, photosRes, cataloguesRes, blogsRes] =
        await Promise.allSettled([
          api.get(
            `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
          ),
          api.get(
            `/images/get-images-by-photographer?photographer=${user._id}`,
          ),
          api.get(
            `/catalogue/get-catalogues-by-photographer?photographer=${user._id}`,
          ),
          api.get(`/blog/get-my-blogs?author=${user._id}`),
        ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data);
      } else {
        setStats({});
      }
      if (photosRes.status === 'fulfilled') {
        // set photos 10 times more than the original
        const photos = photosRes.value.data.photos;
        const photos10x = [];
        for (let i = 0; i < 10; i++) {
          photos10x.push(...photos);
        }
        setPhotos(photos10x);
        // setPhotos(photosRes.value.data.photos);
      } else {
        setPhotos([]);
      }
      if (cataloguesRes.status === 'fulfilled') {
        setCatalogues(cataloguesRes.value.data.catalogues);
      } else {
        setCatalogues([]);
      }
      if (blogsRes.status === 'fulfilled') {
        setBlogs(blogsRes.value.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error('Unexpected error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // await fetchAllData();
    await useUserStore.getState().fetchUserFromToken();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
  }, [user, fetchAllData]);

  if (loading) {
    return (
      <SafeAreaView style={[style.background, {flex: 1}]}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={100} color="#ed3147" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || profileUploading}
            onRefresh={onRefresh}
            tintColor="#000"
          />
        }>
        <View style={style.profileHeader}>
          <View style={style.coverImageContainer}>
            <Image
              style={style.coverImage}
              source={
                user?.coverImage
                  ? {uri: user?.coverImage}
                  : require('../../assets/images/onboarding.png')
              }
            />
            <View style={style.headerIcons}>
              <Pressable
                onPress={() => {
                  navigation.navigate('Settings');
                }}
                style={style.iconContainer}>
                <Icon name="gear" size={20} />
              </Pressable>
              <Pressable
                onPress={onShare}
                title="Share"
                style={style.iconContainer}>
                <Icon name="share" size={20} />
              </Pressable>
            </View>
          </View>
          <View style={style.profileDiv}>
            <Image
              style={style.profileImage}
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : require('../../assets/images/onboarding.png')
              }
            />
            <Pressable style={style.edit} onPress={() => setSlideUp(true)}>
              <Image
                style={{height: 12, width: 12, tintColor: '#000'}}
                source={require('../../assets/tabIcons/edit.png')}
              />
            </Pressable>
            <SlideUpModal
              visible={slideUp}
              onClose={() => setSlideUp(false)}
              options={slideOptions}
            />
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
            <Text style={style.count}>
              {photos
                ?.filter(photo => photo.imageAnalytics?.views)
                .reduce(
                  (acc, photo) => acc + (photo.imageAnalytics?.views || 0),
                  0,
                )}
            </Text>
          </View>
          <View style={style.summary}>
            <Text style={style.title}>PHOTOS</Text>
            <Text style={style.count}>{stats.totalUploadingImgCount || 0}</Text>
          </View>
          <View style={style.summary}>
            <Text style={style.title}>DOWNLOADS</Text>
            <Text style={style.count}>{stats.downloads || 0}</Text>
          </View>
        </View>
        <View style={style.tabsContainer}>
          <View style={style.tabs}>
            {tabs.map(tab => (
              <Pressable key={tab.key} onPress={() => handleTabPress(tab.key)}>
                <Text
                  style={[
                    style.tabText,
                    activeTab === tab.key && {color: 'white'},
                  ]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <View>
            {activeTab === 'photos' ? (
              <TabPhotos photos={photos} />
            ) : activeTab === 'catalogues' ? (
              <TabCatalogues catalogues={catalogues} />
            ) : (
              <TabBlogs blogs={blogs} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
