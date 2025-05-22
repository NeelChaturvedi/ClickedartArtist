import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import React, {use, useEffect, useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import api from 'src/utils/apiClient';
import {useNavigation, useRoute} from '@react-navigation/native';

const CatalogueScreen = () => {
  const [slideUp, setSlideUp] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
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

  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      onPress: () => {
        navigation.navigate('ImageNavigator', {
          screen: 'ImageScreen',
          params: {
            imageData: JSON.stringify(selectedImage),
          },
        });
      },
    },
    {
      label: 'Remove',
      icon: 'close',
      onPress: () => {
        removeImage(catalogue._id, catalogue.images[0]._id);
      },
    },
  ];

  const {id} = useRoute().params;

  const removeImage = async (catalogueId, imageIdToRemove) => {
    try {
      const response = await api.post(
        `/catalogue/remove-images-from-catalogue`,
        {
          catalogueId: catalogueId,
          imagesToRemove: [imageIdToRemove],
        },
      );
      fetchCatalogue();
    } catch (err) {
      console.log('err', err.response?.data?.message);
    }
  };

  const fetchCatalogue = async () => {
    try {
      const res = await api.get(
        `/catalogue/get-catalogue-by-id?catalogueId=${id}`,
      );
      console.log('res', res.data.catalogue);
      setCatalogue(res.data.catalogue);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    fetchCatalogue();
  }, [id]);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.Heading}>{catalogue.name}</Text>
          <Text style={styles.Description}>{catalogue.description}</Text>
        </View>
        <View style={styles.container}>
          {catalogue.images?.map((item, index) => (
            <Pressable
              key={index}
              style={styles.imageBorder}
              onPress={() => {
                setSlideUp(true);
                setSelectedImage(item);
              }}>
              <Image
                style={styles.image}
                source={{uri: item.imageLinks.thumbnail}}
              />
              <View style={styles.imageDetails}>
                <Text style={styles.imageText}>{item.title}</Text>
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
