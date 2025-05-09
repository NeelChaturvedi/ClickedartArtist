import {View, StyleSheet} from 'react-native';
import { styles } from './styles';
import React from 'react';

const TabCatalogues = () => {
  const dummyCatalogues = [
    {
      id: 1,
      title: 'Catalogue 1',
      images: [
        {id: '1', source: require('../../assets/images/onboarding.png')},
        {id: '2', source: require('../../assets/images/onboarding.png')},
        {id: '3', source: require('../../assets/images/onboarding.png')},
      ],
    },
    {
      id: 2,
      title: 'Catalogue 2',
      images: [
        {id: '1', source: require('../../assets/images/onboarding.png')},
        {id: '2', source: require('../../assets/images/onboarding.png')},
        {id: '3', source: require('../../assets/images/onboarding.png')},
      ],
    },
    {
      id: 3,
      title: 'Catalogue 3',
      images: [
        {id: '1', source: require('../../assets/images/onboarding.png')},
        {id: '2', source: require('../../assets/images/onboarding.png')},
        {id: '3', source: require('../../assets/images/onboarding.png')},
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {dummyCatalogues.map((item, index) => (
        <View key={index} style={styles.catalogueBorder}></View>
      ))}
    </View>
  );
};

export default TabCatalogues;
