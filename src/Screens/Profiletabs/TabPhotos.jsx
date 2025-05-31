/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Share,
  Alert,
  FlatList,
  Dimensions,
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
import {usePhotosStore} from 'src/store/photos';
import FastImage from 'react-native-fast-image';
import {usePendingPhotosStore} from 'src/store/pendingPhotos';
import {Tabs} from 'react-native-collapsible-tab-view';

const TabPhotos = () => {
  const [slideUp, setSlideUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {user} = useUserStore();
  const {photos, loading, pageNumber, pageCount, fetchMorePhotos} =
    usePhotosStore();
  const {pendingPhotos} = usePendingPhotosStore();
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => createTabStyles(theme), [theme]);
  const screenHeight = Dimensions.get('window').height;

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

  const showToast = msg => ToastAndroid.show(msg, ToastAndroid.SHORT);

  const downloadImage = async (id, resolution, title) => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        return showToast('Storage permission denied');
      }

      showToast('Preparing download...');

      const response = await api.get(
        `/images/get-image-for-download?id=${id}&resolution=${resolution?.toLowerCase()}`,
      );

      const imageLinks = response.data.photo.imageLinks;
      const imageUrl = Object.values(imageLinks)[0];
      const formattedTitle = title?.replace(/\s+/g, '_')?.toLowerCase() || id;
      const fileName = `image_${formattedTitle}_${resolution}.jpg`;
      const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      await RNFS.downloadFile({fromUrl: imageUrl, toFile: downloadDest})
        .promise;

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
      onPress: () =>
        selectedImage &&
        downloadImage(selectedImage._id, 'original', selectedImage.title),
    },
    {
      label: 'Share',
      icon: 'share',
      onPress: onShare,
    },
    {
      label: 'Delete',
      icon: 'delete',
      onPress: () =>
        Alert.alert(
          'Delete Image',
          'Are you sure you want to delete this image?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Delete', style: 'destructive', onPress: handleDelete},
          ],
        ),
    },
  ];

  const combinedData = [
    ...pendingPhotos.map(p => ({...p, type: 'pending'})),
    ...photos.map(p => ({...p, type: 'photo'})),
  ];

  const renderItem = ({item}) => {
    const isPending = item.type === 'pending';
    return (
      <Pressable
        style={styles.imageBorder}
        onPress={() => {
          setSelectedImage(item);
          if (!isPending) {
            setSlideUp(true);
          }
        }}>
        {isPending ? (
          <>
            <FastImage
              style={styles.image}
              source={{uri: item.imageLinks.thumbnail}}
            />
            <View style={styles.status}>
              <View style={styles.overlay} />
              <Icon
                name="clock-o"
                size={50}
                color="white"
                style={styles.pending}
              />
            </View>
          </>
        ) : (
          <FastImage
            style={styles.image}
            source={{uri: item.imageLinks.thumbnail}}
          />
          // <View style={[styles.image, {backgroundColor: 'red'}]} />
        )}
      </Pressable>
    );
  };

  return (
    <>
      <Tabs.FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          console.log('End reached');
          if (pageNumber < pageCount) {
            fetchMorePhotos(user?.id);
          }
        }}
        data={combinedData}
        keyExtractor={(item, index) => item._id || index.toString()}
        numColumns={3}
        renderItem={renderItem}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: theme.background,
          minHeight: screenHeight - 160,
          marginBottom: 40,
        }}
        contentContainerStyle={{flexGrow: 1}}
      />
      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </>
  );
};

export default TabPhotos;
