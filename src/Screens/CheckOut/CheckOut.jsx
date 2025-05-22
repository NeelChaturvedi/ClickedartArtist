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
} from 'react-native';
import {styles} from './styles';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';

const CheckOut = () => {
  const [step, setStep] = useState(1);

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
              <View style={styles.totalAmount}>
                <Text style={styles.header}>TotalAmount</Text>
                <Text style={styles.header}>₹1448.94/-</Text>
              </View>

              <View style={{padding: 20}}>
                <Button btnText="Continue to payment" />
              </View>
            </>
          ) : (
            <ScrollView
              style={styles.containerWrapper}
              contentContainerStyle={styles.form}>
              <Text style={styles.header}>Total Amount</Text>
              <View style={styles.orderContainer}>
                <View style={styles.row}>
                  <Image
                    style={styles.orderImage}
                    source={require('../../assets/images/onboarding.png')}
                  />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderTitle}>Order Title</Text>
                    <Text style={styles.orderPrice}>$ 100.00</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckOut;
