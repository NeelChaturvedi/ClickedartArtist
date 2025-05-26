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
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import api from '../../utils/apiClient';
import {useRegistrationStore} from '../../store/registration';
import axios from 'axios';
import {API_URL} from '@env';

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
  const [uploading, setUploading] = useState(false);
  const {setField, formData} = useRegistrationStore();
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
      await uploadImageToServer(croppedImage.path);
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
      await uploadImageToServer(croppedImage.path);
    } catch (error) {
      console.log('Picker error:', error);
    } finally {
      setUploading(false);
    }
  };

  const uploadImageToServer = async imageUri => {
    if (!imageUri) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      return;
    }

    setUploading(true);

    const imgData = new FormData();
    imgData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const res = await axios.post(
        `${API_URL}/api/upload/uploadSingleImage`,
        imgData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      const imageUrl = res.data;
      await setField('profileImage', imageUrl);
      ToastAndroid.show('Image uploaded successfully!', ToastAndroid.SHORT);
    } catch (err) {
      console.error('Upload Error', err);
      ToastAndroid.show('Upload failed', ToastAndroid.SHORT);
    } finally {
      setUploading(false);
    }
  };

  const handleRegistration = async () => {
    try {
      setUploading(true);
      const res = await api.post('/photographer/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);
      navigation.navigate('OTP');
    } catch (error) {
      console.error('Upload error:', error.response?.data);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.photoPicker}>
          {formData.profileImage && !uploading ? (
            <Image
              source={{uri: formData.profileImage}}
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
        <Pressable
          style={[
            styles.optionButton,
            formData.profileImage ? '' : styles.disabledButton,
          ]}
          disabled={!formData.profileImage}
          onPress={handleRegistration}>
          <Icon name="arrow-right" size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePhoto;
