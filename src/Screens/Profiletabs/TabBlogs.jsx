/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Image} from 'moti';

const TabBlogs = () => {
  const dummyBlogs = [
    {
      id: 1,
      title: 'Blog Title 1',
      date: '2023-10-01',
      source: require('../../assets/images/onboarding.png'),
    },
    {
      id: 2,
      title: 'Blog Title 2',
      date: '2023-10-02',
      source: require('../../assets/images/onboarding.png'),
    },
    {
      id: 3,
      title: 'Blog Title 3',
      date: '2023-10-03',
      source: require('../../assets/images/onboarding.png'),
    },
    {
      id: 4,
      title: 'Blog Title 4',
      date: '2023-10-04',
      source: require('../../assets/images/onboarding.png'),
    },
    {
      id: 5,
      title: 'Blog Title 5',
      date: '2023-10-05',
      source: require('../../assets/images/onboarding.png'),
    },
  ];

  return (
    <ScrollView>
      {dummyBlogs.map((item, index) => {
        const isLastItem = index === dummyBlogs.length - 1;

        return (
          <View
            key={item.id}
            style={[styles.blogBorder, isLastItem && {borderBottomWidth: 0}]}>
            <View style={styles.blogDetails}>
              <Text style={styles.imageText}>{item.title}</Text>
              <Text style={styles.blogDate}>{item.date}</Text>
            </View>
            <Image
              style={styles.blogImage}
              source={item.source}
              resizeMode="cover"
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default TabBlogs;
