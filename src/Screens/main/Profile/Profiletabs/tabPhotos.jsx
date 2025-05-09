import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const dummyImages = [
  {
    id: '1',
    source: require('../../../../assets/images/onboarding.png'),
    title: 'Image 1',
  },
  {
    id: '2',
    source: require('../../../../assets/images/onboarding.png'),
    title: 'Image 2',
  },
  {
    id: '3',
    source: require('../../../../assets/images/onboarding.png'),
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 10,
    paddingBottom: 90,
  },
  imageBorder: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '47%',
    height: 190,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  image: {
    resizeMode: 'cover',
    height: '80%',
    width: '100%',
  },
  imageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    fontFamily: 'Outfit-bold',
    color: '#fff',
  },
});

export default TabPhotos;
