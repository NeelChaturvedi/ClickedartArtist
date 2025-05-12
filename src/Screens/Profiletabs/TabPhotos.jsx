import {View, Text, Image} from 'react-native';
import React from 'react';
import { styles } from './styles';

const TabPhotos = ({photos}) => {
  return (
    <View style={styles.container}>
      {photos?.map(item => (
        <View key={item._id} style={styles.imageBorder}>
          <Image style={styles.image} source={{uri: item.imageLinks.thumbnail}} />
          <View style={styles.imageDetails}>
            <Text style={styles.imageText}>{item.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};



export default TabPhotos;
