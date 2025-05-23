import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import api from 'src/utils/apiClient';
import {useNavigation, useRoute} from '@react-navigation/native';

const CatalogueScreen = ({setCatalogueId}) => {
  const [slideUp, setSlideUp] = useState(false);
  const [catalogue, setCatalogue] = useState(false);

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
      await api.post('/catalogue/remove-images-from-catalogue', {
        catalogueId: catalogueId,
        imagesToRemove: [imageIdToRemove],
      });
      fetchCatalogue();
    } catch (err) {
      console.log('err', err.response?.data?.message);
    }
  };

  const fetchCatalogue = React.useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchCatalogue();
  }, [fetchCatalogue]);

  useEffect(() => {
    if (catalogue) {
      setCatalogueId(catalogue._id);
    }
  }, [catalogue, setCatalogueId]);

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
