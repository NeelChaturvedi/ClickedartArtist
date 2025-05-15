import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import BackButton from '../../components/Backbutton';
import OtpInput from '../../components/OtpInput';
import {useRegistrationStore} from '../../store/registration';
import api from '../../utils/apiClient';
import { useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
  const navigation = useNavigation();
  const {formData} = useRegistrationStore();
  const handleOtpComplete = async otp => {
    try {
      await api.post('/photographer/verify-photographer-profile/', {
        email: formData.email,
        otp: otp,
      });
      console.log('OTP verified successfully');
      ToastAndroid.show(
        'OTP verified successfully',
        ToastAndroid.SHORT,
      );
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error in OTP completion:', error.response);
    }
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>OTP Verification</Text>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>
              Please enter the code we just sent to email
            </Text>
            <Text style={styles.emailText}>{formData.email}</Text>
          </View>
        </View>
        <OtpInput length={6} onComplete={handleOtpComplete} />
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Didn't receive the OTP?</Text>
          <TouchableOpacity>
            <Text style={styles.emailText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
