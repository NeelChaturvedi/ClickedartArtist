/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import TabCatalogues from '../Profiletabs/TabCatalogue';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabPhotos from '../Profiletabs/TabPhotos';
import {ToastAndroid} from 'react-native';
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

const Profile = () => {
  const photosScrollRef = useRef(null);
  const {user, fetchUserFromToken} = useUserStore();
  const {
    fetchPhotos,
    fetchMorePhotos,
    photos,
    loading: photosLoading,
    pageNumber: photosPageNumber,
    pageCount: photosPageCount,
  } = usePhotosStore();

  const {fetchPendingPhotos} = usePendingPhotosStore();
  const {fetchCatalogues} = useCataloguesStore();
  const {fetchBlogs} = useBlogsStore();
  const {fetchPendingBlogs} = usePendingBlogsStore();
  const theme = useTheme();
  const style = useMemo(() => createProfileStyles(theme), [theme]);
  const {stats, loading: statsLoading, fetchStats} = useAnalyticsStore();
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllData = async () => {
    try {
      await Promise.all([
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchUserFromToken();
      await fetchAllData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchUserFromToken]);

  const handlePhotosScroll = useCallback(
    event => {
      const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
      console.log('Scroll Event:', contentOffset, contentSize, layoutMeasurement);
      const paddingToBottom = 20;
      const isCloseToBottom =
        contentOffset.y + layoutMeasurement.height >=
        contentSize.height - paddingToBottom;

      if (
        isCloseToBottom &&
        !photosLoading &&
        photosPageNumber < photosPageCount &&
        user?._id
      ) {
        fetchMorePhotos(user._id);
      }
    },
    [
      photosLoading,
      photosPageNumber,
      photosPageCount,
      user?._id,
      fetchMorePhotos,
    ],
  );

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    fetchAllData();
  }, [user?._id]);

  return (
    <SafeAreaView style={[style.background, {flex: 1}]}>
      <Tabs.Container
        allowHeaderOverscroll={true}
        scrollEnabledHeader={true}
        snap={true}
        renderHeader={() => <ProfileHeader />}
        lazy>
        <Tabs.Tab name="Photos">
          <Tabs.ScrollView
            onScroll={handlePhotosScroll}
            scrollEventThrottle={16}
            ref={photosScrollRef}
            showsVerticalScrollIndicator={false}>
            <TabPhotos />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Catalogues">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <TabCatalogues />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Blogs">
          <Tabs.ScrollView showsVerticalScrollIndicator={false}>
            <TabBlogs />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

export default Profile;
