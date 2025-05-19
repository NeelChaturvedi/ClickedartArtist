/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import Button from '@components/button';
import DatePicker from 'react-native-date-picker';

const ProfileEditScreen = () => {
  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <View style={styles.fieldContainer}>
            <Text style={styles.subHeadingText}>PERSONAL DETAILS</Text>
            <View style={styles.form}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>First Name</Text>
                  <TextInput style={styles.inputbox} placeholder="First Name" />
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>Last Name</Text>
                  <TextInput style={styles.inputbox} placeholder="Last Name" />
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Bio</Text>
                <TextInput
                  style={styles.bioInput}
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={4}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>DATE OF BIRTH</Text>
                <Pressable
                  // onPress={() => {
                  //   setOpenPicker(true);
                  // }}
                  style={styles.inputbox}>
                  {/* <Text style={styles.inputTitle}>
                    {formData.dob
                      ? dayjs(formData.dob).format('DD-MM-YYYY')
                      : 'Select Date of Birth'}
                  </Text> */}
                  {/* <DatePicker
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
                  /> */}
                </Pressable>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>SOCIAL MEDIA LINK</Text>
                <View style={styles.row}>
                  <View style={styles.twoField}>
                    {/* <Modal
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
                                  </Modal> */}
                    <Pressable>
                      <Text style={styles.selectionText}>
                        {/* {formData.connectedAccounts[0].accountName
                                        ? formData.connectedAccounts[0].accountName
                                        : 'Select Social Media'} */}
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.twoField}>
                    <TextInput
                      style={styles.inputbox}
                      placeholder="Required"
                      placeholderTextColor={'#D9D9D9'}
                    />
                  </View>
                </View>
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
                  />
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>State</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                  />
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={4}
                />
              </View>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>City</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                  />
                </View>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>Pincode</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    inputMode="numeric"
                    placeholderTextColor={'#D9D9D9'}
                  />
                </View>
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Lankmark</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={4}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.inputTitle}>Area</Text>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{paddingHorizontal: 30, paddingVertical: 24}}>
        <Button
          btnText="Save Changes"
          onPress={() => console.log('Save Changes')}
          style={{backgroundColor: '#FF6347'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
