import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { styles } from './styles';

const dummyImages = [
  {
    id: '1',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 1',
  },
  {
    id: '2',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 2',
  },
  {
    id: '3',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 3',
  },
];

const TabPhotos = () => {
  return (
    <View style={styles.container}>
      {dummyImages.map(item => (
        <View key={item.id} style={styles.imageBorder}>
          <Image style={styles.image} source={item.source} />
          <View style={styles.imageDetails}>
            <Text style={styles.imageText}>{item.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};



export default TabPhotos;
