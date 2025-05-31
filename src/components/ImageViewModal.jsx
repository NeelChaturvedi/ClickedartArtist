import React from 'react';
import {
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const ImageViewModal = ({visible, imageUri, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
  },
  noImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'CircularStd-Regular',
  },
});

export default ImageViewModal;
