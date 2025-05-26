/* eslint-disable no-shadow */

import {
  View,
  Text,
  Pressable,
  Modal,
  ToastAndroid,
  Share,
  Alert,
} from 'react-native';
import {createTabStyles} from './styles';
import React, {useMemo, useState} from 'react';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import {useTheme} from 'src/themes/useTheme';

const TabCatalogues = ({catalogues, photos}) => {
  const navigation = useNavigation();

  const {user} = useUserStore();

  const theme = useTheme();
  const styles = useMemo(() => createTabStyles(theme), [theme]);

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
            photos: JSON.stringify(photos),
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
        Alert.alert(
          'Delete Catalogue',
          'Are you sure you want to delete this catalogue?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => handleCatalogueDelete(),
            },
          ],
          {cancelable: true},
        );
      },
    },
  ];

  const handleCatalogueUpdate = async () => {
    try {
      await api.post('/catalogue/update-catalogue', {
        catalogueId: selectedCatalogue._id,
        photographer: user._id,
        name: selectedCatalogue?.name,
        description: selectedCatalogue?.description,
      });
      useUserStore.getState().fetchUserFromToken();
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
      useUserStore.getState().fetchUserFromToken();
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
            {item?.images
              ?.slice(0, item?.images?.length <= 4 ? 4 : 3)
              .map((image, index) => (
                <Image
                  key={index}
                  style={styles.catalogueImage}
                  source={{uri: image.imageLinks.thumbnail}}
                  resizeMode="cover"
                />
              ))}
            {item?.images?.length > 4 && (
              <View style={styles.catalogueImageExtra}>
                <Text style={styles.catalogueImageText}>
                  +{item?.images?.length - 3}
                </Text>
              </View>
            )}
          </View>
          {!item?.images ||
            (item?.images?.length === 0 && (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>No Images</Text>
              </View>
            ))}
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
