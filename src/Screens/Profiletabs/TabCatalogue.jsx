/* eslint-disable no-shadow */

import {View, Text, Pressable, Modal} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import {Image} from 'moti';
import {useNavigation} from '@react-navigation/native';
import SlideUpModal from '@components/SlideupModal';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';

const TabCatalogues = ({catalogues}) => {
  const navigation = useNavigation();

  const [slideUp, setSlideUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      onPress: () => {setShowModal(true);},
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
              <AutoGrowTextInput placeholder={'Enter Title'} />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <AutoGrowTextInput placeholder={'Enter Description'} />
            </View>
            <Button btnText="Save Changes" />
          </Pressable>
        </Pressable>
      </Modal>
    </View>

  );
};

export default TabCatalogues;
