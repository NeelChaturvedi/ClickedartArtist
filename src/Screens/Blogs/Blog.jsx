/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';
import BackButton from '../../components/Backbutton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Blog = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
        <View style={styles.options}>
          <Pressable>
            <Icon name="pen" size={24} color={'white'} />
          </Pressable>
          <Pressable>
            <Icon name="pen" size={24} color={'white'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{gap: 30}}>

          <View style={styles.aboutBlog}>
            <View gap={10}>
              <Text style={styles.headingText}>
                Crafting the Art of Wildlife Photography
              </Text>
              <Text style={styles.dateText}>May 21, 2021</Text>
            </View>
            <View style={styles.aboutOwner}>
              <Image
                style={styles.blogOwner}
                source={require('../../assets/images/membershipHeader.png')}
              />
              <View style={styles.ownerDetails}>
                <Text style={styles.nameText}>John Doe</Text>
                <Text style={styles.typeText}>Professional</Text>
              </View>
            </View>
          </View>

          <View style={styles.contentArea}>
            <Text style={styles.summary}>
              Every shot is a lesson, every moment a masterpiece.
            </Text>
            <Image
              style={styles.coverImage}
              source={require('../../assets/images/membershipHeader.png')}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Blog;
