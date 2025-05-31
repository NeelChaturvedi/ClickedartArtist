/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import TabCatalogues from '../Profiletabs/TabCatalogue';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabPhotos from '../Profiletabs/TabPhotos';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useUserStore} from '../../store/auth';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'src/themes/useTheme';
import {useMemo} from 'react';
import {createProfileStyles} from './styles';
import {useAnalyticsStore} from 'src/store/photographerAnalytics';
import {usePhotosStore} from 'src/store/photos';
import {usePendingPhotosStore} from 'src/store/pendingPhotos';
import {useCataloguesStore} from 'src/store/catalogues';
import {useBlogsStore} from 'src/store/blogs';
import {usePendingBlogsStore} from 'src/store/pendingBlogs';
import ProfileSkeleton from './Loader';
import TabBlogs from '../Profiletabs/TabBlogs';
import ProfileHeader from '@components/ProfileHeader';
import Photos from '../../assets/svgs/Photos.svg';
import Catalogues from '../../assets/svgs/Catalogues.svg';
import Blogs from '../../assets/svgs/Blogs.svg';

const Profile = () => {
  const {user, fetchUserFromToken} = useUserStore();
  const {fetchPhotos} = usePhotosStore();
  const {stats, loading: statsLoading, fetchStats} = useAnalyticsStore();
  const {fetchPendingPhotos} = usePendingPhotosStore();
  const {fetchCatalogues} = useCataloguesStore();
  const {fetchBlogs} = useBlogsStore();
  const {fetchPendingBlogs} = usePendingBlogsStore();
  const theme = useTheme();
  const style = useMemo(() => createProfileStyles(theme), [theme]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchStats(user?._id),
        fetchPhotos(user?._id),
        fetchPendingPhotos(user?._id),
        fetchCatalogues(user?._id),
        fetchBlogs(user?._id),
        fetchPendingBlogs(user?._id),
      ]);
    } catch (error) {
      console.error('Fetch All Data Error:', error);
      ToastAndroid.show('Failed to fetch data', ToastAndroid.SHORT);
    }
  };

  const CustomTabBar = props => {
    return (
      <MaterialTabBar
        {...props}
        style={{
          backgroundColor: theme.background,
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        }}
        TabItemComponent={({name, index, isActive}) => {
          const color = isActive ? '#ED3147' : theme.text;

          const IconComponent = (() => {
            switch (name) {
              case 'Photos':
                return <Photos width={24} height={24} color={color} />;
              case 'Catalogues':
                return <Catalogues width={24} height={24} color={color} />;
              case 'Blogs':
                return <Blogs width={24} height={24} color={color} />;
              default:
                return null;
            }
          })();

          return (
            <TouchableOpacity
              onPress={() => props.onTabPress(name)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
              }}>
              {IconComponent}
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchUserFromToken();
      await fetchAllData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchUserFromToken]);

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
  }, [user?._id]);

  if (statsLoading) {
    return (
      <SafeAreaView style={[style.background, {flex: 1}]}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <Tabs.Container
        allowHeaderOverscroll={true}
        scrollEnabledHeader={true}
        snap={true}
        renderHeader={() => <ProfileHeader />}
        renderTabBar={props => <CustomTabBar {...props} />}
        lazy>
        <Tabs.Tab name="Photos">
          <TabPhotos />
        </Tabs.Tab>
        <Tabs.Tab name="Catalogues">
          <TabCatalogues />
        </Tabs.Tab>
        <Tabs.Tab name="Blogs">
          <TabBlogs />
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

export default Profile;
