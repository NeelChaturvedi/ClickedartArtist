/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import SlideUpDetails from '@components/SlideupDetails';

const CheckOut = () => {
  const [step, setStep] = useState(0);
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
        <View style={{flex: 1}}>
          {step === 0 ? (
            <>
              <ScrollView
                style={styles.containerWrapper}
                contentContainerStyle={styles.form}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Delivery Details</Text>

                <View style={styles.form}>
                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>YOUR NAME</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your name"
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>YOUR EMAIL</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>ADDRESS</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your address"
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <View style={styles.row}>
                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>COUNTRY</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your country"
                          style={styles.inputbox}
                        />
                      </View>

                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>CITY</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your city"
                          style={styles.inputbox}
                        />
                      </View>
                    </View>
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
                        <Text style={styles.inputTitle}>PINCODE</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your pincode"
                          keyboardType="number-pad"
                          style={styles.inputbox}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>LANDMARK</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your landmark"
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>PHONE NUMBER</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      style={styles.inputbox}
                    />
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.amountDistribution}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.orderTitle}>Payment:</Text>
                <Text style={styles.header}>₹1448.94/-</Text>
              </TouchableOpacity>

              <SlideUpDetails
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                data={priceDetails}
                title="Price Breakdown"
              />

              <View style={{padding: 20}}>
                <Button btnText="Proceed to Pay" onPress={() => setStep(1)} />
              </View>
            </>
          ) : (
            <>
              <ScrollView
                style={styles.containerWrapper}
                contentContainerStyle={styles.form}>
                <Text style={styles.header}>Total Amount</Text>
                <View style={styles.orderCard}>
                  <View style={styles.orderDetails}>
                    <Image
                      style={styles.orderImage}
                      source={require('../../assets/images/onboarding.png')}
                    />
                    <View style={styles.orderInfo}>
                      <Text style={styles.orderTitle}>Order Title</Text>
                      <Text style={styles.orderPaper}>
                        Hahnemuhle Museum Etching 350 GSM 100% Acid Free Cotton
                        Paper
                      </Text>
                      <View style={styles.row}>
                        <Text style={styles.orderTitle}>12 X 18 in</Text>
                        <Text style={styles.orderPaper}>Red Wood</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.line} />
                  <View gap={10}>
                    <View style={styles.row}>
                      <Text style={styles.orderTitle}>Delivery</Text>
                      <Text style={styles.orderPaper}>₹1448.94/-</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.orderTitle}>Total Amount</Text>
                      <Text style={styles.orderPaper}>₹10648.94/-</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                }}>
                <View style={{width: '48%'}}>
                  <Button btnText="Back" onPress={() => setStep(0)} />
                </View>
                <View style={{width: '48%'}}>
                  <Button btnText="Place Order" />
                </View>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckOut;
