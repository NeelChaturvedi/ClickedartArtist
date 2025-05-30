/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';
import api from 'src/utils/apiClient';
import {useTheme} from 'src/themes/useTheme';
import {useBlogsStore} from 'src/store/blogs';
import {usePendingBlogsStore} from 'src/store/pendingBlogs';
import {useUserStore} from 'src/store/auth';
import {createTabStyles} from './styles';

const TabBlogs = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => createTabStyles(theme), [theme]);
  const {user} = useUserStore();
  const {pendingBlogs, fetchPendingBlogs} = usePendingBlogsStore();
  const {blogs, fetchBlogs} = useBlogsStore();

  const [slideUp, setSlideUp] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      onPress: () => {
        navigation.navigate('BlogNavigator', {
          screen: 'Blogs',
          params: {
            blogId: selectedBlog._id,
          },
        });
      },
    },
    {
      label: 'Delete',
      icon: 'delete',
      onPress: () => {
        handleDelete();
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/blog/delete-blog?blogId=${selectedBlog._id}`);
      ToastAndroid.show('Blog deleted successfully', ToastAndroid.SHORT);
      fetchBlogs(user?._id);
      fetchPendingBlogs(user?._id);
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setSlideUp(false);
    }
  };

  const data = useMemo(
    () => [
      ...pendingBlogs.map(item => ({...item, type: 'pending'})),
      ...blogs.map(item => ({...item, type: 'published'})),
    ],
    [pendingBlogs, blogs],
  );

  useEffect(() => {
    if (user?._id) {
      fetchBlogs(user._id);
      fetchPendingBlogs(user._id);
    }
  }, [fetchBlogs, fetchPendingBlogs, user?._id]);

  const renderItem = ({item, index}) => {
    const isLastPending =
      item.type === 'pending' && index === pendingBlogs.length - 1;
    const isLastPublished =
      item.type === 'published' && index === data.length - 1;
    const isSingleRow = data.length === 1;

    const blogContent = (
      <TouchableOpacity
        onPress={() => {
          setSelectedBlog(item);
          if (item.type === 'published') {
            setSlideUp(true);
          }
        }}
        style={[
          styles.blogBorder,
          (isLastPending || isLastPublished) &&
            isSingleRow && {borderBottomWidth: 0},
        ]}>
        <View style={styles.blogDetails}>
          <Text style={styles.imageText}>
            {item.content.title.slice(0, 50).trim()}{' '}
            {item.content.title.length > 50 ? '...' : ''}
          </Text>
          <Text style={styles.blogDate}>
            {item.createdAt &&
              new Date(item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.blogImage}
            source={{uri: item.coverImage[0]}}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );

    return item.type === 'pending' ? (
      <View style={[styles.pendingContainer, {paddingHorizontal: 15}]}>
        {blogContent}
      </View>
    ) : (
      <View style={{paddingHorizontal: 15}}>{blogContent}</View>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.type}-${item._id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        nestedScrollEnabled={false}
        directionalLockEnabled={true}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text style={{color: theme.text}}>No blogs available</Text>
          </View>
        }
      />
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </>
  );
};

export default TabBlogs;
