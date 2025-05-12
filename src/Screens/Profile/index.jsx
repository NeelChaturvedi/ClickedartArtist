/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
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

const Profile = () => {
  const {user} = useUserStore();

  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);

  const [activeTab, setActiveTab] = useState('photos');
  const [activeModal, setActiveModal] = useState(false);
  const [stats, setStats] = useState({});
  const [photos, setPhotos] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const options = [
    {icon: 'facebook', platform: 'Facebook'},
    {icon: 'instagram', platform: 'Instagram'},
    {icon: 'linkedin', platform: 'LinkedIn'},
    {icon: 'twitter', platform: 'Twitter'},
    {icon: 'clone', platform: 'Copy Link'},
  ];

  const slideOptions = [
    {
      label: 'Cover Image',
      onPress: () => {
        console.log('Take Photo pressed');
      },
    },
    {
      label: 'Profile Image',
      onPress: () => {
        console.log('Choose from Gallery pressed');
      },
    },
    {
      label: 'Edit Profile',
      onPress: () => {
        console.log('Edit Profile pressed');
      },
    },
  ];

  const handleModalPress = () => {
    setActiveModal(!activeModal);
  };

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [statsRes, photosRes, cataloguesRes, blogsRes] = await Promise.all([
        api.get(
          `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
        ),
        api.get(`/images/get-images-by-photographer?photographer=${user._id}`),
        api.get(
          `/catalogue/get-catalogues-by-photographer?photographer=${user._id}`,
        ),
        api.get(`/blog/get-my-blogs?author=${user._id}`),
      ]);

      setStats(statsRes.data);
      setPhotos(photosRes.data.photos);
      setCatalogues(cataloguesRes.data.catalogues);
      setBlogs(blogsRes.data.blogs);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  }, [fetchAllData]);

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
  }, [user, fetchAllData]);

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
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
              <Pressable onPress={handleModalPress} style={style.iconContainer}>
                <Icon name="share" size={20} />
                <Modal
                  transparent={true}
                  visible={activeModal}
                  animationType="fade">
                  <TouchableWithoutFeedback
                    onPress={() => setActiveModal(false)}>
                    <View style={style.modalContainer}>
                      <Text style={style.modalTitle}>Select Social Media</Text>
                      <View style={style.modalContent}>
                        {options.map((option, index) => (
                          <Pressable style={style.modalOptions} key={index}>
                            <View
                              style={{
                                height: 30,
                                width: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                style={{color: 'white'}}
                                name={option.icon}
                                size={20}
                              />
                            </View>
                            <Text style={style.platformName}>
                              {option.platform}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
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
