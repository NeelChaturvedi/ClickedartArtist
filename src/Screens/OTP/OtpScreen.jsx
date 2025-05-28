import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import React, {useMemo} from 'react';
import {otpScreenStyles} from './styles';
import OtpInput from '../../components/OtpInput';
import {useRegistrationStore} from '../../store/registration';
import api from '../../utils/apiClient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'src/themes/useTheme';
import LottieView from 'lottie-react-native';

const OtpScreen = () => {
  const navigation = useNavigation();
  const {formData} = useRegistrationStore();
  const [otpChecked, setOtpChecked] = React.useState(false);
  const [otpValid, setOtpValid] = React.useState(false);
  const [Verified, setVerified] = React.useState(false);

  const theme = useTheme();
  const styles = useMemo(() => otpScreenStyles(theme), [theme]);

  const handleOtpComplete = async otp => {
    try {
      setOtpChecked(false);
      await api.post('/photographer/verify-photographer-profile/', {
        email: formData.email,
        otp: otp,
      });
      setOtpValid(true);
      ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
      setVerified(true);
      setTimeout(() => {
        setVerified(false);
        navigation.navigate('Login');
      }, 3000);
    } catch (error) {
      console.error('Error in OTP completion:', error.response);
      setOtpValid(false);
    } finally {
      setOtpChecked(true);
    }
  };

  if (Verified) {
    return (
      <SafeAreaView style={styles.background}>
        <LottieView
          source={require('../../assets/animations/Verified.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
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
        <OtpInput
          length={6}
          otpChecked={otpChecked}
          otpValid={otpValid}
          onComplete={handleOtpComplete}
        />
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
