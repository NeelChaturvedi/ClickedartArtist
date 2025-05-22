import {
  View,
  Text,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import api from 'src/utils/apiClient';

const TabPhotos = ({photos}) => {
  const [slideUp, setSlideUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 30) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download the image',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const downloadImage = async (id, resolution, title) => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        showToast('Storage permission denied');
        return;
      }

      showToast('Preparing download...');

      const response = await api.get(
        `/images/get-image-for-download?id=${id}&resolution=${resolution?.toLowerCase()}`,
      );

      const imageLinks = response.data.photo.imageLinks;
      if (!imageLinks) {
        throw new Error('No image links found');
      }

      const imageUrl = Object.values(imageLinks)[0];
      if (!imageUrl) {
        throw new Error('Image URL not found');
      }

      const formattedTitle = title?.replace(/\s+/g, '_')?.toLowerCase() || id;
      const fileName = `image_${formattedTitle}_${resolution}.jpg`;

      const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const options = {
        fromUrl: imageUrl,
        toFile: downloadDest,
      };

      const {promise} = RNFS.downloadFile(options);
      await promise;

      showToast(`Download at ${downloadDest}`);
      console.log('File saved to:', downloadDest);
    } catch (error) {
      console.error('Download failed:', error.response);
      showToast('Download failed');
    }
  };

  const onShare = async () => {
    await Share.share({
      message: `Check out this image: https://clickedart.com/images/${selectedImage?.slug}`,
    });
  };

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
      label: 'Edit',
      icon: 'edit',
      onPress: () => {
        navigation.navigate('ImageNavigator', {
          screen: 'EditImage',
          params: {
            id: selectedImage._id,
          },
        });
      },
    },
    {
      label: 'Download',
      icon: 'download',
      onPress: () => {
        if (!selectedImage) {
          showToast('No image selected');
          return;
        }
        console.log('Attempting download for image:', selectedImage);
        downloadImage(selectedImage._id, 'original', selectedImage.title);
      },
    },
    {
      label: 'Share',
      icon: 'share',
      onPress: () => {
        onShare();
      },
    },
  ];

  return (
    <View style={styles.container}>
      {photos?.map((item, index) => (
        <Pressable
          key={index}
          style={styles.imageBorder}
          onPress={() => {
            setSelectedImage(item);
            setSlideUp(true);
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
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </View>
  );
};

export default TabPhotos;
