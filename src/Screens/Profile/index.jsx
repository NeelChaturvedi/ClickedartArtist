/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Share,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
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
import {useTheme} from 'src/themes/useTheme';
import {useMemo} from 'react';
import {createProfileStyles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useAnalyticsStore} from 'src/store/photographerAnalytics';
import ProfileSkeleton from './Loader';
import {usePhotosStore} from 'src/store/photos';
import {usePendingPhotosStore} from 'src/store/pendingPhotos';

const {width} = Dimensions.get('window');
const tabs = [
  {key: 'photos', label: 'Photos', component: <TabPhotos />},
  {key: 'catalogues', label: 'Catalogues', component: <TabCatalogues />},
  {key: 'blogs', label: 'Blogs', component: <TabBlogs />},
];

const Profile = () => {
  const {user, fetchUserFromToken} = useUserStore();
  const {fetchPhotos} = usePhotosStore();
  const {fetchPendingPhotos} = usePendingPhotosStore();
  const theme = useTheme();
  const style = useMemo(() => createProfileStyles(theme), [theme]);
  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const {stats, loading: statsLoading, fetchStats} = useAnalyticsStore();
  const [refreshing, setRefreshing] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [fullBio, setFullBio] = useState(null);

  const scrollViewRef = useRef(null);
  const translateX = useSharedValue(0);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out my profile: https://clickedart.com/photographer/${user.username}`,
      });
    } catch (error) {
      Alert.alert(error.message);
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

  const handleTabPress = (tabKey, index) => {
    setActiveTab(tabKey);
    scrollViewRef.current?.scrollTo({x: index * width, animated: true});
    translateX.value = withSpring(-index * width);
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(offsetX / width);
    setActiveTab(tabs[tabIndex].key);
    translateX.value = -tabIndex * width;
  };

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value / tabs.length}],
    width: width / tabs.length,
    height: 2,
    backgroundColor: theme.text,
    position: 'absolute',
    bottom: 0,
  }));

  const fetchAllData = async () => {
    await fetchStats(user?._id);
    await fetchPhotos(user?._id);
    await fetchPendingPhotos(user?._id);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await useUserStore.getState().fetchUserFromToken();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (statsLoading) {
    return (
      <SafeAreaView style={[style.background, {flex: 1}]}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <ScrollView
        stickyHeaderIndices={[3]}
        stickyHeaderHiddenOnScroll={true}
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
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={style.userBio}>
              {fullBio
                ? fullBio
                : user?.bio?.split(' ').length <= 20
                ? user?.bio
                : user?.bio?.split(' ').slice(0, 20).join(' ') + '...'}
            </Text>
            {user?.bio?.split(' ').length > 20 && (
              <Pressable
                style={{paddingVertical: 16}}
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
            <Text style={style.count}>
              {stats?.totalUploadingImgCount || 0}
            </Text>
          </View>
          <View style={style.summary}>
            <Text style={style.title}>DOWNLOADS</Text>
            <Text style={style.count}>{stats?.downloads || 0}</Text>
          </View>
        </View>
        <View style={style.stickyTabs}>
          <View style={style.tabs}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabPress(tab.key, index)}>
                <Text
                  style={[
                    style.tabText,
                    activeTab === tab.key && {color: theme.text},
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Animated.View style={tabIndicatorStyle} />
        </View>
        <View style={{minHeight: 400}}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={width}
            decelerationRate="fast">
            {tabs.map((tab, index) => (
              <View key={tab.key} style={{width, minHeight: 400}}>
                {tab.component}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
