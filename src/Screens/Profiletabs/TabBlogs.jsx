/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';

const TabBlogs = ({blogs, pendingBlogs}) => {
  const navigation = useNavigation();

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
        // handleCatalogueDelete();
      },
    },
  ];

  return (
    <>
      <ScrollView style={{paddingHorizontal: 15}}>
        {pendingBlogs?.map((item, index) => {
          return (
            <View style={styles.pendingContainer} key={item._id}>
              <TouchableOpacity
                onPress={() => {
                  setSlideUp(true);
                  setSelectedBlog(item);
                }}
                key={item._id}
                style={[
                  styles.blogBorder,
                  index === blogs.length - 1 &&
                    index === 1 && {borderBottomWidth: 0},
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
            </View>
          );
        })}
        {blogs?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSlideUp(true);
                setSelectedBlog(item);
              }}
              key={item._id}
              style={[
                styles.blogBorder,
                index === blogs.length - 1 &&
                  index === 1 && {borderBottomWidth: 0},
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
        })}
      </ScrollView>
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </>
  );
};

export default TabBlogs;
