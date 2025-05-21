import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';

const CatalogueScreen = () => {
  const [slideUp, setSlideUp] = useState(false);
  const images = [
    {
      id: 1,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image1',
    },
    {
      id: 2,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image2',
    },
    {
      id: 3,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image3',
    },
    {
      id: 4,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image4',
    },
    {
      id: 5,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image5',
    },
    {
      id: 6,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image6',
    },
    {
      id: 7,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image7',
    },
    {
      id: 8,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image8',
    },
    {
      id: 9,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image9',
    },
    {
      id: 10,
      source: require('../../assets/images/onboarding.png'),
      name: 'Image10',
    },
  ];

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      // onPress: () => {
      //   navigation.navigate('ImageNavigator', {
      //     screen: 'ImageScreen',
      //     params: {
      //       imageData: JSON.stringify(selectedImage),
      //     },
      //   });
      // },
    },
    {
      label: 'Remove',
      icon: 'close',
      // onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.Heading}>Catalogue Title</Text>
          <Text style={styles.Description}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            quidem harum mollitia fuga. Facilis, et veniam? Molestias ipsa saepe
            iusto hic sint! Quisquam sed deleniti iusto consequuntur sit
            consequatur velit vitae aspernatur quasi earum, a ut animi eligendi
            ducimus omnis porro totam perspiciatis tenetur, in ullam. Vitae
            nihil voluptatem fuga?
          </Text>
        </View>
        <View style={styles.container}>
          {images.map((item, index) => (
            <Pressable
              key={index}
              style={styles.imageBorder}
              onPress={() => setSlideUp(true)}>
              <Image style={styles.image} source={item.source} />
              <View style={styles.imageDetails}>
                <Text style={styles.imageText}>{item.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </SafeAreaView>
  );
};

export default CatalogueScreen;
