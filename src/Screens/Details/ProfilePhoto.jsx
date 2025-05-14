import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfilePhoto = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleCameraLaunch = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      quality: 0.7,
      includeBase64: true,
    });

    if (!result.didCancel && result.assets?.length) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleImageLibraryLaunch = async () => {
    setUploading(true);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      quality: 0.7,
    });

    if (!result.didCancel && result.assets?.length) {
      setImageUri(result.assets[0].uri);
    }
    setUploading(false);
  };

  return (
    <SafeAreaView style={styles.background}>
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
        <Pressable
          style={styles.optionButton}
          onPress={() => {
            // Handle upload action
            ToastAndroid.show(
              'Photo uploaded successfully!',
              ToastAndroid.SHORT,
            );
          }}>
          <Icon name="arrow-right" size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePhoto;
