/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {uploadImageStyles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from '@components/Accordian';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import {
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  API_URL,
} from '@env';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import axios from 'axios';
import MultiSelectModal from '@components/MultiSelectModal';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'src/themes/useTheme';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  signatureVersion: 'v4',
});

const UploadImage = () => {
  const {user} = useUserStore();
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('text');
  const [step, setStep] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [watermarkUploading, setWatermarkUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [activePlan, setActivePlan] = useState('basic');
  const [customText, setCustomText] = useState('ClickedArt');
  const [watermark, setWatermark] = useState(null);
  const [limit, setLimit] = useState(10);
  const [photosLength, setPhotosLength] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photo, setPhoto] = useState({
    category: '',
    photographer: '',
    imageLinks: {},
    resolutions: {},
    description: '',
    story: '',
    keywords: [],
    location: '',
    photoPrivacy: 'Public',
    watermark: false,
    cameraDetails: {
      camera: '',
      lens: '',
      settings: {
        focalLength: '',
        aperture: '',
        shutterSpeed: '',
        iso: '',
      },
    },
    notForSale: false,
    price: 0,
    title: '',
    isActive: false,
  });
  const [isEnabled, setIsEnabled] = useState(false);

  const theme = useTheme();
  const styles = useMemo(() => uploadImageStyles(theme), [theme]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setPhoto({...photo, notForSale: !isEnabled, price: 0});
  };

  const categoriesList = categories.map(category => ({
    id: category._id,
    name: category.name,
  }));

  const [keywordInput, setKeywordInput] = useState(photo.keywords.join(', '));

  const validate = () => {
    let error = {};
    if (!photo.title) {
      error.title = 'Title is required';
    }
    if (!photo.category) {
      error.category = 'Category is required';
    }
    if (!photo.notForSale && !photo.price) {
      error.price = 'Price is required';
    }
    if (photo.keywords.length < 5) {
      error.keywords = 'At least 5 keywords are required';
    }
    if (photo.price && isNaN(photo.price)) {
      error.price = 'Price must be a number';
    }
    if (photo.price && photo.price < 200) {
      error.price = 'Price must be greater than 200';
    }
    if (photo.price && photo.price > 100000) {
      error.price = 'Price must be less than 100000';
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleWatermarkPicker = async () => {
    try {
      setWatermarkUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      await uploadImageToServer(image.path);
    } catch (error) {
      console.log('Picker error:', error);
    } finally {
      setWatermarkUploading(false);
    }
  };

  const handleWatermarkAdd = async watermarkUrl => {
    try {
      const response = await api.post('/customwatermark/add-custom-watermark', {
        photographer: user?._id,
        watermarkImage: watermarkUrl,
      });
      setWatermark(response.data.watermark);
      setPhoto({...photo, imageLinks: {image: imageUri}});
    } catch (error) {
      console.error('Error adding watermark:', error);
    }
  };

  const handleWatermarkRemove = async id => {
    try {
      await api.delete(`/customwatermark/delete-custom-watermark?id=${id}`);
      console.log('Watermark removed');
      setWatermark('');
      setPhoto({...photo, imageLinks: {image: imageUri}});
    } catch (error) {
      console.error('Error removing watermark:', error);
    }
  };

  const getWatermarks = async () => {
    try {
      const response = await api.get(
        `/customwatermark/get-custom-watermark?photographer=${user?._id}`,
      );
      setWatermark(response.data.watermarkImage);
    } catch (error) {
      console.log('Watermark not found');
    }
  };

  const getResolutions = async () => {
    try {
      setStep(1);
      setProcessing(true);
      if (photo.imageLinks.original) {
        return;
      }
      const response = await api.post(
        '/upload/handle-photos-with-watermark-and-resolutions-options',
        {
          photographer: user?._id,
          imageUrl: imageUri,
          plan: activePlan,
          isCustomText:
            activePlan === 'basic' || (watermark && selectedTab === 'image')
              ? 'false'
              : 'true',
          customText:
            (watermark || activePlan === 'basic') && selectedTab === 'image'
              ? ''
              : customText || 'ClickedArt',
        },
      );
      const data = response.data;
      setPhoto(prevPhoto => ({
        ...prevPhoto,
        imageLinks: data.urls,
        resolutions: data.resolutions,
      }));
    } catch (error) {
      console.error('Error fetching resolutions:', error.response);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpload = async () => {
    if (!validate()) {
      return;
    }
    setErrors({});
    // setLoading(true);
    try {
      const response = await api.post('/images/add-image-in-vault', photo);
      Alert.alert('Success', 'Image uploaded and is under review');
      setImageUri(null);
      navigation.goBack();
    } catch (error) {
      console.log(error.response);
    } finally {
      // setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        includeBase64: false,
      });
      await uploadImageToS3(image.path);
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const PART_SIZE = 5 * 1024 * 1024;
  const MAX_RETRIES = 3;

  const uploadImageToS3 = async imgUri => {
    if (!imgUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }
    setUploadProgress(0);
    setUploading(true);
    try {
      const response = await fetch(imgUri);
      const blob = await response.blob();
      const fileSize = blob.size;
      const fileName = `images/${Date.now()}.jpg`;

      const createUploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        ContentType: 'image/jpeg',
      };
      const {UploadId} = await s3
        .createMultipartUpload(createUploadParams)
        .promise();

      const parts = [];
      let partNumber = 1;
      let start = 0;

      while (start < fileSize) {
        const end = Math.min(start + PART_SIZE, fileSize);
        const partBlob = blob.slice(start, end);
        let retries = 0;

        while (retries < MAX_RETRIES) {
          try {
            const uploadPartParams = {
              Bucket: AWS_BUCKET_NAME,
              Key: fileName,
              PartNumber: partNumber,
              UploadId,
              Body: partBlob,
            };

            const partData = await s3.uploadPart(uploadPartParams).promise();
            parts.push({
              ETag: partData.ETag,
              PartNumber: partNumber,
            });

            const progress = Math.round((end / fileSize) * 100);
            setUploadProgress(progress);
            console.log(`Uploaded part ${partNumber}: ${progress}%`);

            break;
          } catch (error) {
            retries++;
            if (retries >= MAX_RETRIES) {
              throw new Error(
                `Failed to upload part ${partNumber} after ${MAX_RETRIES} attempts: ${error.message}`,
              );
            }
            console.log(`Retrying part ${partNumber}, attempt ${retries + 1}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * retries));
          }
        }

        start += PART_SIZE;
        partNumber++;
      }

      const completeParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        UploadId,
        MultipartUpload: {Parts: parts},
      };
      const data = await s3.completeMultipartUpload(completeParams).promise();
      const fileUrl = data.Location;
      setImageUri(fileUrl);
      setPhoto({...photo, imageLinks: {image: fileUrl}});
    } catch (error) {
      Alert.alert('Error', `Failed to upload image: ${error.message}`);

      if (error.UploadId) {
        await s3
          .abortMultipartUpload({
            Bucket: AWS_BUCKET_NAME,
            Key: `images/${Date.now()}.jpg`,
            UploadId: error.UploadId,
          })
          .promise();
      }
    } finally {
      setUploading(false);
    }
  };

  const uploadImageToServer = async watermarkUri => {
    if (!watermarkUri) {
      console.error('No image Uri');
      return;
    }
    const imgData = new FormData();
    imgData.append('image', {
      uri: watermarkUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    try {
      const res = await axios.post(
        `${API_URL}/api/upload/uploadSingleImage`,
        imgData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const watermarkUrl = res.data;
      await handleWatermarkAdd(watermarkUrl);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const guidelines = [
    'File size should be more than 5MB ',
    'Ensure the resolution is at least 300 DPI for print-quality images.',
    'Minimum dimensions: 2000 x 3000 pixels (or equivalent aspect ratio).',
    'File size should not exceed 150 MB.',
    'Only upload original work; plagiarism or copyright infringement will result in account penalties.',
    'Avoid images with watermarks, logos, or text overlays.',
    'Ensure the photo does not contain offensive, explicit, or illegal content.',
    "Photos must align with ClickedArt's ethical standards, particularly for wildlife, cultural, and sensitive subjects.",
    "Ensure the uploaded photo is relevant to the categories you've selected.",
    'Submit sharp, high-quality images free from excessive noise, blurriness, or pixelation.',
    'Post-process images tastefully; avoid over-saturation, extreme HDR, or unnatural effects.',
    'Composition should follow photography principles, such as the rule of thirds, framing, or leading lines.',
    'Ensure the photo has no distracting elements unless integral to the subject.',
  ];

  useEffect(() => {
    if (activePlan === 'premium') {
      getWatermarks();
    }
  }, [activePlan]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/get?pageSize=1000');
        const data = response.data;
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchActivePlan = async () => {
      if (!user || !user._id) {
        return;
      }
      setPhoto({...photo, photographer: user?._id});
      try {
        const res = await api.get(
          `/subscriptions/get-user-active-subscription?photographer=${user._id}`,
        );
        console.log(
          'Active Plan',
          res.data.subscription?.planId?.name?.toLowerCase(),
        );
        setActivePlan(res.data.subscription?.planId?.name?.toLowerCase());
        if (res.data.subscription?.planId?.name?.toLowerCase() === 'basic') {
          setLimit(10);
        } else if (
          res.data.subscription?.planId?.name?.toLowerCase() === 'intermediate'
        ) {
          setLimit(50);
        } else if (
          res.data.subscription?.planId?.name?.toLowerCase() === 'premium'
        ) {
          setLimit(999999);
        }
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
      }
    };

    const fetchPhotos = async () => {
      try {
        // setLoading(true);
        const res = await api.get(
          `/images/get-images-by-photographer?photographer=${user._id}&pageSize=1000`,
        );
        setPhotosLength(res.data.photos?.length);
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchActivePlan();
    fetchPhotos();
  }, [user]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
          {step === 0 && (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <Pressable style={styles.uploadContainer} onPress={pickImage}>
                  {imageUri && !uploading ? (
                    <Image source={{uri: imageUri}} style={styles.image} />
                  ) : uploading ? (
                    <View>
                      <ActivityIndicator size={50} />
                    </View>
                  ) : (
                    <>
                      <Icon name="upload" size={24} color={theme.text} />
                      <Text style={styles.uploadText}>
                        Upload your image here
                      </Text>
                    </>
                  )}
                </Pressable>
                {uploading && (
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: '#ccc',
                      borderRadius: 5,
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        backgroundColor: '#ED3174',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                )}
                <Accordion title={'Upload Guidelines'} content={guidelines} />
                <View style={styles.tabContainer}>
                  <Pressable
                    onPress={() => {
                      setSelectedTab('text');
                      setPhoto({...photo, imageLinks: {image: imageUri}});
                    }}>
                    <Text
                      style={[
                        styles.tabText,
                        selectedTab === 'text' && {color: theme.text},
                      ]}>
                      Text Watermark
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedTab('image');
                      setPhoto({...photo, imageLinks: {image: imageUri}});
                    }}>
                    <Text
                      style={[
                        styles.tabText,
                        selectedTab === 'image' && {color: theme.text},
                      ]}>
                      Image Watermark
                    </Text>
                  </Pressable>
                </View>
                {selectedTab === 'text' && (
                  <AutoGrowTextInput
                    value={customText}
                    onChangeText={text => setCustomText(text)}
                  />
                )}
                {selectedTab === 'image' && (
                  <View style={styles.watermarkImage}>
                    {watermark ? (
                      <>
                        <Image
                          source={{uri: watermark.watermarkImage}}
                          style={{
                            width: '50%',
                            height: 80,
                          }}
                        />
                        <Pressable
                          style={{
                            width: '50%',
                            height: 80,
                            alignItems: 'center',
                          }}
                          onPress={() => handleWatermarkRemove(watermark?._id)}>
                          <Text style={styles.watermarkRemove}>Remove</Text>
                        </Pressable>
                      </>
                    ) : (
                      <>
                        <TextInput
                          editable={false}
                          style={{width: '80%', color: theme.text}}
                          value={
                            watermarkUploading
                              ? 'Uploading...'
                              : 'Choose a file'
                          }
                        />
                        <Pressable
                          style={styles.uploadBtn}
                          disabled={watermarkUploading}
                          onPress={handleWatermarkPicker}>
                          <Icon name="upload" size={20} color="white" />
                        </Pressable>
                      </>
                    )}
                  </View>
                )}
              </ScrollView>
              <View paddingHorizontal={20} paddingVertical={30}>
                <Button
                  disabled={
                    !imageUri ||
                    uploading ||
                    processing ||
                    watermarkUploading ||
                    photosLength >= limit ||
                    (selectedTab === 'image' && !watermark) ||
                    (selectedTab === 'text' && !customText)
                  }
                  btnText={'Proceed'}
                  onPress={() => getResolutions()}
                />
              </View>
            </>
          )}
          {step === 1 && (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View style={styles.uploadContainer}>
                  {photo.imageLinks?.thumbnail ? (
                    <Image
                      source={{uri: photo.imageLinks?.thumbnail}}
                      style={styles.image}
                    />
                  ) : processing ? (
                    <>
                      <View style={[styles.image, {position: 'relative'}]}>
                        <View
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: [{translateX: -25}, {translateY: -25}],
                            zIndex: 1,
                          }}>
                          <ActivityIndicator size={50} color={'#ed3147'} />
                        </View>
                        <Image
                          source={{uri: imageUri}}
                          style={[styles.image, {opacity: 0.5}]}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Icon name="warning" size={24} color={theme.text} />
                      <Text style={styles.uploadText}>No Image Found</Text>
                    </>
                  )}
                </View>
                <View style={styles.toggleContainer}>
                  <Text style={styles.switchText}>Not For Sale</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#ED3174'}}
                    thumbcolor={theme.text}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Title</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter Image Title'}
                    onChangeText={text => setPhoto({...photo, title: text})}
                    value={photo.title}
                  />
                  {errors.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                </View>
                <View style={styles.twoFields}>
                  {!photo.notForSale && (
                    <View gap={16} style={{width: '48%'}}>
                      <Text style={styles.headingText}>Price</Text>
                      <AutoGrowTextInput
                        placeholder={'Enter Image Price'}
                        onChangeText={text => {
                          setPhoto({...photo, price: text});
                        }}
                        value={photo.price}
                        keyboardType="numeric"
                      />
                    </View>
                  )}
                  <View
                    gap={16}
                    style={{width: photo.notForSale ? '100%' : '48%'}}>
                    <Text style={styles.headingText}>Category</Text>
                    <MultiSelectModal
                      options={categoriesList}
                      value={photo.category}
                      onChange={ids =>
                        setPhoto(prev => ({...prev, category: ids}))
                      }
                      placeholder={'Select Categories'}
                    />
                  </View>
                </View>
                {errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
                <View gap={16}>
                  <Text style={styles.headingText}>Description</Text>
                  <AutoGrowTextInput
                    placeholder={'Maximum 1000 words'}
                    onChangeText={text => {
                      setPhoto({...photo, description: text});
                    }}
                    value={photo.description}
                  />
                  {errors.description && (
                    <Text style={styles.errorText}>{errors.description}</Text>
                  )}
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Keywords</Text>
                  <AutoGrowTextInput
                    placeholder="Enter Keywords"
                    value={keywordInput}
                    onChangeText={text => {
                      setKeywordInput(text);
                      setPhoto({
                        ...photo,
                        keywords: text.split(',').map(item => item.trim()),
                      });
                    }}
                  />
                  {errors.keywords && (
                    <Text style={styles.errorText}>{errors.keywords}</Text>
                  )}
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Story</Text>
                  <AutoGrowTextInput
                    placeholder={'Maximum 1000 words'}
                    onChangeText={text => {
                      setPhoto({...photo, story: text});
                    }}
                    value={photo.story}
                  />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Camera</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter Camera Name'}
                    onChangeText={text => {
                      setPhoto({
                        ...photo,
                        cameraDetails: {...photo.cameraDetails, camera: text},
                      });
                    }}
                    value={photo.cameraDetails.camera}
                  />
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Lens</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter Lens Name'}
                    onChangeText={text => {
                      setPhoto({
                        ...photo,
                        cameraDetails: {...photo.cameraDetails, lens: text},
                      });
                    }}
                    value={photo.cameraDetails.lens}
                  />
                </View>
                <View style={styles.twoFields}>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Focal Length</Text>
                    <AutoGrowTextInput
                      placeholder={'Enter Focal Length'}
                      onChangeText={text => {
                        setPhoto({
                          ...photo,
                          cameraDetails: {
                            ...photo.cameraDetails,
                            settings: {
                              ...photo.cameraDetails.settings,
                              focalLength: text,
                            },
                          },
                        });
                      }}
                      value={photo.cameraDetails.settings.focalLength}
                    />
                  </View>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Aperture</Text>
                    <AutoGrowTextInput
                      placeholder={'Enter Aperture'}
                      onChangeText={text => {
                        setPhoto({
                          ...photo,
                          cameraDetails: {
                            ...photo.cameraDetails,
                            settings: {
                              ...photo.cameraDetails.settings,
                              aperture: text,
                            },
                          },
                        });
                      }}
                      value={photo.cameraDetails.settings.aperture}
                    />
                  </View>
                </View>
                <View style={styles.twoFields}>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>Shutter Speed</Text>
                    <AutoGrowTextInput
                      placeholder={'Enter Shutter Speed'}
                      onChangeText={text => {
                        setPhoto({
                          ...photo,
                          cameraDetails: {
                            ...photo.cameraDetails,
                            settings: {
                              ...photo.cameraDetails.settings,
                              shutterSpeed: text,
                            },
                          },
                        });
                      }}
                      value={photo.cameraDetails.settings.shutterSpeed}
                    />
                  </View>
                  <View gap={16} style={{width: '48%'}}>
                    <Text style={styles.headingText}>ISO</Text>
                    <AutoGrowTextInput
                      placeholder={'Enter ISO'}
                      onChangeText={text => {
                        setPhoto({
                          ...photo,
                          cameraDetails: {
                            ...photo.cameraDetails,
                            settings: {
                              ...photo.cameraDetails.settings,
                              iso: text,
                            },
                          },
                        });
                      }}
                      value={photo.cameraDetails.settings.iso}
                    />
                  </View>
                </View>
                <View gap={16}>
                  <Text style={styles.headingText}>Location</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter Location'}
                    onChangeText={text => {
                      setPhoto({...photo, location: text});
                    }}
                    value={photo.location}
                  />
                </View>
              </ScrollView>
              <View style={styles.buttonsContainer}>
                <View style={{width: '48%'}}>
                  <Button btnText={'Back'} onPress={() => setStep(0)} />
                </View>
                <View style={{width: '48%'}}>
                  <Button btnText={'Upload'} onPress={() => handleUpload()} />
                </View>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadImage;
