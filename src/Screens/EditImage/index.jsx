/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {editImageStyles, editProfileStyles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import MultiSelectModal from '@components/MultiSelectModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from 'src/themes/useTheme';

const EditImage = () => {
  const {user} = useUserStore();
  const {id} = useRoute().params;
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [activePlan, setActivePlan] = useState('basic');
  const [limit, setLimit] = useState(10);
  const [photo, setPhoto] = useState(null);
  const [updatedPhoto, setUpdatedPhoto] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const theme = useTheme();
  const styles = useMemo(() => editImageStyles(theme), [theme]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setPhoto({...photo, notForSale: !isEnabled, price: 0});
  };

  const categoriesList = categories.map(category => ({
    id: category._id,
    name: category.name,
  }));

  const [keywordInput, setKeywordInput] = useState(
    updatedPhoto?.keywords?.join(', '),
  );

  const validate = () => {
    let error = {};
    if (!updatedPhoto.title) {
      error.title = 'Title is required';
    }
    if (!updatedPhoto.category) {
      error.category = 'Category is required';
    }
    if (!updatedPhoto.notForSale && !updatedPhoto.price) {
      error.price = 'Price is required';
    }
    if (updatedPhoto.keywords.length < 5) {
      error.keywords = 'At least 5 keywords are required';
    }
    if (updatedPhoto.price && isNaN(updatedPhoto.price)) {
      error.price = 'Price must be a number';
    }
    if (updatedPhoto.price && updatedPhoto.price < 200) {
      error.price = 'Price must be greater than 200';
    }
    if (updatedPhoto.price && updatedPhoto.price > 100000) {
      error.price = 'Price must be less than 100000';
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      return;
    }
    setErrors({});
    try {
      await api.post('/images/update-image-in-vault', updatedPhoto);
      ToastAndroid.show('Image updated successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/category/get');
        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPhoto = async () => {
      try {
        const res = await api.get(`/images/get-image-by-id?id=${id}`);
        setPhoto(res.data.photo);
      } catch (error) {
        console.log(error.response);
      } finally {
      }
    };

    const fetchActivePlan = async () => {
      if (!user || !user._id) {
        console.log('Photographer data is missing');
        return;
      }
      try {
        const res = await api.get(
          `/subscriptions/get-user-active-subscription?photographer=${user._id}`,
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

    fetchCategories();
    fetchPhoto();
    fetchActivePlan();
  }, [user]);

  useEffect(() => {
    if (photo) {
      setUpdatedPhoto(prev => ({
        ...prev,
        id: photo._id,
        title: photo.title,
        price: photo.notForSale ? 0 : Number(photo.price?.original) || 0,
        category: photo.category.map(category => category._id),
        description: photo.description,
        keywords: photo.keywords,
        story: photo.story,
        cameraDetails: photo.cameraDetails,
        location: photo.location,
        notForSale: photo.notForSale,
        imageLinks: photo.imageLinks,
        photographer: photo.photographer._id,
      }));
      if (photo?.notForSale) {
        setIsEnabled(true);
      }
    }
  }, [photo]);

  useEffect(() => {
    if (updatedPhoto?.imageLinks?.thumbnail) {
      Image.getSize(updatedPhoto.imageLinks.thumbnail, (width, height) => {
        const aspectRatio = width / height;
        setUpdatedPhoto(prev => ({
          ...prev,
          aspectRatio,
        }));
      });
    }
  }, [updatedPhoto?.imageLinks?.thumbnail]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <View style={styles.uploadContainer}>
              {updatedPhoto?.imageLinks?.thumbnail ? (
                <Image
                  source={{uri: updatedPhoto?.imageLinks?.thumbnail}}
                  style={[
                    styles.image,
                    {aspectRatio: updatedPhoto?.aspectRatio || 1},
                  ]}
                />
              ) : processing ? (
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
              ) : (
                <>
                  <Icon name="warning" size={24} color="white" />
                  <Text style={styles.uploadText}>No Image Found</Text>
                </>
              )}
            </View>
            <View style={styles.toggleContainer}>
              <Text style={styles.switchText}>Not For Sale</Text>
              <Switch
                trackColor={{false: '#767577', true: '#ED3174'}}
                thumbColor="white"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View gap={16}>
              <Text style={styles.headingText}>Title</Text>
              <AutoGrowTextInput
                placeholder={'Enter Image Title'}
                onChangeText={text =>
                  setUpdatedPhoto({...updatedPhoto, title: text})
                }
                value={updatedPhoto?.title}
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>
            <View style={styles.twoFields}>
              {!updatedPhoto?.notForSale && (
                <View gap={16} style={{width: '48%'}}>
                  <Text style={styles.headingText}>Price</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter Image Price'}
                    onChangeText={text => {
                      setUpdatedPhoto({...updatedPhoto, price: Number(text)});
                    }}
                    value={String(updatedPhoto?.price || 0)}
                    keyboardType="numeric"
                  />
                </View>
              )}
              <View
                gap={16}
                style={{width: updatedPhoto?.notForSale ? '100%' : '48%'}}>
                <Text style={styles.headingText}>Category</Text>
                <MultiSelectModal
                  options={categoriesList}
                  value={updatedPhoto?.category}
                  onChange={ids =>
                    setUpdatedPhoto(prev => ({...prev, category: ids}))
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
                  setUpdatedPhoto({...updatedPhoto, description: text});
                }}
                value={updatedPhoto?.description}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>
            <View gap={16}>
              <Text style={styles.headingText}>Keywords</Text>
              <AutoGrowTextInput
                placeholder="Enter Keywords"
                value={keywordInput || updatedPhoto?.keywords?.join(', ')}
                onChangeText={text => {
                  setKeywordInput(text);
                  setUpdatedPhoto({
                    ...updatedPhoto,
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
                  setUpdatedPhoto({...updatedPhoto, story: text});
                }}
                value={updatedPhoto?.story}
              />
            </View>
            <View gap={16}>
              <Text style={styles.headingText}>Camera</Text>
              <AutoGrowTextInput
                placeholder={'Enter Camera Name'}
                onChangeText={text => {
                  setUpdatedPhoto({
                    ...updatedPhoto,
                    cameraDetails: {
                      ...updatedPhoto?.cameraDetails,
                      camera: text,
                    },
                  });
                }}
                value={updatedPhoto?.cameraDetails?.camera}
              />
            </View>
            <View gap={16}>
              <Text style={styles.headingText}>Lens</Text>
              <AutoGrowTextInput
                placeholder={'Enter Lens Name'}
                onChangeText={text => {
                  setUpdatedPhoto({
                    ...updatedPhoto,
                    cameraDetails: {...updatedPhoto?.cameraDetails, lens: text},
                  });
                }}
                value={updatedPhoto?.cameraDetails?.lens}
              />
            </View>
            <View style={styles.twoFields}>
              <View gap={16} style={{width: '48%'}}>
                <Text style={styles.headingText}>Focal Length</Text>
                <AutoGrowTextInput
                  placeholder={'Enter Focal Length'}
                  onChangeText={text => {
                    setUpdatedPhoto({
                      ...updatedPhoto,
                      cameraDetails: {
                        ...updatedPhoto?.cameraDetails,
                        settings: {
                          ...updatedPhoto?.cameraDetails?.settings,
                          focalLength: text,
                        },
                      },
                    });
                  }}
                  value={updatedPhoto?.cameraDetails?.settings?.focalLength}
                />
              </View>
              <View gap={16} style={{width: '48%'}}>
                <Text style={styles.headingText}>Aperture</Text>
                <AutoGrowTextInput
                  placeholder={'Enter Aperture'}
                  onChangeText={text => {
                    setUpdatedPhoto({
                      ...updatedPhoto,
                      cameraDetails: {
                        ...updatedPhoto?.cameraDetails,
                        settings: {
                          ...updatedPhoto?.cameraDetails?.settings,
                          aperture: text,
                        },
                      },
                    });
                  }}
                  value={updatedPhoto?.cameraDetails?.settings?.aperture}
                />
              </View>
            </View>
            <View style={styles.twoFields}>
              <View gap={16} style={{width: '48%'}}>
                <Text style={styles.headingText}>Shutter Speed</Text>
                <AutoGrowTextInput
                  placeholder={'Enter Shutter Speed'}
                  onChangeText={text => {
                    setUpdatedPhoto({
                      ...updatedPhoto,
                      cameraDetails: {
                        ...updatedPhoto?.cameraDetails,
                        settings: {
                          ...updatedPhoto?.cameraDetails?.settings,
                          shutterSpeed: text,
                        },
                      },
                    });
                  }}
                  value={updatedPhoto?.cameraDetails?.settings?.shutterSpeed}
                />
              </View>
              <View gap={16} style={{width: '48%'}}>
                <Text style={styles.headingText}>ISO</Text>
                <AutoGrowTextInput
                  placeholder={'Enter ISO'}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    setUpdatedPhoto({
                      ...updatedPhoto,
                      cameraDetails: {
                        ...updatedPhoto?.cameraDetails,
                        settings: {
                          ...updatedPhoto?.cameraDetails?.settings,
                          iso: Number(text),
                        },
                      },
                    });
                  }}
                  value={String(
                    updatedPhoto?.cameraDetails?.settings?.iso || '',
                  )}
                />
              </View>
            </View>
            <View gap={16}>
              <Text style={styles.headingText}>Location</Text>
              <AutoGrowTextInput
                placeholder={'Enter Location'}
                onChangeText={text => {
                  setUpdatedPhoto({...updatedPhoto, location: text});
                }}
                value={updatedPhoto?.location}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <Button btnText={'Save Changes'} onPress={() => handleUpdate()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditImage;
