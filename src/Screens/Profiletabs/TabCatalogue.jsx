/* eslint-disable no-shadow */

import {View, Text} from 'react-native';
import {styles} from './styles';
import React from 'react';
import {Image} from 'moti';

const TabCatalogues = () => {
  const dummyCatalogues = [
    {
      id: 1,
      title: 'Catalogue 1',
      images: [
        {id: 1, source: require('../../assets/images/onboarding.png')},
        {id: 2, source: require('../../assets/images/onboarding.png')},
        {id: 3, source: require('../../assets/images/onboarding.png')},
        {id: 4, source: require('../../assets/images/onboarding.png')},
      ],
    },
    {
      id: 2,
      title: 'Catalogue 2',
      images: [
        {id: 1, source: require('../../assets/images/onboarding.png')},
        {id: 2, source: require('../../assets/images/onboarding.png')},
        {id: 3, source: require('../../assets/images/onboarding.png')},
      ],
    },
    {
      id: 3,
      title: 'Catalogue 3',
      images: [
        {id: 1, source: require('../../assets/images/onboarding.png')},
        {id: 2, source: require('../../assets/images/onboarding.png')},
        {id: 3, source: require('../../assets/images/onboarding.png')},
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {dummyCatalogues.map((item, index) => (
        <View key={index} style={styles.catalogueBorder}>
          <View style={styles.imageDistribution}>
            {item.images.map((image, index) => (
              <Image
                key={index}
                style={styles.catalogueImage}
                source={image.source}
                resizeMode="cover"
              />
            ))}
          </View>
          <Text style={styles.catalougeText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default TabCatalogues;
