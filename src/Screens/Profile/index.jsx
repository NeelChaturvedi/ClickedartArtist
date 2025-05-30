/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  RefreshControl,
  Text,
  View,
  Share,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Image, MotiText} from 'moti';
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
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useAnalyticsStore} from 'src/store/photographerAnalytics';
import ProfileSkeleton from './Loader';
import {usePhotosStore} from 'src/store/photos';
import {usePendingPhotosStore} from 'src/store/pendingPhotos';
import {useCataloguesStore} from 'src/store/catalogues';
import {useBlogsStore} from 'src/store/blogs';
import {usePendingBlogsStore} from 'src/store/pendingBlogs';

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
  const {fetchCatalogues} = useCataloguesStore();
  const {fetchBlogs} = useBlogsStore();
  const {fetchPendingBlogs} = usePendingBlogsStore();
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
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: index * width, animated: true});
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value =
        (event.contentOffset.x / width) * (width / tabs.length);
    },
  });

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    width: width / tabs.length,
    height: 3,
    backgroundColor: '#ED3147',
    position: 'absolute',
    bottom: 0,
  }));

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const tabIndex = Math.round(offsetX / width);
    setActiveTab(tabs[tabIndex].key);
  };

  const fetchAllData = async () => {
    await fetchStats(user?._id);
    await fetchPhotos(user?._id);
    await fetchPendingPhotos(user?._id);
    await fetchCatalogues(user?._id);
    await fetchBlogs(user?._id);
    await fetchPendingBlogs(user?._id);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await useUserStore.getState().fetchUserFromToken();
    translateX.value = 0;
    setActiveTab(tabs[0].key);
    setRefreshing(false);
  }, [translateX]);

  const renderHeader1 = () => (
    <View>
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
                console.log('Settings pressed');
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
          <Text style={style.count}>{stats?.totalUploadingImgCount || 0}</Text>
        </View>
        <View style={style.summary}>
          <Text style={style.title}>DOWNLOADS</Text>
          <Text style={style.count}>{stats?.downloads || 0}</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader2 = () => {
    return (
      <View
        style={[
          style.stickyTabs,
          {
            backgroundColor: theme.background,
            paddingTop: 5,
            marginTop: 0,
            zIndex: 10,
          },
        ]}>
        <View
          style={[
            style.tabs,
            {
              flexDirection: 'row',
              justifyContent: 'space-around',
              minHeight: 48,
            },
          ]}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => handleTabPress(tab.key, index)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
              }}>
              <MotiText
                from={{color: theme.text + '80', fontSize: 16}}
                animate={{
                  color: activeTab === tab.key ? '#ED3147' : theme.text + '80',
                }}
                transition={{
                  type: 'timing',
                  duration: 200,
                }}
                style={[
                  style.tabText,
                  {
                    textAlign: 'center',
                    fontSize: 16,
                  },
                ]}>
                {tab.label}
              </MotiText>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View style={tabIndicatorStyle} />
      </View>
    );
  };

  const renderTabs = () => (
    <Animated.ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      snapToInterval={width}
      decelerationRate={0.9}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onMomentumScrollEnd={handleScroll}>
      {tabs.map(tab => (
        <View key={tab.key} style={{width}}>
          {tab.component}
        </View>
      ))}
    </Animated.ScrollView>
  );

  const flatListData = ['header1', 'header2', 'tabs'];

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    translateX.value = 0;
    setActiveTab(tabs[0].key);
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
      <Animated.FlatList
        data={flatListData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if (item === 'header1') {
            return renderHeader1();
          } else if (item === 'header2') {
            return renderHeader2();
          } else if (item === 'tabs') {
            return renderTabs();
          }
          return null;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || profileUploading}
            onRefresh={onRefresh}
            tintColor="#000"
          />
        }
        stickyHeaderIndices={[1]}
        stickyHeaderHiddenOnScroll={true}
        nestedScrollEnabled={true}
        ListFooterComponent={<View style={{height: 20}} />}
        ListEmptyComponent={
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: theme.text}}>No data available</Text>
          </View>
        }
        onEndReachedThreshold={0.5}
        style={{flex: 1}}
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default Profile;
