import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import { useNavigation } from '@react-navigation/native';

const TabPhotos = ({photos}) => {
  const [slideUp, setSlideUp] = useState(false);

  const navigation = useNavigation();

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      onPress: () => {navigation.navigate('Image Details');},
    },
    {
      label: 'Edit',
      icon: 'edit',
      onPress: () => {},
    },
    {
      label: 'Download',
      icon: 'download',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      {photos?.map((item, index) => (
        <Pressable
          key={index}
          style={styles.imageBorder}
          onPress={() => setSlideUp(true)}>
          <Image
            style={styles.image}
            source={{uri: item.imageLinks.thumbnail}}
          />
          <View style={styles.imageDetails}>
            <Text style={styles.imageText}>{item.title}</Text>
          </View>
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

export default TabPhotos;
