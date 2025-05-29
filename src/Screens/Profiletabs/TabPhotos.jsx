/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Share,
  Alert,
  FlatList,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {createTabStyles} from './styles';
import SlideUpModal from '@components/SlideupModal';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import api from 'src/utils/apiClient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'src/themes/useTheme';
import {useUserStore} from 'src/store/auth';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from '@components/AutoHeightImage';
import {usePhotosStore} from 'src/store/photos';
import FastImage from 'react-native-fast-image';

const TabPhotos = ({pendingPhotos}) => {
  const [slideUp, setSlideUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    photos,
    // loading: photosLoading,
    // fetchPhotos,
    // pageNumber: photosPageNumber,
    // pageCount: photosPageCount,
    // fetchMorePhotos,
  } = usePhotosStore();

  const data = photos?.map(item => ({
    id: item._id,
    uri: item.imageLinks.thumbnail,
  }));

  const navigation = useNavigation();

  const theme = useTheme();
  const styles = useMemo(() => createTabStyles(theme), [theme]);

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
    } catch (error) {
      console.error('Download failed:', error.response);
      showToast('Download failed');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/images/delete-image?id=${selectedImage._id}`);
      showToast('Image deleted successfully');
      useUserStore.getState().fetchUserFromToken();
    } catch (error) {
      console.log(error);
      showToast('Failed to delete image');
    }
  };

  const onShare = async () => {
    await Share.share({
      message: `Check out this image: https://clickedart.com/images/${selectedImage?.slug}`,
    });
  };

  const imageOptions = [
    {
      label: 'Order Archival Print',
      icon: 'open-in-new',
      onPress: () => {
        navigation.navigate('ImageNavigator', {
          screen: 'ImageScreen',
          params: {
            imageData: JSON.stringify(selectedImage),
            title: selectedImage.title,
          },
        });
      },
    },
    {
      label: 'View and Edit',
      icon: 'edit',
      onPress: () => {
        navigation.navigate('ImageNavigator', {
          screen: 'EditImage',
          params: {
            id: selectedImage._id,
            title: selectedImage.title,
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
    {
      label: 'Delete',
      icon: 'delete',
      onPress: () => {
        Alert.alert(
          'Delete Image',
          'Are you sure you want to delete this image?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => handleDelete(),
            },
          ],
          {cancelable: true},
        );
      },
    },
  ];

  return (
    <View style={styles.ImageContainer}>
      {pendingPhotos?.map((item, index) => (
        <Pressable
          key={index}
          style={styles.imageBorder}
          onPress={() => {
            setSelectedImage(item);
          }}>
          <Image
            style={styles.image}
            source={{uri: item.imageLinks.thumbnail}}
          />
          <View style={styles.status}>
            <View style={styles.overlay} />
            <Icon
              style={styles.pending}
              name="clock-o"
              size={50}
              color="white"
            />
          </View>
        </Pressable>
      ))}
      {photos?.map((item, index) => (
        <Pressable
          key={index}
          style={styles.imageBorder}
          onPress={() => {
            setSelectedImage(item);
          }}>
          <FastImage
            style={styles.image}
            source={{uri: item.imageLinks.thumbnail}}
          />
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
