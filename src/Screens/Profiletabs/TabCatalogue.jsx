/* eslint-disable no-shadow */

import {View, Text} from 'react-native';
import {styles} from './styles';
import React from 'react';
import {Image} from 'moti';

const TabCatalogues = ({catalogues}) => {
  return (
    <View style={styles.container}>
      {catalogues?.map((item, index) => (
        <View key={index} style={styles.catalogueBorder}>
          <View style={styles.imageDistribution}>
            {item?.images.map((image, index) => (
              <Image
                key={index}
                style={styles.catalogueImage}
                source={{uri: image.imageLinks.thumbnail}}
                resizeMode="cover"
              />
            ))}
          </View>
          <Text style={styles.catalougeText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default TabCatalogues;
