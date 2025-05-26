import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
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
import { useTheme } from 'src/themes/useTheme';

const Login = () => {
  const {reset} = useRegistrationStore();
  const [secure, setSecure] = useState(true);
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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.title}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subHeading}>Hi! Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>EMAIL</Text>
          <TextInput
            onChangeText={text => setFormData({...formData, email: text})}
            value={formData.email}
            style={styles.inputbox}
            placeholder="Enter Email"
            placeholderTextColor= "#888"
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
              onChangeText={text => setFormData({...formData, password: text})}
              value={formData.password}
              style={styles.passwordTextInput}
              placeholder="Enter Password"
              placeholderTextColor= "#888"
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
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
      </View>

      <View style={styles.formField}>
        <View style={styles.form}>
          <Button btnText={'Login'} onPress={handleLogin} />
        </View>
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
              reset();
            }}>
            <Text style={styles.createNowText}>Create Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
