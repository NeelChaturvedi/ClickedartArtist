import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useMemo, useRef, useState} from 'react';
import {loginStyles} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../store/auth';
import {useRegistrationStore} from '../../store/registration';
import publicApi from '../../utils/publicApiClient';
import {useTheme} from 'src/themes/useTheme';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import {MotiView} from 'moti';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const {reset} = useRegistrationStore();
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {setUser, setToken} = useUserStore();
  const passwordRef = useRef(null);
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = useMemo(() => loginStyles(theme), [theme]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await publicApi.post('/photographer/login', formData);
      const data = response.data;
      setUser(data.photographer);
      setToken(data.token);
    } catch (error) {
      console.log('Error', error);
      ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
    }
  };

  const handlePassReset = async () => {
    if (!email) {
      setEmailError('Please enter your email');
      return ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
    }

    try {
      setSending(true);
      await publicApi.post('/photographer/reset-password', {
        email: email,
      });
      Alert.alert(
        'Password Reset',
        'A temporary password  has been sent to your email. Please change it after logging in.',
        [
          {
            text: 'OK',
          },
        ],
      );
      setShowModal(false);
      setEmail('');
      setEmailError('');
    } catch (error) {
      console.log(error);
      setEmailError('Failed to send password reset link');
      ToastAndroid.show(
        'Failed to send password reset link',
        ToastAndroid.SHORT,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <MotiView
        from={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{type: 'timing', duration: 500}}
        style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.subHeading}>Hi! Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={styles.inputTitle}>EMAIL</Text>
            <TextInput
              onChangeText={text =>
                setFormData(prev => ({...prev, email: text}))
              }
              value={formData.email}
              style={styles.inputbox}
              placeholder="Enter Email"
              placeholderTextColor="#888"
              textContentType="emailAddress"
              enterKeyHint={formData.password.length === 0 ? 'next' : 'done'}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onSubmitEditing={() => {
                formData.password.length === 0
                  ? passwordRef.current.focus()
                  : handleLogin();
              }}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.inputTitle}>PASSWORD</Text>
            <View style={styles.passwordInput}>
              <TextInput
                ref={passwordRef}
                onChangeText={text =>
                  setFormData(prev => ({...prev, password: text}))
                }
                value={formData.password}
                style={styles.passwordTextInput}
                placeholder="Enter Password"
                placeholderTextColor="#888"
                secureTextEntry={secure}
                autoCapitalize="none"
                autoComplete="password"
                keyboardType="default"
                textContentType="password"
                enterKeyHint="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <FontAwesome5
                  name={secure ? 'eye-slash' : 'eye'}
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false);
            }}>
            <Pressable
              style={styles.modalContainer}
              disabled={sending}
              onPress={() => {
                setShowModal(false);
                setEmail('');
                setEmailError('');
              }}>
              <Pressable style={styles.modalContent} onPress={() => {}}>
                <Text style={styles.modalTitle}>Forgot Password</Text>
                <View style={styles.inputSection}>
                  <Text style={styles.sectionTitle}>Existing Email</Text>
                  <AutoGrowTextInput
                    placeholder={'Enter email'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                  {emailError ? (
                    <Text style={styles.errorText}>{emailError}</Text>
                  ) : null}
                </View>
                <Button
                  btnText={sending ? 'Sending...' : 'Reset Password'}
                  disabled={sending}
                  onPress={handlePassReset}
                />
              </Pressable>
            </Pressable>
          </Modal>
        </View>

        <View style={styles.formField}>
          <View style={styles.form}>
            <Button btnText={'Login'} onPress={handleLogin} />
          </View>
          <View style={styles.createAccount}>
            <Text style={styles.createAccountText}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
                reset();
              }}>
              <Text style={styles.createNowText}>Create Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
};

export default Login;
