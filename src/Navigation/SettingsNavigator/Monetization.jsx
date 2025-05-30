/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Pressable,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'moti';
import SlideUpDetails from '@components/SlideupDetails';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '@components/button';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewModal from '@components/ImageViewModal';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'src/themes/useTheme';

const Monetization = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMonetized, setIsMonetized] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

    const theme = useTheme();
  const styles = getStyles(theme);

  const {user} = useUserStore();

  const priceDetails = [
    {label: 'Full Name', value: `${user?.firstName} ${user?.lastName}`},
    {label: 'Date of Birth', value: `${user?.dob.split('T')[0]}`},
    {label: 'Contact', value: ` ${user?.mobile}`},
    {label: 'Email', value: `${user?.email}`},
  ];

  const [formData, setFormData] = useState({
    photographerId: '',
    id: '',
    t_c: false,
    address: {
      residentialAddress: '',
      state: '',
    },
    panPhoto: '',
    panNumber: '',
    country: '',
    bankAccountName: '',
    bankName: '',
    bankAccNumber: '',
    ifsc: '',
    branch: '',
    passbookOrCancelledCheque: '',
    isBusinessAccount: false,
    businessAccount: {
      businessDetailsInfo: {
        businessName: '',
        natureOfBusiness: '',
        businessAddress: '',
      },
      gstCopy: '',
      firmPan: '',
      firmPanPhoto: '',
      firmGstCertificate: '',
      gstNumber: '',
      gstState: '',
      gstType: '',
      businessAddressProof: '',
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.residentialAddress) {
      newErrors.address = 'Residential Address is required';
    }
    if (!formData.address.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.panPhoto) {
      newErrors.panPhoto = 'PAN Photo is required';
    }
    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN Number is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.bankAccountName) {
      newErrors.bankAccountName = 'Bank Account Name is required';
    }
    if (!formData.bankName) {
      newErrors.bankName = 'Bank Name is required';
    }
    if (!formData.bankAccNumber) {
      newErrors.bankAccNumber = 'Bank Account Number is required';
    }
    if (!formData.ifsc) {
      newErrors.ifsc = 'IFSC is required';
    }
    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }
    if (!formData.passbookOrCancelledCheque) {
      newErrors.passbookOrCancelledCheque =
        'Passbook or Cancelled Cheque is required';
    }
    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN Number is required';
    }
    if (formData.isBusinessAccount) {
      if (!formData.businessAccount.businessDetailsInfo.businessName) {
        newErrors.businessName = 'Business Name is required';
      }
      if (!formData.businessAccount.businessDetailsInfo.natureOfBusiness) {
        newErrors.natureOfBusiness = 'Nature of Business is required';
      }
      if (!formData.businessAccount.businessDetailsInfo.businessAddress) {
        newErrors.businessAddress = 'Business Address is required';
      }
      if (!formData.businessAccount.firmPan) {
        newErrors.firmPan = 'Firm PAN is required';
      }
    }
    if (!formData.t_c) {
      newErrors.t_c = 'Please agree to the Terms and Conditions';
    }
    return newErrors;
  };

  const handleDeleteFile = fieldName => {
    const updateNestedField = (path, value, obj) => {
      const fields = path.split('.');
      const field = fields.shift();

      if (fields.length === 0) {
        return {...obj, [field]: value};
      }

      return {
        ...obj,
        [field]: updateNestedField(fields.join('.'), value, obj[field] || {}),
      };
    };
    setFormData(prev => updateNestedField(fieldName, '', prev));
    ToastAndroid.show('File deleted successfully', ToastAndroid.SHORT);
  };

  const handleDocUpload = async field => {
    try {
      setUploading(true);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });
      let croppedImage = await ImagePicker.openCropper({
        cropperToolbarTitle: 'Crop Image',
        path: image.path,
      });
      await handleFileSelection(field, croppedImage.path);
    } catch (error) {
      console.log('Picker error:', error);
      if (error.code === 'E_PICKER_CANCELLED') {
        ToastAndroid.show('Image selection cancelled', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Error selecting image', ToastAndroid.SHORT);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelection = async (field, imageUri) => {
    if (!imageUri) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      return;
    }
    const imgData = new FormData();
    imgData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    // Reset uploaded URL in formData
    if (field.startsWith('businessAccount.')) {
      const businessField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        businessAccount: {
          ...prev.businessAccount,
          [businessField]: '',
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: '',
      }));
    }

    try {
      const res = await api.post('/upload/uploadSingleImage', imgData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = res.data;

      // Update formData with the uploaded file URL
      if (field.startsWith('businessAccount.')) {
        const businessField = field.split('.')[1];
        setFormData(prev => ({
          ...prev,
          businessAccount: {
            ...prev.businessAccount,
            [businessField]: data,
          },
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: data,
        }));
      }

      ToastAndroid.show('File uploaded successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error uploading file:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      ToastAndroid.show(
        'Error uploading file: ' +
          (error.response?.data?.message || 'Unknown error'),
        ToastAndroid.SHORT,
      );
    }
  };

  const handleSubmit = async () => {
    const err = validateForm();
    if (Object.keys(err).length > 0) {
      console.log('errors', err);
      setErrors(err);
      return;
    }

    try {
      await api.post('/monetization/create-monetization', formData);
      ToastAndroid.show(
        'Monetization details submitted successfully',
        ToastAndroid.SHORT,
      );
      setIsMonetized(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const handleUpdate = async () => {
    const err = validateForm();
    if (Object.keys(err).length > 0) {
      console.log('errors', err);
      setErrors(err);
      return;
    }

    try {
      await api.post('/monetization/update-monetization', formData);
      ToastAndroid.show(
        'Monetization details updated successfully',
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const getMonetizationData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/monetization/getMonetizationByPhotographerId?photographerId=${user?._id}`,
      );
      if (response.data.monetization) {
        setIsMonetized(true);
        const data = response.data.monetization;
        setFormData({
          ...data,
          id: data._id,
          photographerId: user?._id,
        });
      }
    } catch (error) {
      console.log('Error fetching monetization data:');
    } finally {
      setIsLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      photographerId: user?._id,
    }));
    if (user) {
      getMonetizationData();
    }
  }, [user, getMonetizationData]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#ed3147"
            style={{marginTop: 20}}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <ScrollView
          style={styles.containerWrapper}
          contentContainerStyle={styles.form}>
          <TouchableOpacity
            style={styles.personalDetails}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Address Details</Text>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>RESIDENTIAL ADDRESS</Text>
              <AutoGrowTextInput
                value={formData.address.residentialAddress}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      residentialAddress: text,
                    },
                  }))
                }
                placeholder="Enter your residential address"
                style={styles.inputbox}
              />
              {errors.address && (
                <Text style={{color: 'red'}}>{errors.address}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>STATE</Text>
                  <AutoGrowTextInput
                    value={formData.address.state}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          state: text,
                        },
                      }))
                    }
                    placeholder="Enter your state"
                    style={styles.inputbox}
                  />
                  {errors.state && (
                    <Text style={{color: 'red'}}>{errors.state}</Text>
                  )}
                </View>

                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>COUNTRY</Text>
                  <AutoGrowTextInput
                    value={formData.country}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        country: text,
                      }))
                    }
                    placeholder="Enter your country"
                    style={styles.inputbox}
                  />
                  {errors.country && (
                    <Text style={{color: 'red'}}>{errors.country}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>

            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BANK ACCOUNT HOLDER NAME</Text>
              <AutoGrowTextInput
                placeholder="Enter your bank account holder name"
                style={styles.inputbox}
                value={formData.bankAccountName}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    bankAccountName: text,
                  }))
                }
              />
              {errors.bankAccountName && (
                <Text style={{color: 'red'}}>{errors.bankAccountName}</Text>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BANK ACCOUNT NUMBER</Text>
              <AutoGrowTextInput
                placeholder="Enter your bank account number"
                style={styles.inputbox}
                value={formData.bankAccNumber}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    bankAccNumber: text,
                  }))
                }
              />
              {errors.bankAccNumber && (
                <Text style={{color: 'red'}}>{errors.bankAccNumber}</Text>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>IFSC CODE</Text>
              <AutoGrowTextInput
                placeholder="Enter your IFSC code"
                style={styles.inputbox}
                value={formData.ifsc}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    ifsc: text,
                  }))
                }
              />
              {errors.ifsc && <Text style={{color: 'red'}}>{errors.ifsc}</Text>}
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BANK NAME</Text>
              <AutoGrowTextInput
                placeholder="Enter your bank name"
                style={styles.inputbox}
                value={formData.bankName}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    bankName: text,
                  }))
                }
              />
              {errors.bankName && (
                <Text style={{color: 'red'}}>{errors.bankName}</Text>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BRANCH</Text>
              <AutoGrowTextInput
                placeholder="Enter your branch"
                style={styles.inputbox}
                value={formData.branch}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    branch: text,
                  }))
                }
              />
              {errors.branch && (
                <Text style={{color: 'red'}}>{errors.branch}</Text>
              )}
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.sectionTitle}>PAN Details</Text>

            <View style={styles.formField}>
              <Text style={styles.inputTitle}>PAN NUMBER</Text>
              <AutoGrowTextInput
                placeholder="Enter your PAN number"
                style={styles.inputbox}
                value={formData.panNumber}
                onChangeText={text =>
                  setFormData(prev => ({
                    ...prev,
                    panNumber: text,
                  }))
                }
              />
              {errors.panNumber && (
                <Text style={{color: 'red'}}>{errors.panNumber}</Text>
              )}
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Supporting Documents</Text>

            <View style={styles.formField}>
              <Text style={styles.inputTitle}>COPY OF PAN CARD</Text>
              <View style={styles.formFieldUpload}>
                {formData.panPhoto ? (
                  <>
                    <Pressable
                      style={styles.imageContainer}
                      onPress={() => {
                        if (formData.passbookOrCancelledCheque) {
                          setSelectedImage(formData.panPhoto);
                          setImageModalVisible(true);
                        } else {
                          ToastAndroid.show(
                            'No image to view',
                            ToastAndroid.SHORT,
                          );
                        }
                      }}>
                      <Image
                        source={{uri: formData.panPhoto}}
                        style={{height: 100, borderRadius: 10}}
                        resizeMode="contain"
                      />
                    </Pressable>
                    <Pressable
                      style={styles.deleteButton}
                      onPress={() => handleDeleteFile('panPhoto')}>
                      <Text style={styles.deleteTitle}>Delete</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={styles.uploadContainer}
                    onPress={() => handleDocUpload('panPhoto')}>
                    <Text style={styles.inputTitle}>Upload PAN Photo</Text>
                  </Pressable>
                )}
              </View>
              {errors.panPhoto && (
                <Text style={{color: 'red'}}>{errors.panPhoto}</Text>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>
                PASSBOOK OR CANCELLED CHEQUE{' '}
              </Text>
              <View style={styles.formFieldUpload}>
                {formData.passbookOrCancelledCheque ? (
                  <>
                    <Pressable
                      style={styles.imageContainer}
                      onPress={() => {
                        if (formData.passbookOrCancelledCheque) {
                          setSelectedImage(formData.passbookOrCancelledCheque);
                          setImageModalVisible(true);
                        } else {
                          ToastAndroid.show(
                            'No image to view',
                            ToastAndroid.SHORT,
                          );
                        }
                      }}>
                      <Image
                        source={{uri: formData.passbookOrCancelledCheque}}
                        style={{height: 100, borderRadius: 10}}
                        resizeMode="contain"
                      />
                    </Pressable>
                    <Pressable
                      style={styles.deleteButton}
                      onPress={() =>
                        handleDeleteFile('passbookOrCancelledCheque')
                      }>
                      <Text style={styles.deleteTitle}>Delete</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable
                    style={styles.uploadContainer}
                    onPress={() =>
                      handleDocUpload('passbookOrCancelledCheque')
                    }>
                    <Text style={styles.inputTitle}>
                      Upload Passbook or Cancelled Cheque
                    </Text>
                  </Pressable>
                )}
              </View>
              {errors.passbookOrCancelledCheque && (
                <Text style={{color: 'red'}}>
                  {errors.passbookOrCancelledCheque}
                </Text>
              )}
            </View>
            <View style={{marginTop: -5, gap: 10}}>
              <View style={styles.checkContainer}>
                <AdvancedCheckbox
                  value={formData.isBusinessAccount}
                  onValueChange={value =>
                    setFormData(prev => ({...prev, isBusinessAccount: value}))
                  }
                />
                <Text style={styles.inputTitle}>Business Account</Text>
              </View>
              {formData.isBusinessAccount && (
                <View style={{marginTop: 20, gap: 20}}>
                  <View style={styles.form}>
                    <Text style={styles.sectionTitle}>
                      Business Information
                    </Text>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>BUSINESS NAME</Text>
                      <AutoGrowTextInput
                        placeholder="Enter your business name"
                        style={styles.inputbox}
                        value={
                          formData.businessAccount?.businessDetailsInfo
                            ?.businessName
                        }
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              businessDetailsInfo: {
                                ...prev.businessAccount?.businessDetailsInfo,
                                businessName: text,
                              },
                            },
                          }))
                        }
                      />
                      {errors.businessName && (
                        <Text style={{color: 'red'}}>
                          {errors.businessName}
                        </Text>
                      )}
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>NATURE OF BUSINESS</Text>
                      <AutoGrowTextInput
                        placeholder="Enter the nature of your business"
                        style={styles.inputbox}
                        value={
                          formData.businessAccount.businessDetailsInfo
                            ?.natureOfBusiness
                        }
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              businessDetailsInfo: {
                                ...prev.businessAccount?.businessDetailsInfo,
                                natureOfBusiness: text,
                              },
                            },
                          }))
                        }
                      />
                      {errors.natureOfBusiness && (
                        <Text style={{color: 'red'}}>
                          {errors.natureOfBusiness}
                        </Text>
                      )}
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>BUSINESS ADDRESS</Text>
                      <AutoGrowTextInput
                        placeholder="Enter your business address"
                        style={styles.inputbox}
                        value={
                          formData?.businessAccount?.businessDetailsInfo
                            ?.businessAddress
                        }
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              businessDetailsInfo: {
                                ...prev.businessAccount?.businessDetailsInfo,
                                businessAddress: text,
                              },
                            },
                          }))
                        }
                      />
                      {errors.businessAddress && (
                        <Text style={{color: 'red'}}>
                          {errors.businessAddress}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.form}>
                    <Text style={styles.sectionTitle}>GST Details</Text>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST NUMBER</Text>
                      <AutoGrowTextInput
                        placeholder="Enter your gst number"
                        value={formData.businessAccount.gstNumber}
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              gstNumber: text,
                            },
                          }))
                        }
                      />
                      {errors.businessName && (
                        <Text style={{color: 'red'}}>
                          {errors.businessName}
                        </Text>
                      )}
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST STATE</Text>
                      <AutoGrowTextInput
                        placeholder="Enter the gst state"
                        value={formData.businessAccount.gstState}
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              gstState: text,
                            },
                          }))
                        }
                      />
                      {errors.natureOfBusiness && (
                        <Text style={{color: 'red'}}>
                          {errors.natureOfBusiness}
                        </Text>
                      )}
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST TYPE</Text>
                      <AutoGrowTextInput
                        placeholder="Enter your gst type"
                        value={formData.businessAccount.gstType}
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            businessAccount: {
                              ...prev.businessAccount,
                              gstType: text,
                            },
                          }))
                        }
                      />
                      {errors.businessAddress && (
                        <Text style={{color: 'red'}}>
                          {errors.businessAddress}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.form}>
                    <Text style={styles.sectionTitle}>Documents</Text>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST COPY</Text>
                      <View style={styles.formFieldUpload}>
                        {formData.businessAccount.gstCopy ? (
                          <>
                            <Pressable
                              style={styles.imageContainer}
                              onPress={() => {
                                if (formData.businessAccount.gstCopy) {
                                  setSelectedImage(
                                    formData.businessAccount.gstCopy,
                                  );
                                  setImageModalVisible(true);
                                } else {
                                  ToastAndroid.show(
                                    'No image to view',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Image
                                source={{
                                  uri: formData.businessAccount.gstCopy,
                                }}
                                style={{height: 100, borderRadius: 10}}
                                resizeMode="contain"
                              />
                            </Pressable>
                            <Pressable
                              style={styles.deleteButton}
                              onPress={() =>
                                handleDeleteFile('businessAccount.gstCopy')
                              }>
                              <Text style={styles.deleteTitle}>Delete</Text>
                            </Pressable>
                          </>
                        ) : (
                          <Pressable
                            style={styles.uploadContainer}
                            onPress={() =>
                              handleDocUpload('businessAccount.gstCopy')
                            }>
                            <Text style={styles.inputTitle}>
                              Upload GST Copy
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>FIRM PAN</Text>
                      <View style={styles.formFieldUpload}>
                        {formData.businessAccount.firmPan ? (
                          <>
                            <Pressable
                              style={styles.imageContainer}
                              onPress={() => {
                                if (formData.businessAccount.firmPan) {
                                  setSelectedImage(
                                    formData.businessAccount.firmPan,
                                  );
                                  setImageModalVisible(true);
                                } else {
                                  ToastAndroid.show(
                                    'No image to view',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Image
                                source={{
                                  uri: formData.businessAccount.firmPan,
                                }}
                                style={{height: 100, borderRadius: 10}}
                                resizeMode="contain"
                              />
                            </Pressable>
                            <Pressable
                              style={styles.deleteButton}
                              onPress={() =>
                                handleDeleteFile('businessAccount.firmPan')
                              }>
                              <Text style={styles.deleteTitle}>Delete</Text>
                            </Pressable>
                          </>
                        ) : (
                          <Pressable
                            style={styles.uploadContainer}
                            onPress={() =>
                              handleDocUpload('businessAccount.firmPan')
                            }>
                            <Text style={styles.inputTitle}>
                              Upload Firm PAN
                            </Text>
                          </Pressable>
                        )}
                      </View>
                      {errors.firmPan && (
                        <Text style={{color: 'red'}}>{errors.firmPan}</Text>
                      )}
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST CERTIFICATE</Text>
                      <View style={styles.formFieldUpload}>
                        {formData.businessAccount.firmGstCertificate ? (
                          <>
                            <Pressable
                              style={styles.imageContainer}
                              onPress={() => {
                                if (
                                  formData.businessAccount.firmGstCertificate
                                ) {
                                  setSelectedImage(
                                    formData.businessAccount.firmGstCertificate,
                                  );
                                  setImageModalVisible(true);
                                } else {
                                  ToastAndroid.show(
                                    'No image to view',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Image
                                source={{
                                  uri: formData.businessAccount
                                    .firmGstCertificate,
                                }}
                                style={{height: 100, borderRadius: 10}}
                                resizeMode="contain"
                              />
                            </Pressable>
                            <Pressable
                              style={styles.deleteButton}
                              onPress={() =>
                                handleDeleteFile(
                                  'businessAccount.firmGstCertificate',
                                )
                              }>
                              <Text style={styles.deleteTitle}>Delete</Text>
                            </Pressable>
                          </>
                        ) : (
                          <Pressable
                            style={styles.uploadContainer}
                            onPress={() =>
                              handleDocUpload(
                                'businessAccount.firmGstCertificate',
                              )
                            }>
                            <Text style={styles.inputTitle}>
                              Upload GST Certificate
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>
                        BUSINESS ADDRESS PROOF
                      </Text>
                      <View style={styles.formFieldUpload}>
                        {formData.businessAccount.businessAddressProof ? (
                          <>
                            <Pressable
                              style={styles.imageContainer}
                              onPress={() => {
                                if (
                                  formData.businessAccount.businessAddressProof
                                ) {
                                  setSelectedImage(
                                    formData.businessAccount
                                      .businessAddressProof,
                                  );
                                  setImageModalVisible(true);
                                } else {
                                  ToastAndroid.show(
                                    'No image to view',
                                    ToastAndroid.SHORT,
                                  );
                                }
                              }}>
                              <Image
                                source={{
                                  uri: formData.businessAccount
                                    .businessAddressProof,
                                }}
                                style={{height: 100, borderRadius: 10}}
                                resizeMode="contain"
                              />
                            </Pressable>
                            <Pressable
                              style={styles.deleteButton}
                              onPress={() =>
                                handleDeleteFile(
                                  'businessAccount.businessAddressProof',
                                )
                              }>
                              <Text style={styles.deleteTitle}>Delete</Text>
                            </Pressable>
                          </>
                        ) : (
                          <Pressable
                            style={styles.uploadContainer}
                            onPress={() =>
                              handleDocUpload(
                                'businessAccount.businessAddressProof',
                              )
                            }>
                            <Text style={styles.inputTitle}>
                              Upload Business Address Proof
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.formField}>
                <View style={styles.checkContainer}>
                  <AdvancedCheckbox
                    value={formData.t_c}
                    onValueChange={value =>
                      setFormData(prev => ({
                        ...prev,
                        t_c: value,
                      }))
                    }
                  />
                  <Text style={styles.inputTitle}>
                    I agree to the terms and conditions
                  </Text>
                </View>
              </View>
              {errors.t_c && <Text style={{color: 'red'}}>{errors.t_c}</Text>}
            </View>
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            btnText={isMonetized ? 'Update' : 'Submit'}
            onPress={isMonetized ? handleUpdate : handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
      <SlideUpDetails
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={priceDetails}
        title="Personal Details"
      />
      <ImageViewModal
        visible={imageModalVisible}
        imageUri={selectedImage}
        onClose={() => setImageModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: theme.background,
    width: '100%',
  },
  containerWrapper: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalDetails: {
    padding: 24,
    borderRadius: 10,
    backgroundColor: theme.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'Calibri-Bold',
    fontSize: 20,
    color: theme.text,
  },
  form: {
    justifyContent: 'flex-start',
    paddingBottom: 10,
    gap: 30,
  },
  formField: {
    gap: 10,
  },
  formFieldUpload: {
    gap: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: 'Calibri-Medium',
    color: theme.text,
  },
  inputbox: {
    height: 54,
    color: theme.text,
    justifyContent: 'center',
    backgroundColor: theme.card,
    fontFamily: 'Calibri-Regular',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.text,
  },
  twoField: {
    flex: 1,
    gap: 10,
  },
  uploadContainer: {
    height: 54,
    justifyContent: 'center',
    backgroundColor: theme.card,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
    width: '100%',
  },
  imageContainer: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteButton: {
    height: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '30%',
    alignItems: 'center',
  },
  deleteTitle: {
    fontFamily: 'Calibri-Medium',
    color: 'red',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default Monetization;
