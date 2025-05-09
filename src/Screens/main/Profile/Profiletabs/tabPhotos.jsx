import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';

const dummyImages = [
  { id: '1', source: require('../../../../assets/images/onboarding.png'), title: 'Image 1' },
  { id: '2', source: require('../../../../assets/images/onboarding.png'), title: 'Image 2' },
  { id: '3', source: require('../../../../assets/images/onboarding.png'), title: 'Image 3' },
];

const TabPhotos = () => {
  const renderItem = ({ item }) => (
    <View style={styles.imageBorder}>
      <Image style={styles.image} source={item.source} />
      <View style={styles.imageDetails}>
        <Text style={styles.imageText}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      numColumns={2}
      data={dummyImages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    rowGap: 10,
    paddingHorizontal: 10,
  },
  imageBorder: {
    padding: 10,
    width: 170,
    height: 190,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    resizeMode: 'cover',
    height: '85%',
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
    color: '#000',
  },
});

export default TabPhotos;
