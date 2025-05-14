import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import BackButton from '../../components/Backbutton';
import OtpInput from '../../components/OtpInput';

const OtpScreen = () => {
  const handleOtpComplete = otp => {
    console.log('OTP entered:', otp);
    // Handle OTP submission here
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
            <Text style={styles.emailText}>bhanu1234sharma@gmail.com</Text>
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
