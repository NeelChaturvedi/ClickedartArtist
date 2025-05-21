/* eslint-disable no-shadow */

import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';

const TabCatalogues = ({catalogues}) => {
  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      onPress: () => {
        navigation.navigate('CatalogueNavigator', {
          screen: 'Catalogue Screen',
        });
      },
    },
    {
      label: 'Edit',
      icon: 'edit',
      onPress: () => {},
    },
    {
      label: 'Delete',
      icon: 'delete',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      {catalogues?.map((item, index) => (
        <Pressable
          onPress={() => {
            setSlideUp(true);
          }}
          key={index} style={styles.catalogueBorder}>
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
        </Pressable>
      ))}
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </View>
  );
};

export default TabCatalogues;
