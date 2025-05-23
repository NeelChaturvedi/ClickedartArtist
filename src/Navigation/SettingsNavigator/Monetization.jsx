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
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'moti';
import SlideUpDetails from '@components/SlideupDetails';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '@components/button';

const Monetization = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const priceDetails = [
    {label: 'Subtotal', value: '₹1448.94/-'},
    {label: 'Savings', value: '₹1448.94/-'},
    {label: 'Delivery Charges', value: '₹1448.94/-'},
    {label: 'Platform Gateway', value: '₹1448.94/-'},
    {label: 'CGST (9%)', value: '₹144.89/-'},
    {label: 'SGST (9%)', value: '₹144.89/-'},
    {label: 'Total', value: '₹10648.94/-'},
  ];

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
                placeholder="Enter your residential address"
                style={styles.inputbox}
              />
            </View>

            <View style={styles.formField}>
              <View style={styles.row}>
                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>STATE</Text>
                  <AutoGrowTextInput
                    placeholder="Enter your state"
                    style={styles.inputbox}
                  />
                </View>

                <View style={styles.twoField}>
                  <Text style={styles.inputTitle}>COUNTRY</Text>
                  <AutoGrowTextInput
                    placeholder="Enter your country"
                    style={styles.inputbox}
                  />
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
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BANK ACCOUNT NUMBER</Text>
              <AutoGrowTextInput
                placeholder="Enter your bank account number"
                style={styles.inputbox}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>IFSC CODE</Text>
              <AutoGrowTextInput
                placeholder="Enter your IFSC code"
                style={styles.inputbox}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BANK NAME</Text>
              <AutoGrowTextInput
                placeholder="Enter your bank name"
                style={styles.inputbox}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.inputTitle}>BRANCH</Text>
              <AutoGrowTextInput
                placeholder="Enter your branch"
                style={styles.inputbox}
              />
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>PAN Details</Text>

            <View style={styles.formField}>
              <Text style={styles.inputTitle}>PAN NUMBER</Text>
              <AutoGrowTextInput
                placeholder="Enter your PAN number"
                style={styles.inputbox}
              />
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
            <View style={{marginTop: -5}}>
              <View style={styles.checkContainer}>
                <AdvancedCheckbox />
                <Text style={styles.inputTitle}>Business Account</Text>
              </View>
              <View style={styles.checkContainer}>
                <AdvancedCheckbox />
                <Text style={styles.inputTitle}>
                  I agree to the terms and conditions
                </Text>
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
