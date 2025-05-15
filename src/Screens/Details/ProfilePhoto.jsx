import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import BackButton from '../../components/Backbutton';
import api from '../../utils/apiClient';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

const ProfilePhoto = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  const handleCameraLaunch = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      ToastAndroid.show('Camera permission denied', ToastAndroid.SHORT);
      return;
    }

    try {
      setUploading(true);
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: false,
      });
      let croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        cropperCircleOverlay: true,
        path: image.path,
        width: 1000,
        height: 1000,
      });
      setImageUri(croppedImage.path);
    } catch (error) {
      console.log('Camera error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageLibraryLaunch = async () => {
    try {
      setUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      let croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        cropperCircleOverlay: true,
        path: image.path,
        width: 1000,
        height: 1000,
      });
      setImageUri(croppedImage.path);
    } catch (error) {
      console.log('Picker error:', error);
    } finally {
      setUploading(false);
    }
  };

  const uploadImageToServer = async () => {
    if (!imageUri) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const res = await api.post('/upload/uploadSingleImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = res.data;
      console.log('Image URL:', imageUrl);
      ToastAndroid.show('Image uploaded successfully!', ToastAndroid.SHORT);
      navigation.navigate('OTP');
    } catch (err) {
      console.error(err);
      ToastAndroid.show('Upload failed', ToastAndroid.SHORT);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Upload Photo</Text>
        <View style={styles.photoPicker}>
          {imageUri && !uploading ? (
            <Image
              source={{uri: imageUri}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              {uploading ? (
                <ActivityIndicator size={50} />
              ) : (
                <Icon name={'camera'} size={50} color="#ccc" />
              )}
              <Text style={styles.placeholderText}>
                {uploading ? 'Uploading' : 'No Image Selected'}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.uploadOptions}>
        <Pressable
          style={styles.optionButton}
          onPress={handleImageLibraryLaunch}>
          <Icon name="image" size={28} />
        </Pressable>
        <Pressable style={styles.centerButton} onPress={handleCameraLaunch}>
          <Icon name="camera" size={36} />
        </Pressable>
        <Pressable style={styles.optionButton} onPress={uploadImageToServer}>
          <Icon name="arrow-right" size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePhoto;
