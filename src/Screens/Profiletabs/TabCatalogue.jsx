/* eslint-disable no-shadow */

import {View, Text, Pressable, Modal, ToastAndroid} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';

const TabCatalogues = ({catalogues}) => {
  const navigation = useNavigation();

  const {user} = useUserStore();

  const [slideUp, setSlideUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedCatalogue, setSelectedCatalogue] = useState(null);

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
      onPress: () => {
        navigation.navigate('CatalogueNavigator', {
          screen: 'Catalogue Screen',
          params: {
            id: selectedCatalogue._id,
          },
        });
      },
    },
    {
      label: 'Edit',
      icon: 'edit',
      onPress: () => {
        setShowModal(true);
      },
    },
    {
      label: 'Delete',
      icon: 'delete',
      onPress: () => {
        handleCatalogueDelete();
      },
    },
  ];

  const handleCatalogueUpdate = async () => {
    try {
      await api.post(`/catalogue/update-catalogue`, {
        catalogueId: selectedCatalogue._id,
        photographer: user._id,
        name: selectedCatalogue?.name,
        description: selectedCatalogue?.description,
      });
      setShowModal(false);
    } catch (err) {
      console.log('err', err.response.data.message);
    } finally {
    }
  };

  const handleCatalogueDelete = async () => {
    try {
      await api.delete(
        `/catalogue/delete-catalogue?catalogueId=${selectedCatalogue._id}`,
      );
      ToastAndroid.show('Catalogue deleted successfully.', ToastAndroid.SHORT);
      // fetchCatalogues();
    } catch (err) {
      console.log('err', err);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      {catalogues?.map((item, index) => (
        <Pressable
          onPress={() => {
            setSlideUp(true);
            setSelectedCatalogue(item);
          }}
          key={index}
          style={styles.catalogueBorder}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setShowModal(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.title}>Edit Catalogue</Text>
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Catalogue Name</Text>
              <AutoGrowTextInput
                placeholder={'Enter Title'}
                value={selectedCatalogue?.name}
                onChangeText={text =>
                  setSelectedCatalogue({
                    ...selectedCatalogue,
                    name: text,
                  })
                }
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <AutoGrowTextInput
                placeholder={'Enter Description'}
                value={selectedCatalogue?.description}
                onChangeText={text =>
                  setSelectedCatalogue({
                    ...selectedCatalogue,
                    description: text,
                  })
                }
              />
            </View>
            <Button btnText="Save Changes" onPress={handleCatalogueUpdate} />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TabCatalogues;
