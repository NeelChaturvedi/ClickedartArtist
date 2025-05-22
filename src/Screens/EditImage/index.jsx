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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@components/button';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import MultiSelectModal from '@components/MultiSelectModal';
import {useNavigation} from '@react-navigation/native';

const EditImage = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/get?pageSize=1000');
        const data = response.data;
        console.log('Categories:', data.categories);
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
              <View gap={16} style={{width: photo.notForSale ? '100%' : '48%'}}>
                <Text style={styles.headingText}>Category</Text>
                <MultiSelectModal
                  options={categoriesList}
                  value={photo.category}
                  onChange={ids => setPhoto(prev => ({...prev, category: ids}))}
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
            <Button btnText={'Save Changes'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditImage;
