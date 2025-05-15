/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';

const TabBlogs = ({blogs}) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{paddingHorizontal: 15}}>
      {blogs?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BlogNavigator', {
                screen: 'Blogs',
                params: {
                  blogId: item._id,
                },
              })
            }
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
  );
};

export default TabBlogs;
