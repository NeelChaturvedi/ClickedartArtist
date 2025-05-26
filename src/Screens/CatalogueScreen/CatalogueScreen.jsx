import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import api from 'src/utils/apiClient';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '@components/button';
import {useUserStore} from 'src/store/auth';

const CatalogueScreen = ({setCatalogueId, modalVisible, setModalVisible}) => {
  const {user} = useUserStore();
  const {id} = useRoute().params;
  const {photos} = useRoute().params;
  const photosList = photos ? JSON.parse(photos) : [];

  const [slideUp, setSlideUp] = useState(false);
  const [catalogue, setCatalogue] = useState(false);
  const [selectedImages, setSelectedImages] = React.useState([]);

  const closeModal = () => setModalVisible(false);

  const toggleImageSelection = index => {
    setSelectedImages(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

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

  const handleSubmit = async () => {
    if (selectedImages.length === 0) {
      ToastAndroid.show(
        'Please select at least one image to add.',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (catalogue?.images.some(image => selectedImages.includes(image._id))) {
      ToastAndroid.show(
        'Selected images are already in the catalogue.',
        ToastAndroid.SHORT,
      );
      console.log('Selected images are already in the catalogue');
      return;
    }

    try {
      const response = await api.post(
        '/catalogue/update-catalogue',
        {
          catalogueId: id,
          photographer: user?._id,
          images: selectedImages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      ToastAndroid.show(
        'Images added to catalogue successfully.',
        ToastAndroid.SHORT,
      );
      fetchCatalogue();
    } catch (err) {
      console.log('err', err);
    } finally {
      setSelectedImage([]);
      setSelectedImages([]);
      setSlideUp(false);
      setModalVisible(false);
    }
  };

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
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <Pressable style={styles.modalContent}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <View style={styles.imageStore}>
                {photosList
                  .filter(
                    image => !catalogue.images?.some(i => i._id === image._id),
                  )
                  ?.map((photo, index) => {
                    const isSelected = selectedImages.includes(photo._id);
                    return (
                      <Pressable
                        key={index}
                        style={styles.imageBorder}
                        onPress={() => toggleImageSelection(photo._id)}>
                        <Image
                          style={styles.image}
                          source={{uri: photo.imageLinks.thumbnail}}
                        />
                        {isSelected && (
                          <View style={styles.checkIconContainer}>
                            <FontAwesome name="check" size={14} color="white" />
                          </View>
                        )}
                        <View style={styles.imageDetails}>
                          <Text style={styles.imageText}>{photo.title}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                {photosList.length === 0 ||
                photosList.filter(
                  image => !catalogue.images?.some(i => i._id === image._id),
                ).length === 0 ? (
                  <View style={styles.noImageContainer}>
                    <Text style={styles.noImageText}>No Images to add</Text>
                  </View>
                ) : null}
              </View>
            </ScrollView>
            <Button
              btnText="Add Images"
              disabled={selectedImages?.length === 0}
              onPress={() => handleSubmit()}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default CatalogueScreen;
