/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {editProfileStyles} from './styles';
import Button from '@components/button';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {useUserStore} from 'src/store/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import api from 'src/utils/apiClient';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'src/themes/useTheme';

const ProfileEditScreen = () => {
  const {user, fetchUserFromToken} = useUserStore();
  const navigation = useNavigation();
  const [formData, setFormData] = useState(user);
  const [openPicker, setOpenPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState({});
  const options = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];

  const validateForm = () => {
    let newErrors = {};
    if (formData.firstName.length < 3) {
      newErrors.firstName = 'First Name must be at least 3 characters.';
    }
    if (formData.bio && formData.bio.trim().split(' ').length > 100) {
      newErrors.bio = 'Bio must be less than 100 words.';
    } else if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters.';
    }
    if (!formData.shippingAddress.country) {
      newErrors.country = 'Country is required.';
    }
    if (!formData.shippingAddress.state) {
      newErrors.state = 'State is required.';
    }
    if (!formData.shippingAddress.city) {
      newErrors.city = 'District is required.';
    }
    if (!formData.shippingAddress.pincode) {
      newErrors.pincode = 'Pincode is required.';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }
    if (formData.dob && isNaN(new Date(formData.dob).getTime())) {
      newErrors.dob = 'Date of birth is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const theme = useTheme();
  const styles = useMemo(() => editProfileStyles(theme), [theme]);

  const handleProfileUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    setErrors({});
    try {
      await api.post('/photographer/update-profile', formData);
      await fetchUserFromToken();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error.response);
    }
  };

  const handleDataHydration = useCallback(() => {
    if (!user) {
      return;
    }
    setRefreshing(true);
    setFormData({...user, photographerId: user._id});
    setRefreshing(false);
  }, [user]);

  const onRefresh = async () => {
    await fetchUserFromToken();
    handleDataHydration();
  };

  useEffect(() => {
    handleDataHydration();
  }, [handleDataHydration]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View style={styles.fieldContainer}>
            <Text style={styles.subHeadingText}>PERSONAL DETAILS</Text>
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>First Name</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="First Name"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.firstName}
                    onChangeText={text =>
                      setFormData(prev => ({...prev, firstName: text}))
                    }
                  />
                  {errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>Last Name</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Last Name"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.lastName}
                    onChangeText={text =>
                      setFormData(prev => ({...prev, lastName: text}))
                    }
                  />
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Bio</Text>
                <TextInput
                  style={styles.bioInput}
                  placeholder="Tell us about yourself"
                  placeholderTextColor={'#D9D9D9'}
                  multiline
                  numberOfLines={4}
                  value={formData.bio}
                  onChangeText={text =>
                    setFormData(prev => ({...prev, bio: text}))
                  }
                />
                {errors.bio && (
                  <Text style={styles.errorText}>{errors.bio}</Text>
                )}
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>DATE OF BIRTH</Text>
                <Pressable
                  onPress={() => {
                    setOpenPicker(true);
                  }}
                  style={styles.inputbox}>
                  <Text style={styles.inputTitle}>
                    {formData.dob
                      ? dayjs(formData.dob).format('DD-MM-YYYY')
                      : 'Select Date of Birth'}
                  </Text>
                  <DatePicker
                    modal
                    mode="date"
                    open={openPicker}
                    date={formData.dob ? new Date(formData.dob) : new Date()}
                    onConfirm={date => {
                      setOpenPicker(false);
                      setFormData(prev => ({
                        ...prev,
                        dob: dayjs(date).format('YYYY-MM-DD'),
                      }));
                    }}
                    onCancel={() => {
                      setOpenPicker(false);
                    }}
                  />
                </Pressable>
                {errors.dob && (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                )}
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>SOCIAL MEDIA LINK</Text>
                {formData.connectedAccounts.map((account, mainIndex) => (
                  <View key={mainIndex} style={styles.row}>
                    <View style={styles.twoField}>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                          setModalVisible(!modalVisible);
                        }}>
                        <TouchableWithoutFeedback
                          onPress={() => setModalVisible(false)}>
                          <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>
                              Select Social Media
                            </Text>
                            <View style={styles.modalContent}>
                              {options.map((option, index) => (
                                <Pressable
                                  key={index}
                                  onPress={() => {
                                    setModalVisible(false);
                                    setFormData(prev => ({
                                      ...prev,
                                      connectedAccounts: [
                                        {
                                          ...prev.connectedAccounts[mainIndex],
                                          accountName: option,
                                        },
                                      ],
                                    }));
                                  }}>
                                  <Text style={styles.modalOption}>
                                    {option}
                                  </Text>
                                </Pressable>
                              ))}
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </Modal>
                      <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={styles.selectionText}>
                          {account.accountName
                            ? account.accountName
                            : 'Select Social Media'}
                        </Text>
                      </Pressable>
                    </View>
                    <View style={styles.twoField}>
                      <TextInput
                        style={styles.inputbox}
                        placeholder="Required"
                        placeholderTextColor={'#D9D9D9'}
                        value={account.accountLink}
                        onChangeText={text =>
                          setFormData(prev => ({
                            ...prev,
                            connectedAccounts: [
                              {
                                ...prev.connectedAccounts[mainIndex],
                                accountLink: text,
                              },
                            ],
                          }))
                        }
                      />
                    </View>
                  </View>
                ))}
                <View style={[styles.row, {marginTop: 10}]}>
                  <View style={styles.twoField}>
                    <Icon
                      name="plus"
                      size={24}
                      color="lightgreen"
                      alignSelf="center"
                      onPress={() => {
                        setFormData(prev => ({
                          ...prev,
                          connectedAccounts: [
                            ...prev.connectedAccounts,
                            {accountName: '', accountLink: ''},
                          ],
                        }));
                      }}
                    />
                  </View>
                  <View style={styles.twoField}>
                    <Icon
                      name="delete"
                      size={24}
                      alignSelf="center"
                      color="red"
                      onPress={() => {
                        setFormData(prev => ({
                          ...prev,
                          connectedAccounts: prev.connectedAccounts.slice(
                            0,
                            prev.connectedAccounts.length - 1,
                          ),
                        }));
                      }}
                    />
                  </View>
                </View>
                {errors.connectedAccounts && (
                  <Text style={styles.errorText}>
                    {errors.connectedAccounts}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.subHeadingText}>CONTACT DETAILS</Text>
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>COUNTRY</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.country}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          country: text,
                        },
                      }))
                    }
                  />
                  {errors.country && (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  )}
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>State</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.state}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          state: text,
                        },
                      }))
                    }
                  />
                  {errors.state && (
                    <Text style={styles.errorText}>{errors.state}</Text>
                  )}
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Optional"
                  placeholderTextColor={'#D9D9D9'}
                  multiline
                  numberOfLines={4}
                  value={formData.shippingAddress.address}
                  onChangeText={text =>
                    setFormData(prev => ({
                      ...prev,
                      shippingAddress: {
                        ...prev.shippingAddress,
                        address: text,
                      },
                    }))
                  }
                />
                {errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
              </View>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>City</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.city}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          city: text,
                        },
                      }))
                    }
                  />
                  {errors.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>Pincode</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    inputMode="numeric"
                    placeholderTextColor={'#D9D9D9'}
                    keyboardType="numeric"
                    value={formData.shippingAddress.pincode}
                    onChangeText={text =>
                      setFormData(prev => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          pincode: text,
                        },
                      }))
                    }
                  />
                  {errors.pincode && (
                    <Text style={styles.errorText}>{errors.pincode}</Text>
                  )}
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Lankmark</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Optional"
                  placeholderTextColor={'#D9D9D9'}
                  multiline
                  numberOfLines={4}
                  value={formData.shippingAddress.landmark}
                  onChangeText={text =>
                    setFormData(prev => ({
                      ...prev,
                      shippingAddress: {
                        ...prev.shippingAddress,
                        landmark: text,
                      },
                    }))
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Area</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Optional"
                  placeholderTextColor={'#D9D9D9'}
                  multiline
                  numberOfLines={4}
                  value={formData.shippingAddress.area}
                  onChangeText={text =>
                    setFormData(prev => ({
                      ...prev,
                      shippingAddress: {
                        ...prev.shippingAddress,
                        area: text,
                      },
                    }))
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{paddingHorizontal: 30, paddingVertical: 24}}>
        <Button
          btnText="Save Changes"
          onPress={() => handleProfileUpdate()}
          style={{backgroundColor: '#FF6347'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
