/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useRegistrationStore} from '../../store/registration';
import BackButton from '../../components/Backbutton';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

const Personal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const {formData, setField, nextStep, setConnectedAccount} =
    useRegistrationStore();
  const options = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (formData.firstName.length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    }

    if (formData.bio && formData.bio.trim().split(' ').length > 100) {
      newErrors.bio = 'Bio must be less than 100 words.';
    } else if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters.';
    }

    if (formData.connectedAccounts.length === 0) {
      newErrors.connectedAccounts =
        'At least one social media account is required.';
    } else if (
      formData.connectedAccounts.length === 1 &&
      formData.connectedAccounts[0].accountName === '' &&
      formData.connectedAccounts[0].accountLink === ''
    ) {
      newErrors.connectedAccounts =
        'At least one social media account is required.';
    }

    return newErrors;
  };

  const handleNext = () => {
    setErrors({});
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    nextStep();
    navigation.navigate('Contact');
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              paddingVertical: 20,
              gap: 40,
              position: 'relative',
            }}
            keyboardShouldPersistTaps="handled">
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
            <Text style={styles.heading}>Personal Details</Text>
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>FIRST NAME</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.firstName}
                    onChangeText={text => setField('firstName', text)}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>LAST NAME</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Optional"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.lastName}
                    onChangeText={text => setField('lastName', text)}
                  />
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>BIO</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Optional"
                  placeholderTextColor={'#D9D9D9'}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={formData.bio}
                  onChangeText={text => setField('bio', text)}
                />
                {errors.bio && (
                  <Text style={styles.errorText}>{errors.bio}</Text>
                )}
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>DATE OF BIRTH</Text>
                <View style={{flexDirection: 'row'}}></View>
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
                      setField('dob', date.toISOString());
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
                <View style={styles.row}>
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
                                  setConnectedAccount(0, 'accountName', option);
                                }}>
                                <Text style={styles.modalOption}>{option}</Text>
                              </Pressable>
                            ))}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                    <Pressable onPress={() => setModalVisible(true)}>
                      <Text style={styles.selectionText}>
                        {formData.connectedAccounts[0].accountName
                          ? formData.connectedAccounts[0].accountName
                          : 'Select Social Media'}
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.twoField}>
                    <TextInput
                      style={styles.inputbox}
                      placeholder="Required"
                      placeholderTextColor={'#D9D9D9'}
                      value={formData.connectedAccounts[0].accountLink}
                      onChangeText={text =>
                        setConnectedAccount(0, 'accountLink', text)
                      }
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
            <Button btnText={'Next'} onPress={handleNext} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Personal;
