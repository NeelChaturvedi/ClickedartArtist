import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import { ScrollView } from 'moti';

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
  {
    id: '4',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 4',
  },
  {
    id: '5',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 5',
  },
  {
    id: '6',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 6',
  },
  {
    id: '7',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 7',
  },
  {
    id: '8',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 8',
  },
  {
    id: '9',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 9',
  },
  {
    id: '10',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 10',
  },
  {
    id: '11',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 11',
  },
  {
    id: '12',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 12',
  },
  {
    id: '13',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 13',
  },
  {
    id: '14',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 14',
  },
  {
    id: '15',
    source: require('../../assets/images/onboarding.png'),
    title: 'Image 15',
  },
];

const Approved = () => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default Approved;
