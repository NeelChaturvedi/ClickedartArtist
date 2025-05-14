/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Image} from 'moti';
import { useNavigation } from '@react-navigation/native';

const TabBlogs = ({blogs}) => {

  const navigation = useNavigation();
  return (
    <ScrollView>
      {blogs?.map((item, index) => {
        const isLastItem = index === blogs.length - 1;

        return (
          <TouchableOpacity onPress={() => navigation.navigate('BlogNavigator', {blogId: item._id})}
            key={item._id}
            style={[styles.blogBorder, isLastItem && {borderBottomWidth: 0}]}>
            <View style={styles.blogDetails}>
              <Text style={styles.imageText}>{item.content.title}</Text>
              <Text style={styles.blogDate}>
                {item.createdAt && new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <Image
              style={styles.blogImage}
              source={{uri: item.coverImage[0]}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default TabBlogs;
