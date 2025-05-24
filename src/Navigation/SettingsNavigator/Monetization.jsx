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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'moti';
import SlideUpDetails from '@components/SlideupDetails';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '@components/button';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';

const Monetization = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMonetized, setIsMonetized] = useState(false);
  const [errors, setErrors] = useState({});

  const {user} = useUserStore();

  const priceDetails = [
    {label: 'Subtotal', value: '₹1448.94/-'},
    {label: 'Savings', value: '₹1448.94/-'},
    {label: 'Delivery Charges', value: '₹1448.94/-'},
    {label: 'Platform Gateway', value: '₹1448.94/-'},
    {label: 'CGST (9%)', value: '₹144.89/-'},
    {label: 'SGST (9%)', value: '₹144.89/-'},
    {label: 'Total', value: '₹10648.94/-'},
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

  const handleFileSelection = async e => {
    const {name} = e.target;
    const file = e.target.files[0];

    if (!file) return;

    // Reset uploaded URL in formData
    if (name.startsWith('businessAccount.')) {
      const businessField = name.split('.')[1];
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
        [name]: '',
      }));
    }

    // Start Upload
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const res = await api.post(`/upload/uploadSingleImage`, uploadFormData);

      const data = res.data;

      // Update formData with the uploaded file URL
      if (name.startsWith('businessAccount.')) {
        const businessField = name.split('.')[1];
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
          [name]: data,
        }));
      }

      ToastAndroid.show('File uploaded successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error uploading file:', error);
      ToastAndroid.show(
        'Error uploading file. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('errors', errors);
      return;
    }

    try {
      await api.post(`/monetization/create-monetization`, formData);
      ToastAndroid.show(
        'Monetization details submitted successfully',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('errors', errors);
      setErrors(errors);
      return;
    }

    try {
      await api.post(`/monetization/update-monetization`, formData);
      ToastAndroid.show(
        'Monetization details updated successfully',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }
  };

  const getMonetizationData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/monetization/getMonetizationByPhotographerId?photographerId=${user?._id}`,
      );
      console.log('response', response.data);
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
  };

  useEffect(() => {
    setFormData({
      ...formData,
      photographerId: user?._id,
    });
    if (user) getMonetizationData();
  }, [user]);

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
              <Pressable style={styles.uploadContainer}>
                <Text style={styles.inputTitle}>Choose a file</Text>
              </Pressable>
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>
                PASSBOOK OR CANCELLED CHEQUE{' '}
              </Text>
              <Pressable style={styles.uploadContainer}>
                <Text style={styles.inputTitle}>Choose a file</Text>
              </Pressable>
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
                        style={styles.inputbox}
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
                        style={styles.inputbox}
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
                        style={styles.inputbox}
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
                      <Pressable
                        style={styles.uploadContainer}
                        onPress={() =>
                          handleFileSelection({
                            target: {
                              name: 'businessAccount.gstCopy',
                              files: [{name: 'gst_copy.jpg'}],
                            },
                          })
                        }>
                        <Text style={styles.inputTitle}>Choose a file</Text>
                      </Pressable>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>FIRM PAN</Text>
                      <Pressable
                        style={styles.uploadContainer}
                        onPress={() =>
                          handleFileSelection({
                            target: {
                              name: 'businessAccount.firmPan',
                              files: [{name: 'firm_pan.jpg'}],
                            },
                          })
                        }>
                        <Text style={styles.inputTitle}>Choose a file</Text>
                      </Pressable>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>GST CERTIFICATE</Text>
                      <Pressable
                        style={styles.uploadContainer}
                        onPress={() =>
                          handleFileSelection({
                            target: {
                              name: 'businessAccount.firmGstCertificate',
                              files: [{name: 'gst_certificate.jpg'}],
                            },
                          })
                        }>
                        <Text style={styles.inputTitle}>Choose a file</Text>
                      </Pressable>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.inputTitle}>
                        BUSINESS ADDRESS PROOF
                      </Text>
                      <Pressable
                        style={styles.uploadContainer}
                        onPress={() =>
                          handleFileSelection({
                            target: {
                              name: 'businessAccount.businessAddressProof',
                              files: [{name: 'address_proof.jpg'}],
                            },
                          })
                        }>
                        <Text style={styles.inputTitle}>Choose a file</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.formField}>
                <View style={styles.checkContainer}>
                  <AdvancedCheckbox />
                  <Text style={styles.inputTitle}>
                    I agree to the terms and conditions
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button btnText={'Update'} />
        </View>
      </KeyboardAvoidingView>
      <SlideUpDetails
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={priceDetails}
        title="Price Breakdown"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: 'black',
    width: '100%',
  },
  containerWrapper: {
    paddingHorizontal: 20,
  },
  personalDetails: {
    padding: 24,
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: 'white',
  },
  form: {
    justifyContent: 'flex-start',
    paddingBottom: 10,
    gap: 30,
  },
  formField: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  inputTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
  inputbox: {
    height: 54,
    color: 'white',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    fontFamily: 'Outfit-regular',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  twoField: {
    flex: 1,
    gap: 10,
  },
  uploadContainer: {
    height: 54,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default Monetization;
