/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Pressable,
  Share,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {useUserStore} from '../../store/auth';
import TabPhotos from '../Profiletabs/TabPhotos';
import TabCatalogues from '../Profiletabs/TabCatalogue';
import TabBlogs from '../Profiletabs/TabBlogs';
import {useTheme} from 'src/themes/useTheme';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, MotiView, ScrollView} from 'moti';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../utils/apiClient';
import SlideUpModal from '../../components/SlideupModal';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '@env';
import {useMemo} from 'react';
import {createProfileStyles} from './styles';
import {usePhotosStore} from 'src/store/photos';
import {useAnalyticsStore} from 'src/store/photographerAnalytics';
import {useCataloguesStore} from 'src/store/catalogues';
import {useBlogsStore} from 'src/store/blogs';
import {usePendingPhotosStore} from 'src/store/pendingPhotos';
import {usePendingBlogsStore} from 'src/store/pendingBlogs';
import ProfileSkeleton from './Loader';

const Profile = () => {
  const {user, loading: userLoading, fetchUserFromToken} = useUserStore();
  const {
    loading: photosLoading,
    fetchPhotos,
    pageNumber: photosPageNumber,
    pageCount: photosPageCount,
    fetchMorePhotos,
  } = usePhotosStore();
  const {stats, loading: statsLoading, fetchStats} = useAnalyticsStore();
  const {loading: cataloguesLoading, fetchCatalogues} = useCataloguesStore();
  const {blogs, loading: blogsLoading, fetchBlogs} = useBlogsStore();
  const {
    pendingPhotos,
    loading: pendingPhotosLoading,
    fetchPendingPhotos,
  } = usePendingPhotosStore();
  const {
    pendingBlogs,
    loading: pendingBlogsLoading,
    fetchPendingBlogs,
  } = usePendingBlogsStore();

  const theme = useTheme();
  const style = useMemo(() => createProfileStyles(theme), [theme]);

  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);

  const [activeTab, setActiveTab] = useState('photos');
  const [refreshing, setRefreshing] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [fullBio, setFullBio] = useState(null);

  const onScroll = event => {
    console.log('scrolling');
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    console.log(
      'Scroll Position:',
      layoutMeasurement.height + contentOffset.y,
      'Content Size:',
      contentSize.height,
    );
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      if (!photosLoading && photosPageNumber < photosPageCount) {
        fetchMorePhotos(user._id);
      }
    }
  };

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

  const tabs = [
    {label: 'Photos', key: 'photos'},
    {label: 'Catalogues', key: 'catalogues'},
    {label: 'Blogs', key: 'blogs'},
  ];

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  const fetchAllData = async () => {
    console.log('Fetching all data for user:', user._id);
    await fetchPhotos(user._id);
    await fetchStats(user._id);
    await fetchCatalogues(user._id);
    await fetchBlogs(user._id);
    await fetchPendingPhotos(user._id);
    await fetchPendingBlogs(user._id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await useUserStore.getState().fetchUserFromToken();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (userLoading || refreshing) {
    return (
      <SafeAreaView style={[style.background, {flex: 1}]}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <MotiView
      pointerEvents="box-none"
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{type: 'timing', duration: 300}}
      style={[{paddingBottom: 30}, style.background]}>
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
                navigation.navigate('SettingsNavigator');
              }}
              style={style.iconContainer}>
              <Icon name="gear" size={20} color={theme.text} />
            </Pressable>
            <Pressable
              onPress={onShare}
              title="Share"
              style={style.iconContainer}>
              <Icon name="share" size={20} color={theme.text} />
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
              style={{height: 12, width: 12, tintColor: theme.background}}
              source={require('../../assets/tabIcons/edit.png')}
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
          {user.firstName || ''} {user.lastName || ''}
        </Text>
        <Text style={style.userAddress}>
          {user?.shippingAddress.city}, {user?.shippingAddress.country}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Text style={style.userBio}>
            {fullBio
              ? fullBio
              : user?.bio?.split(' ').length <= 20
              ? user?.bio
              : user?.bio?.split(' ').slice(0, 20).join(' ') + '...'}
          </Text>
          {user?.bio?.split(' ').length > 20 && (
            <Pressable
              style={{
                alignItems: 'center',
                width: '90%',
                paddingVertical: 16,
                marginTop: -20,
              }}
              onPress={() => {
                if (fullBio) {
                  setFullBio(null);
                } else {
                  setFullBio(user?.bio);
                }
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
    </MotiView>
  );

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <Tabs.Container
        renderHeader={renderHeader}
        headerHeight={300}
        allowHeaderOverscroll={true}
        scrollEnabledHeader={true}
        containerStyle={[style.tabsContainer, style.background]}
        onTabChange={({tabName}) => setActiveTab(tabName.toLowerCase())}
        headerContainerStyle={{backgroundColor: theme.background}}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            labelStyle={{color: theme.text}}
            indicatorStyle={{backgroundColor: '#ED3147'}}
            activeColor={'#ED3147'}
            inactiveColor={theme.text}
            style={{backgroundColor: theme.background}}
          />
        )}>
        <Tabs.Tab name="Photos">
          <Tabs.ScrollView
            onScroll={onScroll}
            scrollEnabled={true}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing || profileUploading}
                onRefresh={onRefresh}
                tintColor="#000"
              />
            }>  
            <TabPhotos />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Catalogues">
          <Tabs.ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing || profileUploading}
                onRefresh={onRefresh}
                tintColor="#000"
              />
            }>
            <TabCatalogues />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Blogs">
          <Tabs.ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing || profileUploading}
                onRefresh={onRefresh}
                tintColor="#000"
              />
            }>
            <TabBlogs blogs={blogs} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

export default Profile;
